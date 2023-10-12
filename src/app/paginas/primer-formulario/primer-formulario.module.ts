import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrimerFormularioPageRoutingModule } from './primer-formulario-routing.module';

import { PrimerFormularioPage } from './primer-formulario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrimerFormularioPageRoutingModule
  ],
  declarations: [PrimerFormularioPage]
})
export class PrimerFormularioPageModule {}
