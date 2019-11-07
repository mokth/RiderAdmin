export class MarkerLocation{
   lat:number;
   lng:number;
   label:string;
   orderno:string;
   status:string; //free, pickup, deliver, completed
   type:string;  //rider,mechant,customer
   riderid:string;
   date:Date;

   //type: Rider
   //status: Free, Pickup, Deliver,Completed
   //type: Merchant
   //status: Ready, Pickup
   //type: Customer
   //status: Waiting, Received
}

export class Task {
   Id: number;
   Assigned: string;
   Subject: string;
}