import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { SelectApplianceComponent } from 'src/app/shared/components/select-appliance/select-appliance.component';

@Component({
  selector: 'app-planificador',
  templateUrl: './planificador.page.html',
  styleUrls: ['./planificador.page.scss'],
})
export class PlanificadorPage implements OnInit {

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
  }

  async onClickElectrodomestico(){
    await this.utilsService.presentModal({
      component: SelectApplianceComponent,
      cssClass: 'modal',
      componentProps: {
        'coche': false
      }
    })
  }

  async onClickCoche(){
    await this.utilsService.presentModal({
      component: SelectApplianceComponent,
      cssClass: 'modal',
      componentProps: {
        'coche': true
      }
    })
  }

}
