import { NgModule } from '@angular/core';

import { DxToolbarModule,DxDrawerModule,DxTreeViewModule } from 'devextreme-angular';


// import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
// import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
// import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';


@NgModule({
    imports: [],
    providers: [],
    declarations: [],
    bootstrap: [],
    exports: [
       
       // DxMenuModule,
        DxToolbarModule,
        DxDrawerModule, 
        DxTreeViewModule, 
       
        
    ]
})
export class DevExpressModule { }