import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreciosInvPageRoutingModule } from './precios-inv-routing.module';

import { PreciosInvPage } from './precios-inv.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreciosInvPageRoutingModule,
    SharedModule
  ],
  declarations: [PreciosInvPage]
})
export class PreciosInvPageModule {}
