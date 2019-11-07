import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth-service';
import { TransDetail, TrxAction } from '../../model/transaction';
import { ApiService } from './api-services';

@Injectable({
  providedIn: 'root'
})
export class TransApiService extends ApiService {

  constructor(
    public http: HttpClient,
    @Inject('API_URL') public apiUrl: string,
    private auth: AuthService
  ) {
    super(http, apiUrl);
  }

  getTransType() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.auth.getAuthToken());
    return this.http.get(this.apiUrl + "admintrx/transtype",
      { headers: headers });
  }

  postTrans(trxdtl: TransDetail,mode:string) {
    if (mode=="edit"){
       trxdtl.updateBy = this.auth.getUserInfo().name;
    }else {
      trxdtl.createBy = this.auth.getUserInfo().name;
    }
    let body = JSON.stringify(trxdtl);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.auth.getAuthToken());
    return this.http.post(this.apiUrl + 'admintrx/transaction',
      body, { headers: headers });
  }

  postTransAction(action: TrxAction) {   
    let body = JSON.stringify(action);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.auth.getAuthToken());
    return this.http.post(this.apiUrl + 'admintrx/perform',
      body, { headers: headers });
  }

  deleteTrans(trxdtl: TransDetail) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.auth.getAuthToken());
    return this.http.delete(this.apiUrl + 'admintrx/'+trxdtl.id,
           { headers: headers });
  }
}
