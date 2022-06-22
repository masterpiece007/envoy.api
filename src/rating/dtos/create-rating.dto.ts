/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';
export class CreateRatingDto {
  @IsNumber()
  stars: number;

  @IsString()
  comment: string;

  @IsNumber()
  packageId: number;

  @IsString()
  userId: string;
}
