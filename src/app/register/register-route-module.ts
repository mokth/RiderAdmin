import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RiderRegisterComponent } from './registration/rider-register/rider-register.component';
import { SuccessRegComponent } from './registration/success-reg/success-reg.component';
import { AuthguardService } from '../services/auth/AuthguardService';
import { RegisterAdminComponent } from './registration/register-admin/register-admin.component';
import { RiderInfoComponent } from './registration/rider-info/rider-info.component';

const routes: Routes = [
  { path: "",canActivate: [AuthguardService], component: RegisterAdminComponent  },
  { path: "register", component: RiderRegisterComponent  },
  { path: "success", component: SuccessRegComponent  },
  { path: "regadmin",canActivate: [AuthguardService], component: RegisterAdminComponent  },
  { path: "rider", canActivate: [AuthguardService],component: RiderInfoComponent  },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RegisterRoutingModule { }