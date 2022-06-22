import { IsBoolean, IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreatePackageInterestDto{ 
    userId: string;

    @IsInt()
    packageId: number;

    @IsBoolean()
    hasAlternatePlan: boolean;

    @IsNotEmpty()
    @IsNumber()
    proposedAmount: number;
    @IsNotEmpty()
    pickupType: string;
   
    //@IsDate()
    pickupDate: Date;

    @IsNotEmpty()
    deliveryType: string;

    
    isAwarded: boolean;
   
    isInterested: boolean;

    courierTripId: number;

   
}