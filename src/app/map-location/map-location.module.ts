import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MapLocationRoutingModule } from './map-location-routing.module';
import { RidermapComponent } from './rider-map/ridermap/ridermap.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DxTemplateModule,
         DxListModule,
         DxBoxModule,
         DxToolbarModule,
         DxButtonModule, 
         DxTabPanelModule,
         DxDataGridModule
        } from 'devextreme-angular';
import { OrderTestComponent } from './order-test/order-test.component';
import { RiderOrderService } from './services/rider-order-services';
import { RidersComponent } from './rider-map/riders/riders.component';
import { OrdersComponent } from './rider-map/orders/orders.component';


@NgModule({
  declarations: [
    RidermapComponent,
    OrderTestComponent,
    OrdersComponent,
    RidersComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,    
    DxListModule,
    DxBoxModule,
    DxButtonModule,
    DxToolbarModule,
    DxTabPanelModule,
    DxDataGridModule,
    MapLocationRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0uM0PP4_pTOAWjYvsljWeOC_lRJUVy0A'
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    })
  ],
  providers: [
    RiderOrderService
  ]
})
export class MapLocationModule { }
