/* eslint-disable prettier/prettier */
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreatePackageDto {
  //TODO - add validators to the fields

  @IsNotEmpty()
  name: string;

  //description: string;

  @IsNotEmpty()
  @IsString()
  currentState: string;

  @IsNotEmpty()
  @IsString()
  currentCityOrArea: string;

  @IsNotEmpty()
  @IsString()
  destinationState: string;

  @IsNotEmpty()
  @IsString()
  destinationCityOrArea: string;

  desiredPickupPointOrArea: string;

  desiredDropPointOrArea: string;

  //@IsDate()
  pickupDateTime: Date;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  //deliveryStatus: string;

  @IsNotEmpty()
  @IsString()
  pickupType: string;

  @IsNotEmpty()
  @IsString()
  deliveryType: string;

  @IsNotEmpty()
  @IsString()
  packageImage: string;

  @IsNotEmpty()
  @IsString()
  recipientName: string;

  @IsNotEmpty()
  @IsNumberString()
  recipientPhoneNumber: string;

  userId: string;
}
