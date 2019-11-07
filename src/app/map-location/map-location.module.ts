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
         DxButtonModule 
        } from 'devextreme-angular';


// import { DxTemplateModule } from 'devextreme-angular/core/template';
// import { DxListModule } from 'devextreme-angular/ui/list';
// import { DxBoxModule } from 'devextreme-angular/ui/box';
// import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
// import { DxButtonModule } from 'devextreme-angular/ui/button';


@NgModule({
  declarations: [
    RidermapComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,    
    DxListModule,
    DxBoxModule,
    DxButtonModule,
    DxToolbarModule,
    MapLocationRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0uM0PP4_pTOAWjYvsljWeOC_lRJUVy0A'
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    })
  ],
 
})
export class MapLocationModule { }
