import { StringifyOptions } from 'querystring';

export class Booking {
    uid:number;
    workDate:Date;
    rider_Name:String;
    slot :String;
    bookOn:Date;
    note:String;
    status:String;
    updatedBy :String;
    updatedOn:Date;
    SlotList:String[];

    populate(data:Booking){
        let book= new Booking();
        book.bookOn = new Date(data.bookOn);
        book.note = data.note;
        book.rider_Name= data.rider_Name;
        book.slot = data.slot;
        book.status = data.status;
        book.uid = data.uid;
        book.updatedBy = data.updatedBy;
        book.updatedOn = data.updatedOn;
        book.workDate = new Date(data.workDate);
        book.SlotList = data.SlotList;
        return book;
    }
}

export class BookSumm{
    workDate:Date;
    slot:string;
    rider:number;
    maxRider:number;
    startDate:Date;
    endDate:Date;
    text:String;
 }

 export class BookingInfo {
    book:Booking;
    mode:string;
    success:boolean;

}

// bookOn: "2019-09-29T00:00:00+08:00"
// note: null
// rider_Name: "mok"
// slot: "A"
// status: "Cancel"
// uid: 8
// updatedBy: "ADMIN"
// updatedOn: "2019-09-29T00:00:00+08:00"
// workDate: "2019-09-30T00:00:00+08:00"