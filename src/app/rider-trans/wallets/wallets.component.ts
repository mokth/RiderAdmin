import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth-service';
import { TransApiService } from 'src/app/services/api-services/trans-api.service';
import { createStore } from 'devextreme-aspnet-data-nojquery';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {
  dataSource: any;

  constructor(@Inject('API_URL') public apiUrl: string,
    private auth: AuthService,
    private api: TransApiService) {
    let serviceUrl = apiUrl + 'adminTrx/wallets'
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
