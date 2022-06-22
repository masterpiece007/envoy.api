import { TripService } from './../trip/trip.service';
import { CourierChoiceDto } from './dtos/courier-choice.dto';
import { GenericResponse, _Status } from './../generic-response';
import { UpdatePackageInterestDto } from './dtos/update-package-interest.dto';
import { UserService } from './../user/user.service';
import { SuggestedPlanDto } from './dtos/suggested-plan.dto';
import { User } from './../user/user.entity';
import { CreatePackageDto } from './dtos/create-package.dto';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './package.entity';
import { PackageInterest } from './package-interest.entity';
import { CreatePackageInterestDto } from './dtos/create-package-interest.dto';
import { Trip } from 'src/trip/trip.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package) private _packageRepo: Repository<Package>,
    @InjectRepository(PackageInterest)
    private _interestRepo: Repository<PackageInterest>,
    private tripService: TripService,
  ) {}

  async createPackageRequest(dto: CreatePackageDto): Promise<GenericResponse> {
    try {
      if (dto) {
        const createdPackage = await this._packageRepo.save(dto);
        if (createdPackage) {
          // eslint-disable-next-line no-var
          var response: GenericResponse = {
            Status: _Status.Success,
            Description: 'package request created',
            Data: createdPackage,
          };
          return response;
        }
        // eslint-disable-next-line no-var
        var response: GenericResponse = {
          Status: _Status.Failed,
          Description: 'no matching package was found',
          Data: null,
        };
        return response;
      }
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async GetPackageById(id: number): Promise<GenericResponse> {
    try {
      const package_ = await this._packageRepo.findOne(id);
      if (package_) {
        // eslint-disable-next-line no-var
        var response: GenericResponse = {
          Status: _Status.Success,
          Description: 'matching package fetched',
          Data: package_,
        };
        return response;
      }
      // return package_;
      // eslint-disable-next-line no-var
      var response: GenericResponse = {
        Status: _Status.Failed,
        Description: 'no matching package was found',
        Data: null,
      };
      return response;
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async GetAllPackages(userId_: string): Promise<GenericResponse> {
    try {
      const userPackages = await this._packageRepo.find({ userId: userId_ });
      if (userPackages.length > 0) {
        // eslint-disable-next-line no-var
        var response: GenericResponse = {
          Status: _Status.Success,
          Description: 'package interest fetched',
          Data: userPackages,
        };
        return response;
        //return userPackages
      }
      // eslint-disable-next-line no-var
      var response: GenericResponse = {
        Status: _Status.Failed,
        Description: 'no package was found for this user',
        Data: userPackages,
      };
      return response;
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async GetPackageInterests(_packageId: number): Promise<GenericResponse> {
    const packageInterests_ = await this._interestRepo.find({
      packageId: _packageId,
    });
    if (packageInterests_.length > 0) {
      // eslint-disable-next-line no-var
      var response: GenericResponse = {
        Status: _Status.Success,
        Description: 'package interests fetched',
        Data: packageInterests_,
      };
      return response;
    }
    // eslint-disable-next-line no-var
    var response: GenericResponse = {
      Status: _Status.Failed,
      Description: 'no package interest was found',
      Data: null,
    };
    return response;
    //return package_.packageInterests;
  }

  async CreatePackageInterest(
    dto: CreatePackageInterestDto,
  ): Promise<GenericResponse> {
    const existingCourierInterest = await this._interestRepo.findOne({
      packageId: dto.packageId,
      courierId: dto.userId,
    });

    const package_ = await this._packageRepo.findOne({ id: dto.packageId });
    if (package_) {
      const matchingTripPlan = await this.tripService.findTripByPlanInfo(
        dto.courierTripId,
        dto.userId,
        package_.currentState,
        package_.destinationState,
      );
      if (matchingTripPlan.Status == _Status.Failed) {
        // eslint-disable-next-line no-var
        var response: GenericResponse = {
          Status: _Status.Failed,
          Description:
            'the selected trip plan does not have any matching current state or destination with the package',
          Data: null,
        };
        return response;
      }
    }

    if (existingCourierInterest) {
      //console.log("interest exist before");
      // eslint-disable-next-line no-var
      var response: GenericResponse = {
        Status: _Status.Failed,
        Description: 'packinterest exist before, kindly update if you want.',
        Data: null,
      };
      return response;
    } else {
      const newInterest = new PackageInterest();

      newInterest.isAwarded = false;
      newInterest.hasAlternatePlan = dto.hasAlternatePlan;
      newInterest.isInterested = true;
      newInterest.courierId = dto.userId;
      newInterest.packageId = dto.packageId;
      newInterest.courierTripId = dto.courierTripId;

      newInterest.proposedAmount = dto.proposedAmount;
      newInterest.proposedPickupDateTime = dto.pickupDate;
      newInterest.proposedPickupType = dto.pickupType;
      newInterest.proposedDeliveryType = dto.deliveryType;

      const savedInterest = await this._interestRepo.save(newInterest);
      // eslint-disable-next-line no-var
      var response: GenericResponse = {
        Status: _Status.Success,
        Description: 'package interest created successfully',
        Data: savedInterest,
      };
      return response;
    }
  }

  async UpdatePackageInterest(
    dto: UpdatePackageInterestDto,
  ): Promise<GenericResponse> {
    try {
      const packageToUpdate = await this._interestRepo.findOne({
        packageId: dto.packageId,
        courierId: dto.courierId,
      });
      if (packageToUpdate) {
        if (dto.isInterested && !packageToUpdate.isAwarded) {
          // packageToUpdate.proposedPickupDateTime = dto.proposedPickupDateTime ?? packageToUpdate.proposedPickupDateTime;
          // packageToUpdate.proposedPickupType = dto.proposedPickupType ?? packageToUpdate.proposedPickupType;;
          // packageToUpdate.proposedAmount = dto.proposedAmount ?? packageToUpdate.proposedAmount;;
          // packageToUpdate.proposedDeliveryType = dto.proposedDeliveryType ?? packageToUpdate.proposedDeliveryType;
          // packageToUpdate.isInterested = true;

          for (const propName in dto) {
            if (
              dto[propName] !== null &&
              dto[propName] !== undefined &&
              dto[propName] !== ''
            ) {
              packageToUpdate[propName] = dto[propName];
              //console.log("propName: ", dto[propName])
            }
          }
          packageToUpdate.isInterested = true;
        } else {
          packageToUpdate.isInterested = false;
        }

        await this._interestRepo.save(packageToUpdate);
        // eslint-disable-next-line no-var
        var response: GenericResponse = {
          Status: _Status.Success,
          Description: 'interest updated successfully',
          Data: dto,
        };
        return response;
      }
      // eslint-disable-next-line no-var
      var response: GenericResponse = {
        Status: _Status.Failed,
        Description:
          'no matching interest exist. kindly create  new package interest',
        Data: dto,
      };
      return response;
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async ViewSuggestedPlans(
    packageId: number,
    userId_: string,
  ): Promise<GenericResponse> {
    try {
      const package_ = await this._packageRepo.findOne({
        id: packageId,
        userId: userId_,
      });
      const plans: SuggestedPlanDto[] = [];
      if (package_.packageInterests) {
        package_.packageInterests.forEach((a) => {
          if (a.hasAlternatePlan && a.isInterested) {
            const _p: SuggestedPlanDto = {
              interestId: a.id,
              packageId: a.packageId,
              proposedAmount: a.proposedAmount,
              proposedDeliveryType: a.proposedDeliveryType,
              proposedPickupType: a.proposedPickupType,
              proposedPickupDateTime: a.proposedPickupDateTime,
              dateCreated: a.dateCreated,
            };
            plans.push(_p);
          }
        });
        // eslint-disable-next-line no-var
        var response: GenericResponse = {
          Status: _Status.Success,
          Description: 'suggested plans fetched',
          Data: plans,
        };
        return response;
      }
      // eslint-disable-next-line no-var
      var response: GenericResponse = {
        Status: _Status.Success,
        Description: 'no suggested plans yet',
        Data: null,
      };
      return response;
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async ToggleCourierAssignmentToPackage(
    dto: CourierChoiceDto,
    userId_: string,
  ): Promise<GenericResponse> {
    try {
      const interest = await this._interestRepo.findOne({ id: dto.interestId });
      if (interest) {
        const packageBelongsToLoggedInUser_ = await this._packageRepo.findOne({
          id: interest.packageId,
          userId: userId_,
        });

        if (packageBelongsToLoggedInUser_) {
          interest.isAwarded = dto.isAwarded;
          await this._interestRepo.save(interest);

          if (dto.isAwarded) {
            packageBelongsToLoggedInUser_.courierId = interest.courierId;
            packageBelongsToLoggedInUser_.tripId = interest.courierTripId;

            await this._packageRepo.save(packageBelongsToLoggedInUser_);
          } else {
            packageBelongsToLoggedInUser_.courierId = null;
            packageBelongsToLoggedInUser_.tripId = null;

            await this._packageRepo.save(packageBelongsToLoggedInUser_);
          }
          // eslint-disable-next-line no-var
          var response: GenericResponse = {
            Status: _Status.Success,
            Description: dto.isAwarded
              ? 'courier selected,notification is on it way'
              : 'courier removed from package',
            Data: dto,
          };
          return response;
        }
        // eslint-disable-next-line no-var
        var response: GenericResponse = {
          Status: _Status.Failed,
          Description: 'no matching interest exist',
          Data: dto,
        };
        return response;
      }
      // eslint-disable-next-line no-var
      var response: GenericResponse = {
        Status: _Status.Failed,
        Description: 'it has been withdrawn by the courier',
        Data: dto,
      };
      return response;
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async GetPackagesForFamiliarRoutes(userId: string): Promise<GenericResponse> {
    //get all destinations,and current states from user trip plan
    //distinct it then run a WHERE IN query expression on it
    try {
      let distinctStates_: string[];
      const tripsResult = await this.tripService.findTripByCourierId(userId);
      if (tripsResult.Status == _Status.Success) {
        const trips: Trip[] = tripsResult.Data; //as Trip[]
        const distinctCurrentStates = trips
          .map((item) => item.currentState)
          .filter((value, index, self) => self.indexOf(value) === index);

        const distinctDestinationStates = trips
          .map((item) => item.destinationState)
          .filter((value, index, self) => self.indexOf(value) === index);

        distinctStates_.concat(
          distinctCurrentStates,
          distinctDestinationStates,
        );

        const packages = await this._packageRepo
          .createQueryBuilder('package')
          .where('package.currentState IN (:...distinctStates)', {
            distinctStates: distinctStates_,
          })
          .orWhere('package.destinationState IN (:...distinctStates)', {
            distinctStates: distinctStates_,
          })
          .getMany();
        if (packages) {
          // eslint-disable-next-line no-var
          var response: GenericResponse = {
            Status: _Status.Success,
            Description: 'familiar packages fetched',
            Data: packages,
          };
          return response;
        } else {
          // eslint-disable-next-line no-var
          var recent10Packages = this._packageRepo.find({
            order: { dateCreated: 'DESC' },
            skip: 0,
            take: 10,
          });
          // eslint-disable-next-line no-var
          var response: GenericResponse = {
            Status: _Status.Success,
            Description: 'recent 10 packages fetched',
            Data: recent10Packages,
          };
          return response;
        }
      } else {
        // eslint-disable-next-line no-var
        var recent10Packages = this._packageRepo.find({
          order: { dateCreated: 'DESC' },
          skip: 0,
          take: 10,
        });
        // eslint-disable-next-line no-var
        var response: GenericResponse = {
          Status: _Status.Success,
          Description: 'recent 10 packages fetched',
          Data: recent10Packages,
        };
        return response;
      }
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // async filterPackages(_packageId: number): Promise<GenericResponse> {
  //     var packageInterests_ = await this._interestRepo.find({ packageId: _packageId });
  //     if (packageInterests_) {
  //         var response: GenericResponse = { Status: _Status.Success, Description: "package interests fetched", Data: packageInterests_ }
  //         return response
  //     }
  //     var response: GenericResponse = { Status: _Status.Failed, Description: "no package interest was found", Data: null }
  //     return response
  //     //return package_.packageInterests;
  // }

  //GetAllPackages(filter[e.g route,amount_range,time],pagesize,pagenumber)

  //GetPackageProgress()
}
