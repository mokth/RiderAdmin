import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthguardService } from './services/auth/AuthguardService';
import { MainPageComponent } from './main/main-page/main-page.component';

const routes: Routes = [
  { path: "", component: MainPageComponent },
  { path: "home", component: MainPageComponent },
  {
    path: "ridermap",
    loadChildren: () => import('./map-location/map-location.module')
      .then(m => m.MapLocationModule)
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: "booking",
    loadChildren: () => import('./schedule/schedule.module')
      .then(m => m.ScheduleModule)
  },
  {
    path: 'regadmin',
    loadChildren: () => import('./register/register.module')
      .then(m => m.RegisterModule)
  },
  {
    path: 'translist',
    loadChildren: () => import('./rider-trans/rider-trans.module')
      .then(m => m.RiderTransModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
