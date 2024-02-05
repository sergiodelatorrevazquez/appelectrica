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
        path: 'recomendaciones',
        loadChildren: () => import('./recomendaciones/recomendaciones.module').then( m => m.RecomendacionesPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'ranking',
        loadChildren: () => import('./ranking/ranking.module').then( m => m.RankingPageModule)
      },
      {
        path: 'planificador',
        loadChildren: () => import('./planificador/planificador.module').then( m => m.PlanificadorPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
