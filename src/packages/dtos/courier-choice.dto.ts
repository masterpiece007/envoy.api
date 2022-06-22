/* eslint-disable prettier/prettier */
import { IsBoolean, IsNumber } from 'class-validator';

export class CourierChoiceDto {
  @IsNumber()
  interestId: number;

  @IsBoolean()
  isAwarded: boolean;
}
