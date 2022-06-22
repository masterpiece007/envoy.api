/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTripDto {
  @IsNumber()
  id: number;

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

  @IsNotEmpty()
  @IsString()
  destinationState: string;

  @IsNotEmpty()
  @IsString()
  destinationCity: string;

  likelyDropPointOrBusStopArea: string;

  isActive: boolean;
}
