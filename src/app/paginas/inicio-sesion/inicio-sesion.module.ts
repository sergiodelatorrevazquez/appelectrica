import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioSesionPageRoutingModule } from './inicio-sesion-routing.module';

import { InicioSesionPage } from './inicio-sesion.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioSesionPageRoutingModule,
    SharedModule
  ],
  declarations: [InicioSesionPage]
})
export class InicioSesionPageModule {}
