/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  @IsString()
  currentState: string;

  @IsNotEmpty()
  @IsString()
  currentCity: string;

  desiredStartingPoint_Area: string;

  @IsNotEmpty()
  nextTravelDate: Date;

  @IsNotEmpty()
  @IsString()
  travelType: string;

  @IsNotEmpty()
  @IsString()
  recurrentType: string;

  //hasPackageForThisTrip: boolean;
  @IsNotEmpty()
  @IsString()
  destinationState: string;

  @IsNotEmpty()
  @IsString()
  destinationCity: string;

  @IsNotEmpty()
  @IsString()
  likelyDropPointOrBusStopArea: string;

  isActive: boolean;

  courierId: string;
}
