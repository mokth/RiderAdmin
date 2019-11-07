import { Component, OnInit,OnChanges, Input, ViewChild, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { BookingApiService } from 'src/app/services/api-services/booking-api';
import { Booking, BookingInfo, Task } from 'src/app/model';

import { DxPopupComponent } from 'devextreme-angular';

@Component({
  selector: 'app-booking-entry',
  templateUrl: './booking-entry.component.html',
  styleUrls: ['./booking-entry.component.css']
})

export class BookingEntryComponent implements OnInit,OnChanges {
  @Input() popupVisible: boolean;
  @Input() slots: any;
  @Input() mode: string;
  @Input() booking: Booking;
  @Output() messageEvent = new EventEmitter<BookingInfo>();
  @ViewChild("popup",{static:true}) popup: DxPopupComponent;
  
  dataSource: any;
  riders: any;
  note: string;
  errmsg:string;
  status: any = ['Cancel', 'Confirm', 'Pending'];
  
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

}
