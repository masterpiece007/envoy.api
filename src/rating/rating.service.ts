/* eslint-disable no-var */
import { PackagesService } from './../packages/packages.service';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { Rating } from './rating.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericResponse, _Status } from 'src/generic-response';
import { Package } from 'src/packages/package.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating) private _ratingRepo: Repository<Rating>,
    private packageService: PackagesService,
  ) {}

  async submitRating(dto: CreateRatingDto): Promise<GenericResponse> {
    try {
      if (dto) {
        const findPackageResult = await this.packageService.GetPackageById(
          dto.packageId,
        );
        if (findPackageResult.Status == _Status.Success) {
          const existingRating = await this._ratingRepo.findOne({
            packageId: dto.packageId,
          });

          if (existingRating) {
            if (_package.userId == dto.userId) {
              existingRating.stars = dto.stars;
              existingRating.comment = dto.comment;
            } else if (_package.courierId == dto.userId) {
              existingRating.courierComment = dto.comment;
            } else {
            }
            var updateExistingRatingResult = await this._ratingRepo.save(
              existingRating,
            );
          } else {
            const newRating = new Rating();
            newRating.packageId = dto.packageId;

            var _package = findPackageResult.Data as Package;
            newRating.courierId = _package.courierId;

            if (_package.userId == dto.userId) {
              newRating.stars = dto.stars;
              newRating.comment = dto.comment;
            }
            if (_package.courierId == dto.userId) {
              newRating.courierComment = dto.comment;
              newRating.courierId = dto.userId;
            }
            var saveNewRatingResult = await this._ratingRepo.save(newRating);
          }

          var response: GenericResponse = {
            Status: _Status.Success,
            Data: existingRating
              ? updateExistingRatingResult
              : saveNewRatingResult,
            Description: 'rating submitted.',
          };
          return response;
        }
        var response: GenericResponse = {
          Status: _Status.Failed,
          Data: null,
          Description: 'no matching package was found',
        };
      }
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

  async getCourierRating(courierId_: string): Promise<GenericResponse> {
    try {
      const courierRatings = await this._ratingRepo.find({
        courierId: courierId_,
      });

      const { sum, count, avg } = await this._ratingRepo
        .createQueryBuilder('rating')
        .where('rating.courierId = :courierId', { courierId: courierId_ })
        .select([
          'SUM(rating.stars) as sum',
          'Count(rating.stars) as count',
          'AVG(rating.stars) as avg',
        ])
        .getRawOne();
      if (courierRatings.length > 0) {
        // eslint-disable-next-line no-var
        var response: GenericResponse = {
          Status: _Status.Success,
          Data: {
            'rating Count': count,
            average: Math.round((sum * 100.0) / count) / 100,
          },
          Description: `sum: ${sum}, count: ${count}, avg: ${avg}`,
        };
        return response;
      }

      // eslint-disable-next-line no-var
      var response: GenericResponse = {
        Status: _Status.Failed,
        Data: 0,
        Description: `count: 0`,
      };
      return response;
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
