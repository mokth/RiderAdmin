import { tryCatch } from 'rxjs/internal/util/tryCatch';

export class WalletTransType {
    id: number;
    display: string;
    trxType: string;
    direction: string;
    description: string;
}

export class TransDetail {
    id :number;
    ckey :number;
    rider_Name :string;
    orderNo:string;
    transactionDate :Date;
    transactionDesc :string;
    transactionAmt :number;
    transactionType :string;
    transactionStatus :string;
    refType :string;
    remarks :string;
    createDate :Date;
    createBy :string;
    updateDate :Date;
    updateBy :string;
    imageFname :string;

    populate(data:TransDetail){
      let trx = new TransDetail();
      trx.refType = data.refType;
      trx.ckey = data.ckey;
      trx.id = data.id;
      trx.orderNo= data.orderNo;
      trx.imageFname = data.imageFname;
      trx.rider_Name = data.rider_Name;
      trx.remarks = data.remarks;
      trx.transactionAmt = data.transactionAmt;
      trx.transactionDesc = data.transactionDesc;
      trx.transactionDate = new Date(data.transactionDate);
      trx.transactionStatus = data.transactionStatus;
      trx.transactionType = data.transactionType;
    
      return trx;
    }
}

export class TransInfo {
    trx:TransDetail;
    mode:string;
    success:boolean;
}

export class TrxAction {
    action:string;
    keyIDs:string;
}