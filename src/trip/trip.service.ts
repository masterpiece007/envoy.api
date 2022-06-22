/* eslint-disable no-var */
import { UpdateTripDto } from './dtos/update-trip.dto';
import { CreateTripDto } from './dtos/create-trip.dto';
import { GenericResponse, _Status } from './../generic-response';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from 'src/trip/trip.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TripService {
  constructor(@InjectRepository(Trip) private _tripRepo: Repository<Trip>) {}

  async createTrip(dto: CreateTripDto): Promise<GenericResponse> {
    try {
      if (dto) {
        dto.isActive = true;
        const saveResult = await this._tripRepo.save(dto);
        // eslint-disable-next-line no-var
        var response: GenericResponse = {
          Status: _Status.Success,
          Data: saveResult,
          Description: 'trip plan created successfully.',
        };
        return response;
      }
      // eslint-disable-next-line no-var
      var response: GenericResponse = {
        Status: _Status.Failed,
        Data: null,
        Description: 'failed to create trip plan',
      };
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateTripPlan(
    dto: UpdateTripDto,
    courierId: string,
  ): Promise<GenericResponse> {
    try {
      if (dto) {
        const trip = await this._tripRepo.findOne({
          id: dto.id,
          courierId: courierId,
        });

        if (trip) {
          for (var propName in dto) {
            if (
              dto[propName] !== null &&
              dto[propName] !== undefined &&
              dto[propName] !== ''
            ) {
              trip[propName] = dto[propName];
              console.log('propName: ', dto[propName]);
            }
          }
          await this._tripRepo.save(trip);

          var response: GenericResponse = {
            Status: _Status.Success,
            Data: dto,
            Description: 'trip plans updated.',
          };
          return response;
        }
        var response: GenericResponse = {
          Status: _Status.Failed,
          Data: trip,
          Description: 'no matching trip plans.',
        };
        return response;
      }
      var response: GenericResponse = {
        Status: _Status.Failed,
        Data: null,
        Description: 'empty trip model provided',
      };
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findTrip(id: number): Promise<GenericResponse> {
    try {
      if (id > 0) {
        var trip = await this._tripRepo.findOne(id);

        if (trip) {
          var response: GenericResponse = {
            Status: _Status.Success,
            Data: trip,
            Description: 'trip plan found.',
          };
          return response;
        }

        var response: GenericResponse = {
          Status: _Status.Failed,
          Data: trip,
          Description: 'unable to find matching trip.',
        };
        return response;
      }
      var response: GenericResponse = {
        Status: _Status.Failed,
        Data: null,
        Description: 'invalid tripId',
      };
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findTripByCourierId(courierId: string): Promise<GenericResponse> {
    try {
      if (courierId) {
        var trip = await this._tripRepo.find({ courierId: courierId });

        if (trip.length > 0) {
          var response: GenericResponse = {
            Status: _Status.Success,
            Data: trip,
            Description: 'trip plans found.',
          };
          return response;
        }

        var response: GenericResponse = {
          Status: _Status.Failed,
          Data: trip,
          Description: 'unable to find matching trip.',
        };
        return response;
      }
      var response: GenericResponse = {
        Status: _Status.Failed,
        Data: null,
        Description: 'invalid tripId',
      };
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findTripByPlanInfo(
    id_: number,
    courierId: string,
    currentState: string,
    destinationState: string,
  ): Promise<GenericResponse> {
    try {
      if (id_ > 0) {
        var trip = await this._tripRepo.findOne({
          id: id_,
          courierId: courierId,
          currentState: currentState,
          destinationState: destinationState,
        });

        if (trip) {
          var response: GenericResponse = {
            Status: _Status.Success,
            Data: trip,
            Description: 'trip plan found.',
          };
          return response;
        }

        var response: GenericResponse = {
          Status: _Status.Failed,
          Data: trip,
          Description: 'unable to find matching trip.',
        };
        return response;
      }
      var response: GenericResponse = {
        Status: _Status.Failed,
        Data: null,
        Description: 'invalid tripId',
      };
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllTripPlansForCourier(
    courierId: string,
    isActive_: boolean,
  ): Promise<GenericResponse> {
    try {
      if (courierId) {
        var trips = await this._tripRepo.find({
          courierId: courierId,
          isActive: isActive_,
        });

        if (trips.length > 0) {
          var response: GenericResponse = {
            Status: _Status.Success,
            Data: trips,
            Description: 'trip plans found.',
          };
          return response;
        }

        var response: GenericResponse = {
          Status: _Status.Failed,
          Data: trips,
          Description: 'no matching trip plans.',
        };
        return response;
      }
      var response: GenericResponse = {
        Status: _Status.Failed,
        Data: null,
        Description: 'invalid courierId',
      };
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
/*
=> CreateTravelPlan(),UpdateScheduledPlan(),ViewTravelPlans(),FindTrip()
*/
