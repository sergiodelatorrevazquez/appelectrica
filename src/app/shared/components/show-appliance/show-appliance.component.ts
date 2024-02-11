import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { PriceTime } from 'src/app/models/price-time.model';

@Component({
  selector: 'app-show-appliance',
  templateUrl: './show-appliance.component.html',
  styleUrls: ['./show-appliance.component.scss'],
})
export class ShowApplianceComponent implements OnInit {

  lavavajillas: string;
  lavadora: string;
  secadora: string;
  plancha: string;
  coche: string;

  hayCoche: boolean;
  maxHour: boolean;

  priceTime3: PriceTime[];
  priceTime2: PriceTime[];

  constructor(navParams: NavParams) {
    this.hayCoche = navParams.get('hayCoche');
    if (!this.hayCoche) {
      this.maxHour = navParams.get('maxHour');
      this.lavavajillas = navParams.get('lavavajillas');
      this.lavadora = navParams.get('lavadora');
      this.secadora = navParams.get('secadora');
      this.plancha = navParams.get('plancha');
      this.priceTime3 = navParams.get('priceTime3');
      this.priceTime2 = navParams.get('priceTime2');
    } else {
      this.coche = navParams.get('coche');
      this.priceTime3 = navParams.get('priceTimeCoche');
    }
  }

  ngOnInit() {
  }

  appliance(appliance: string) {
    if (appliance != "-1") return true;
    else return false;
  }

}
