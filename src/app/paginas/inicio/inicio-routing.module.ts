import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    children: [
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'formulario',
        loadChildren: () => import('./formulario/formulario.module').then( m => m.FormularioPageModule)
      },
      {
        path: 'recomendaciones',
        loadChildren: () => import('./recomendaciones/recomendaciones.module').then( m => m.RecomendacionesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
