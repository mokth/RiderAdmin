import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth-service';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import ArrayStore from 'devextreme/data/array_store';
import { TransApiService } from 'src/app/services/api-services/trans-api.service';

@Component({
  selector: 'app-tran-history',
  templateUrl: './tran-history.component.html',
  styleUrls: ['./tran-history.component.css']
})
export class TranHistoryComponent implements OnInit {
  dataSource:any;
  constructor(@Inject('API_URL') public apiUrl: string,
    private auth: AuthService,
    private api: TransApiService) {
    let serviceUrl = apiUrl + 'admintrx/transhis'
    this.dataSource = createStore({
      key: "id",
      loadUrl: serviceUrl,
      onBeforeSend: (r, s) => this.onBeforeSend(r, s, auth),
      errorHandler: (e) => { console.log(e) }
    })
  }

  ngOnInit() {
  }
  
  
  onBeforeSend(r, s, auth: any) {
    const token = this.auth.getAuthToken();
    s.headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    };
  }

}
