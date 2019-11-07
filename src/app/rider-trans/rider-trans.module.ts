import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiderTransRoutingModule } from './rider-trans-routing.module';
import { RiderTransactionComponent } from './rider-transaction/rider-transaction.component';
import { HttpClientModule } from '@angular/common/http';
import { TranEntryComponent } from './tran-entry/tran-entry.component';
import { TranHistoryComponent } from './tran-history/tran-history.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { WalletsComponent } from './wallets/wallets.component';
import { OrderReceivedComponent } from './order-received/order-received.component';

import { DxDataGridModule } from 'devextreme-angular';
import { DxDateBoxModule } from 'devextreme-angular';
import { DxButtonGroupModule } from 'devextreme-angular';
import { DxTemplateModule } from 'devextreme-angular';
import { DxPopupModule } from 'devextreme-angular';
import { DxTextAreaModule } from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular';
import { DxNumberBoxModule } from 'devextreme-angular';
import { DxSelectBoxModule } from 'devextreme-angular';
import { DxLookupModule } from 'devextreme-angular';
import { DxTextBoxModule } from 'devextreme-angular';
import { DxToolbarModule } from 'devextreme-angular';

// import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
// import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
// import { DxButtonGroupModule } from 'devextreme-angular/ui/button-group';
// import { DxTemplateModule } from 'devextreme-angular/core/template';
// import { DxPopupModule } from 'devextreme-angular/ui/popup';
// import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';
// import { DxButtonModule } from 'devextreme-angular/ui/button';
// import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
// import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
// import { DxLookupModule } from 'devextreme-angular/ui/lookup';
// import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
// import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';


@NgModule({
  declarations: [
    RiderTransactionComponent, 
    TranEntryComponent, 
    TranHistoryComponent, 
    CommissionsComponent, 
    WalletsComponent, 
    OrderReceivedComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    DxDataGridModule,
    DxDateBoxModule,
    DxTemplateModule,
    DxButtonGroupModule,
    DxPopupModule,
    DxTextAreaModule,
    DxButtonModule,
    DxNumberBoxModule,
    DxSelectBoxModule,
    DxLookupModule,
    DxTextBoxModule,
    DxToolbarModule,
    RiderTransRoutingModule
  ]
})
export class RiderTransModule { }
