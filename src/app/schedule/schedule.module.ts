import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { BookingListComponent } from './booking/booking-list/booking-list.component';
import { BookingEntryComponent } from './booking/booking-entry/booking-entry.component';
import { BookingSlotEntryComponent } from './booking/booking-slot-entry/booking-slot-entry.component';

import { DxDataGridModule,
         DxTemplateModule ,
         DxSchedulerModule ,
         DxButtonGroupModule ,
         DxButtonModule ,
         DxDateBoxModule ,
         DxPopupModule ,
         DxTextAreaModule ,
         DxLookupModule  ,
         DxSelectBoxModule ,
         DxBulletModule
         } from 'devextreme-angular';

// import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
// import { DxTemplateModule } from 'devextreme-angular/core/template';
// import { DxSchedulerModule } from 'devextreme-angular/ui/scheduler';
// import { DxButtonGroupModule } from 'devextreme-angular/ui/button-group';
// import { DxButtonModule } from 'devextreme-angular/ui/button';
// import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
// import { DxPopupModule } from 'devextreme-angular/ui/popup';
// import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
// import { DxLookupModule } from 'devextreme-angular/ui/lookup';
// import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
// import { DxBulletModule } from 'devextreme-angular/ui/bullet';


@NgModule({
  declarations: [
    BookingListComponent,
    BookingEntryComponent, 
    BookingSlotEntryComponent  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    DxDataGridModule,
    DxTemplateModule,
    DxSchedulerModule,
    DxButtonGroupModule,
    DxButtonModule,
    DxDateBoxModule,
    DxPopupModule,
    DxTextAreaModule,
    DxLookupModule,
    DxSelectBoxModule,
    DxBulletModule,   
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
