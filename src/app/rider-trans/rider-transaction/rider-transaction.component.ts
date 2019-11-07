import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import ArrayStore from 'devextreme/data/array_store';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';

import { AuthService } from '../../services/auth/auth-service';
import { TransApiService } from '../../services/api-services/trans-api.service';
import { WalletTransType, TransDetail, TrxAction } from '../../model/transaction';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-rider-transaction',
  templateUrl: './rider-transaction.component.html',
  styleUrls: ['./rider-transaction.component.css']
})

export class RiderTransactionComponent implements OnInit {
  dataSource: any;
  actions: any;
  popupVisible = false;
  mode: string = "";
  selectedTrans: TransDetail;
  transType: any;
  canApprove:boolean;
  canCancel:boolean;
  buttons: any = [
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
  @ViewChild("dxgrid", { static: true }) dxgrid: DxDataGridComponent;

  constructor(@Inject('API_URL') public apiUrl: string,
    private auth: AuthService,
    private api: TransApiService) {
    let serviceUrl = apiUrl + 'admintrx/translist'
    this.dataSource = createStore({
      key: "id",
      loadUrl: serviceUrl,
      onBeforeSend: (r, s) => this.onBeforeSend(r, s, auth),
      errorHandler: (e) => { console.log(e) }
    })
  }

  ngOnInit() {
    this.canApprove = false;
    this.canApprove = false;
    this.api.getTransType()
      .subscribe((resp: WalletTransType[]) => {
        this.transType = new ArrayStore({
          data: resp,
          key: "id"
        });
      });
  }

  onBeforeSend(r, s, auth: any) {
    const token = this.auth.getAuthToken();
    s.headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
  }

  actionClick(event, data: TransDetail) {
    if (event.itemIndex == 0) {
      this.onEditTrans(data);
    } else {
      let result = confirm("<i>Are you sure?</i>", "Confirm Delete");
      result.then((dialogResult) => {
        if (dialogResult){
           this.onDeteleTrans(data);
        }
      });
    
    }
  }

  onDeteleTrans(data: TransDetail) {
    if (data.orderNo!=null){
      if (data.orderNo.length>3){
        notify("This record can not be delete.","warning",3000);
        return;
      }
    }
    if (data.transactionStatus!='Pending'){
      notify("Only can delete Pending status record.","warning",3000);
      return;
    }
    this.api.deleteTrans(data)
       .subscribe((resp:any)=>{
          if (resp.ok=="yes"){
            notify("Record deleted.","success",3000);
          }else {
            notify("Error deleting. "+resp.error,"error",3000);
          }
          this.dxgrid.instance.refresh();
       });
  }

  onEditTrans(data: TransDetail) {
   
    if (data.orderNo!=null){
      if (data.orderNo.length>3){
        notify("This record can not be edit.","warning",3000);
        return;
      }
    }
    if (data.transactionStatus=='Confirm' ||
        data.transactionStatus=='Cancel'){
      notify("Access denied.","warning",3000);
      return;
    }
    let trans = new TransDetail();
    this.selectedTrans = trans.populate(data);
    this.popupVisible = true;
    this.mode = "Edit";
  }

  onNewTrans(e) {
    this.popupVisible = true;
    let trx = new TransDetail();
    trx.transactionDate = new Date();
    trx.transactionStatus ='Pending';
    this.selectedTrans = trx;    
    this.mode = "New";
  }

  receiveMessage(info: any) {
    if (info.success) {
      this.dxgrid.instance.refresh();
    }
    this.popupVisible = false;
    this.mode = "";
  }

  onApproveTrx(e){
    this.canApprove= true;
    let selection:any = this.dxgrid.instance.getSelectedRowsData();
    let keyArr:number[]=[];
    selection.forEach(x => {
       if (x.transactionStatus.toLowerCase()!="pending" &&
           x.transactionStatus.toLowerCase()!="in progress"){
          notify("Status must in Pending or In Progress to approve.","warning",3000);
          this.canApprove= false;
          return;            
       }
       keyArr.push(x.id);
    });
    if (keyArr.length>0){
        this.performTrxAction("CONFIRM",keyArr);
    }
  }

  performTrxAction(action:string, keyArr:number[]){
     let trx:TrxAction = new TrxAction();
     trx.action = action;
     trx.keyIDs = keyArr.toString();
     this.api.postTransAction(trx)
       .subscribe((resp:any)=>{
            console.log(resp);
            if (resp.ok=="yes"){
               notify(resp.error,"success",3000);
               this.dxgrid.instance.clearSelection();
               this.dxgrid.instance.refresh();
            }else{
              notify(resp.error,"error",3000);
            }
            this.canApprove= false;
            this.canCancel= false;
       });
  }

  onCancelTrx(e){
    this.canCancel= true;
    let keyArr:number[]=[];
    let selection:any = this.dxgrid.instance.getSelectedRowsData();
    selection.forEach(x => {
      if (x.transactionStatus.toLowerCase()!="confirm"){
         notify("Status must in Confirm to cancel.","warning",3000);
         this.canCancel= false;
         return;            
      }
      keyArr.push(x.id);
   });
   if (keyArr.length>0){
     this.performTrxAction("CANCEL",keyArr);
   }
  }
}
