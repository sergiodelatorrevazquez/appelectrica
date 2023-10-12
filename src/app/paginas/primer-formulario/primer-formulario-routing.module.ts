import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrimerFormularioPage } from './primer-formulario.page';

const routes: Routes = [
  {
    path: '',
    component: PrimerFormularioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrimerFormularioPageRoutingModule {}
