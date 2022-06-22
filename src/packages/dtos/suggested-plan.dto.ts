export class SuggestedPlanDto{  
  
    packageId: number;
    
    interestId: number;

    proposedPickupType: string;
   
    proposedDeliveryType: string;
  
    proposedPickupDateTime: Date;
    
    proposedAmount: number;

    dateCreated?: Date;
}