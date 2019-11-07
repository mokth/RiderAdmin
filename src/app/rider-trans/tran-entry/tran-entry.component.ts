import { Component, OnInit,OnChanges, Input, ViewChild, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

import { TransDetail, TransInfo } from '../../model/transaction';
import { TransApiService } from 'src/app/services/api-services/trans-api.service';

@Component({
  selector: 'app-tran-entry',
  templateUrl: './tran-entry.component.html',
  styleUrls: ['./tran-entry.component.css']
})
export class TranEntryComponent implements OnInit {
 
  riders: any;
  errmsg:string;
  status:string[]=['In Progress','Confirm','Cancel','Pending'];
  @Input() mode: string;
  @Input() transdtl: TransDetail;
  @Input() popupVisible: boolean;
  @Input() transType:any; 
  @Output() messageEvent = new EventEmitter<TransInfo>();
  @ViewChild("popup",{static:true}) popup: DxPopupComponent;
  
  constructor(private api:TransApiService) {
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
  
  transTypeChange(e){
    console.log(e.selectedItem)
    this.transdtl.transactionDesc= e.selectedItem.display;
    this.transdtl.refType = e.selectedItem.display;
    this.transdtl.transactionType = e.selectedItem.direction;
  }

  sendMessage(stat:TransInfo) {
    this.messageEvent.emit(stat);
  }

  onSave(e) {
    if (this.mode=="New"){
      this.saveNewTransDtl();
    }else  if (this.mode=="Edit"){
      this.updateNewTransDtl();
    } 
  }

  saveNewTransDtl(){
    this.api.postTrans(this.transdtl,'new')
    .subscribe((resp:any)=>{
      console.log(resp.value);       
      if (resp.value.ok=="yes"){   
        this.transdtl.id = resp.value.newid; 
        let info = new TransInfo();
        info.trx = this.transdtl;
        info.success = true;
        info.mode = this.mode;   
        this.sendMessage(info);
        this.popup.instance.hide();
        notify('Transaction Saved!', 'success', 3000);       
      }else {
        this.errmsg = resp.error;
      }       
    });
  }

  updateNewTransDtl(){
    this.api.postTrans(this.transdtl,'edit')
    .subscribe((resp:any)=>{
      console.log(resp);       
      if (resp.value.ok=="yes"){   
        let info = new TransInfo();
        info.trx = this.transdtl;
        info.success = true;
        info.mode = this.mode;   
        this.popup.instance.hide();
        this.sendMessage(info);  
        notify('Transaction Updated!', 'success', 3000);      
      }else {
        this.errmsg = resp.error;
      }       
    });
  }

  onCancel(e) {  
    this.popup.instance.hide();
    let info = new TransInfo();
    info.trx = null;
    info.success = false;
    info.mode = 'close';
    this.sendMessage(info);
  }

  onPopHide(e){
    this.onCancel(e);
  }
}
