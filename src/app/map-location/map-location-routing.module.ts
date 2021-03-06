import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from '../services/auth/AuthguardService';
import { RidermapComponent } from './rider-map/ridermap/ridermap.component';
import { OrderTestComponent } from './order-test/order-test.component';

const routes: Routes = [
  { path: "", canActivate: [AuthguardService],component:RidermapComponent  },
  { path: "ridermap", canActivate: [AuthguardService], component: RidermapComponent  },
  { path: "ordertest", canActivate: [AuthguardService], component: OrderTestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapLocationRoutingModule { }
