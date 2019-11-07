import { Component, OnInit,OnChanges, Input, ViewChild, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { BookingApiService } from 'src/app/services/api-services/booking-api';
import { Booking, BookingInfo, Task } from 'src/app/model';

import { DxPopupComponent } from 'devextreme-angular';

@Component({
  selector: 'app-bookingslot-entry',
  templateUrl: './booking-slot-entry.component.html',
  styleUrls: ['./booking-slot-entry.component.css']
})

export class BookingSlotEntryComponent implements OnInit,OnChanges {
  @Input() popupVisible: boolean;
  @Input() slots: any;
  @Input() mode: string;
  @Input() booking: Booking;
  @Input() bookarr:boolean[];
  @Output() messageEvent = new EventEmitter<BookingInfo>();
  @ViewChild("popup",{static:true}) popup: DxPopupComponent;
  
  dataSource: any;
  riders: any;
  note: string;
  errmsg:string;
  status: any = ['Cancel', 'Confirm', 'Pending'];
  // slotarr:number[] = [10,11,12,1,2,3,4,5,6,7,8,9,10];
  //bookarr:boolean[] = [false,false,false,false,false,false,false,false,false,false,false,false,false];

  constructor(private api: BookingApiService) {
    this.api.getRiderNames()
      .subscribe((names: any) => {
        this.riders = names;    
        console.log(this.riders);   
      });     
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (this.popupVisible){
      this.popup.instance.show();
    }    
  }

  slotclick(slot:number){
    this.bookarr[slot] = !this.bookarr[slot];
  }

  onSaveBook(e) {
    if (this.mode=="New"){
      this.saveNewBooking();
    }else  if (this.mode=="Edit"){
      this.updateBooking();
    } 

  }

  onCancelBook(e) {  
   this.popup.instance.hide();
   let info = new BookingInfo();
          info.book = null;
          info.success = false;
          info.mode = 'close';
   this.sendMessage(info);
  }

  saveNewBooking(){
    this.booking.SlotList = [];
    // String.fromCharCode(65); start from A
    console.log(this.bookarr);
    let i:number;
    for (i = 0; i < this.bookarr.length; i++) {
       if(this.bookarr[i]){
         this.booking.SlotList.push(String.fromCharCode(65+i));
       }
    }
    console.log( this.booking.SlotList);
    this.api.postBooking(this.booking)
    .subscribe((resp:any)=>{
      console.log(resp);       
      if (resp.ok=="yes"){         
        let info = new BookingInfo();
        info.book = this.booking;
        info.success = true;
        info.mode = this.mode;   
        this.popup.instance.hide();
        this.sendMessage(info);       
      }else {
        this.errmsg = resp.error;
      }       
    });
  }

  updateBooking(){
   // this.booking.bookArr = [...this.bookarr];
    this.api.putBooking(this.booking)
    .subscribe((resp:any)=>{
      console.log(resp);       
      if (resp.ok=="yes"){         
        let info = new BookingInfo();
        info.book = this.booking;
        info.success = true;
        info.mode = this.mode;   
        this.popup.instance.hide();
        this.sendMessage(info);       
      }else {
        this.errmsg = resp.error;
      }       
    });
  }

  sendMessage(stat:BookingInfo) {
    this.messageEvent.emit(stat);
  }
  
  onPopHide(e){
    this. onCancelBook(e);
  }
}
