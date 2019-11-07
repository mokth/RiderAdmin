import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from '../services/auth/AuthguardService';
import { BookingListComponent } from './booking/booking-list/booking-list.component';

const routes: Routes = [
  { path: "", canActivate: [AuthguardService],component: BookingListComponent  },
  { path: "booking", canActivate: [AuthguardService],component: BookingListComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
