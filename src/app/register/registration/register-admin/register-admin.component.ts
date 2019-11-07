import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { createStore } from 'devextreme-aspnet-data-nojquery';

import { Router } from '@angular/router';

import { HttpHeaders } from '@angular/common/http';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { RegisterApiService } from 'src/app/services/api-services/reg-api-services';
import { AuthService } from 'src/app/services/auth/auth-service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {
  dataSource: any;
  isSmallScreen:boolean;

  constructor(private api: RegisterApiService,
              private auth: AuthService,
              private router: Router,
              public breakpointObserver: BreakpointObserver) {
    //const token=this.auth.getAuthToken();
    let serviceUrl = api.apiUrl + 'Registration/registrations'
    this.dataSource = createStore({
      key: "uid",
      loadUrl: serviceUrl,   
      onBeforeSend:(r,s)=>this.onBeforeSend(r,s,auth),
      errorHandler:(e)=>{console.log(e)}  
    })
  }

  ngOnInit() {
    this.breakpointObserver
    .observe(['(min-width: 560px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        console.log('Viewport is 500px or over!');
        this.isSmallScreen = false;
      } else {
        console.log('Viewport is getting smaller!');
        this.isSmallScreen = true;
      }
    });
  }
  
  logOut(){
    this.auth.logOut();
    this.router.navigate(['/login']);
  }
  
  onBeforeSend(r, s,auth:any) {
    const token=this.auth.getAuthToken();
    
    s.headers = { 
      'Content-Type':'application/json',
      'Authorization': token
    };
  }

  onEdit(d) {
    //console.log(e);
    this.router.navigate(['/regadmin/rider'], { state: { data: d.data } });
  }
}
