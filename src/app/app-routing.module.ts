import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { NoLoginGuard } from './guards/no-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio-sesion',
    pathMatch: 'full'
  },
  {
    path: 'precios-inv',
    loadChildren: () => import('./paginas/precios-inv/precios-inv.module').then( m => m.PreciosInvPageModule),
    canActivate: [NoLoginGuard]
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./paginas/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule),
    canActivate: [NoLoginGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule),
    canActivate: [NoLoginGuard]
  },
  {
    path: 'recuperacion',
    loadChildren: () => import('./paginas/recuperacion/recuperacion.module').then( m => m.RecuperacionPageModule),
    canActivate: [NoLoginGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./paginas/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
