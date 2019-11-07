import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from '../services/auth/AuthguardService';
import { RiderTransactionComponent } from './rider-transaction/rider-transaction.component';
import { TranHistoryComponent } from './tran-history/tran-history.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { WalletsComponent } from './wallets/wallets.component';
import { OrderReceivedComponent } from './order-received/order-received.component';

const routes: Routes = [
  { path: "",canActivate: [AuthguardService], component: RiderTransactionComponent  },
  { path: "translist", canActivate: [AuthguardService],component: RiderTransactionComponent  },
  { path: "transhis", canActivate: [AuthguardService],component: TranHistoryComponent  },
  { path: "commision", canActivate: [AuthguardService],component: CommissionsComponent  },
  { path: "wallets", canActivate: [AuthguardService],component: WalletsComponent  },
  { path: "orderrecv", canActivate: [AuthguardService],component: OrderReceivedComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiderTransRoutingModule { }
