import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DevExpressModule } from './devextreme-modules';
//import { NgxMaskModule, IConfig } from 'ngx-mask'
import { MatDatepickerModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { ApiService } from './services/api-services/api-services';
import { AuthService } from './services/auth/auth-service';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './services/auth/AuthguardService';
import { CanDeactivateGuard } from './services/auth/CanDeactivateGuard';
import { BookingApiService } from './services/api-services/booking-api';
import { RegisterApiService } from './services/api-services/reg-api-services';
import { MainPageComponent } from './main/main-page/main-page.component';
import { TransApiService } from './services/api-services/trans-api.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
     
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DevExpressModule,
   
    ToastrModule.forRoot(), // ToastrModule added
   
  ],
  providers: [
    ApiService,
    TransApiService,
    BookingApiService,
    RegisterApiService,
    AuthService,
    AuthguardService,
    CanDeactivateGuard,
    
    { provide: 'API_URL', useValue: `${environment.apiUrl}` },
    { provide: 'HUB_URL', useValue: `${environment.hubUrl}` },
    { provide: 'BASE_URL', useValue: `${environment.BASE_URL}` },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

