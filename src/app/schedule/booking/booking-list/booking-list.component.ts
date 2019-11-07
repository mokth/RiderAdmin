import { Component, OnInit, ViewChild } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';

import { BookingApiService } from '../../../services/api-services/booking-api';
import { Booking, BookSumm, BookingInfo } from '../../../model';


@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})

export class BookingListComponent implements OnInit {
  datasrc:any;
  slots:any;
  selectedDate: Date = new Date();
  selectedSlot:String ="";
  selectedName:String = "";
  booksumm:BookSumm[]=[];
  popupVisible = false;
  mode:string;
  selectedBooking:Booking;
  riders:any;
  timeSlots:any;
  bookarr:boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false];
  buttons:any = [
    {
        icon: "edit",
        action: "Edit",
        hint: "Edit data"
    },
    {
        icon: "trash",
        action: "Del",
        hint: "Delete record"
    }];
   
  //@ViewChild("scheduler",{static:true}) scheduler: DxSchedulerComponent;
 
  constructor(private api: BookingApiService) {
    this.api.getRiderNames()
      .subscribe((names: any) => {
        this.riders = names;
        console.log(this.riders);
      });
    this.getBookSummByDate(this.selectedDate);
  }
  
  ngOnInit() {  
    this.getSlots(); 
    this.getBooking(this.selectedDate);
  }
  
  onOptionChanged(e){
      if (e.name=='currentDate'){
        let date:Date = e.value;
        this.getBookSummByDate(date);
      }    
  }

  private getBookSummByDate(date:Date) {
    this.api.getDailySumm(date)
      .subscribe((data: any) => {
        this.timeSlots=data;
    });
  }

  private getSlots() {
    this.api.getSlots().subscribe(data => {
      this.slots = data;
    });
  }

  getBooking(date:Date){
    if (this.selectedSlot==""){
        this.api.getBooking(date).subscribe(data=>{
          this.datasrc =data;     
      });
    }else {
      this.api.getBookingBySlot(date,this.selectedSlot)
        .subscribe(data=>{
          this.datasrc =data;     
      });
    }
  }

  getBookingByName(){
    if (this.selectedSlot==""){
        this.api.getBookingByName(this.selectedDate,this.selectedName).subscribe(data=>{
          this.datasrc =data;         
      });
    }else{
       this.api.getBookingByNameSlot(this.selectedDate,this.selectedName,this.selectedSlot)
         .subscribe(data=>{
          this.datasrc =data;
        });
      }
  }
 
  
  onDateChanged(e){
    let newDate:Date = e.value;
    this.getBooking(newDate);
    this.getBookSummByDate(newDate);
    this.selectedDate = newDate;
  }
     
  onNameChanged(e){
    this.selectedName = e.selectedItem.Rider_Name;
    this.getBookingByName();
  }

  onSlotChange(e){
    if (e.selectedItem==null){
      this.selectedSlot = "";
      return;
    }
       
    this.selectedSlot =e.selectedItem.code;
     console.log(e.selectedItem.code);
     this.getBooking(this.selectedDate);
    
  }

  itemClick(event,data:Booking){
    let today:Date = new Date();
    let work:Date =  new Date(data.workDate);
   
    if (work < today){
      notify('Can not modify previous working day!', 'warning', 3000);
      return;
    }
    if (event.itemIndex==0){
      this.onEditBooking(data);
    }else {
      this.onDeteleBooking(data);
    }
  }

  onDeteleBooking(data:Booking){
    let result = confirm("<i>Are you sure to delete?</i>", "Confirm changes");
        result.then((dialogResult) => {
            if (dialogResult){
              this.deleteBooking(data);
            }
        });
  }

  deleteBooking(data:Booking){
    this.api.deleteBooking(data)
    .subscribe((resp:any)=>{
         if (resp.ok=="yes"){ 
            this.removeFromBooking(data);
            notify('Record deleted.', 'success', 3000);
            this.getBookSummByDate(this.selectedDate); 
         } else {
          notify('Error deleting record. '+resp.error, 'error', 3000); 
         }
    });
  }

  removeFromBooking(data:Booking){
    var foundIndex = this.datasrc.findIndex(x => x.uid == data.uid);
      if (foundIndex>-1){
        this.datasrc.splice(foundIndex,1);
        
      }
  }

  onEditBooking(data:Booking){
    let book = new Booking();
    this.selectedBooking = book.populate(data);
    this.resetBookArr();
    this.api.getBookingByName(this.selectedBooking.workDate,
           this.selectedBooking.rider_Name)
           .subscribe((resp:any)=>{
              resp.forEach(e => {
               let charNum= e.slot.charCodeAt(0);
               if (charNum>64){
                 let index:number = charNum -65;
                 this.bookarr[index] =true;
               }
              });
              this.popupVisible = true;
              this.mode="Edit";
           });    
  }

  onNewBooking(e){
   
    let book = new Booking();
    book.workDate =this.selectedDate;
    book.bookOn = new Date(); 
    book.slot = this.selectedSlot;   
    this.selectedBooking =book;
    this.resetBookArr();
    this.mode="New";
    this.popupVisible = true;
  }

  resetBookArr(){
   this.bookarr =  this.bookarr.map(x=>x=false);
  }

  receiveMessage(info:BookingInfo){
    if (info.success){
      //  if (info.mode=="New"){
      //     this.datasrc.push(info.book);
      //     this.getBookSummByDate(this.selectedDate,this.selectedSlot);
      //  }else if (info.mode=="Edit"){
      //   var foundIndex = this.datasrc.findIndex(x => x.uid == info.book.uid);
      //   if (foundIndex>-1){
      //     this.datasrc[foundIndex] = info.book;
      //   }
      //  }
      if (this.selectedName==""){
         this.getBooking(this.selectedDate);
      }else{
        this.getBookingByName();
      }     
    }
    this.popupVisible=false;
    this.mode="";
  }
}
