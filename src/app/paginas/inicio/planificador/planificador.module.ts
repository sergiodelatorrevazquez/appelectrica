import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanificadorPageRoutingModule } from './planificador-routing.module';

import { PlanificadorPage } from './planificador.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanificadorPageRoutingModule,
    SharedModule
  ],
  declarations: [PlanificadorPage]
})
export class PlanificadorPageModule {}
