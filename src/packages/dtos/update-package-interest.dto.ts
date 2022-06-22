/* eslint-disable prettier/prettier */
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
export class UpdatePackageInterestDto {
  @IsNotEmpty()
  @IsString()
  proposedPickupType: string;

  @IsNotEmpty()
  @IsString()
  proposedDeliveryType: string;

  @IsNumber()
  proposedAmount: number;

  desiredPickupPointOrArea: string;

  desiredDropPointOrArea: string;

  @IsNumber()
  packageId: number;

  courierId: string;

  proposedPickupDateTime: Date;

  isInterested: boolean;
}
