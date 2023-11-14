import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreciosInvPage } from './precios-inv.page';

const routes: Routes = [
  {
    path: '',
    component: PreciosInvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreciosInvPageRoutingModule {}
