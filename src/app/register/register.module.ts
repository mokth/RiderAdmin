import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiderRegisterComponent } from './registration/rider-register/rider-register.component';
import { SuccessRegComponent } from './registration/success-reg/success-reg.component';
import { RiderInfoComponent } from './registration/rider-info/rider-info.component';
import { RegisterAdminComponent } from './registration/register-admin/register-admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DxDataGridModule, DxFileUploaderModule, DxButtonModule } from 'devextreme-angular';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';

import { RegisterRoutingModule } from './register-route-module';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    RiderRegisterComponent,
    SuccessRegComponent,
    RegisterAdminComponent,
    RiderInfoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    //  MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatProgressSpinnerModule,
    DxDataGridModule,
    DxButtonModule,
    DxFileUploaderModule,
    NgxMatIntlTelInputModule,
    RegisterRoutingModule,
    NgxMaskModule.forRoot(),
  ]
})
export class RegisterModule { }
