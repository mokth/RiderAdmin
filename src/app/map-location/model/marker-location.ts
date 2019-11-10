export class MarkerLocation{
    lat:number;
    lng:number;
    label:string;
    orderno:string;
    status:string; //free, assign pickup, deliver, completed
    isPickup:boolean;
    isDeliver:boolean;
    name:string;
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