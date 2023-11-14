import { Component, OnInit, inject } from '@angular/core';
import { PriceTime } from 'src/app/models/price-time.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-precios-inv',
  templateUrl: './precios-inv.page.html',
  styleUrls: ['./precios-inv.page.scss'],
})
export class PreciosInvPage implements OnInit {

  apiService = inject(ApiService);

  prices: any;
  priceTime: PriceTime[] = [{
    time: '00',
    value: 0
  }];
  horaMin: PriceTime = {
    time: '00',
    value: 0
  };
  horaMax: PriceTime = {
    time: '00',
    value: 0
  };
  nowIndex: number = 0;
  mean: number = 0;

  constructor(
  ) { }

  ngOnInit(){

  }

  ionViewWillEnter() {
    this.getPrices();
  }

  getPrices() {
    this.apiService.getPrices().subscribe(
      (res) => {
        this.prices = res;

        console.log(res);

        this.priceTime = [];

        this.prices.indicator.values.forEach(x => {
          this.priceTime.push({
            time: x.datetime.substring(11, 13),
            value: +((+x.value) / 1000).toFixed(5)
          })
        });

        let hour = new Date().getHours().toString();
        if (hour.length == 1) {
          hour = `0${hour}`;
        }

        const priceTimeFilter = this.priceTime.filter(x => +x.time >= +hour);

        this.horaMin = priceTimeFilter.reduce((min, x) => {
          return x.value < min.value ? x : min;
        }, priceTimeFilter[0]);

        this.horaMax = priceTimeFilter.reduce((max, x) => {
          return x.value > max.value ? x : max;
        }, priceTimeFilter[0]);

        let total = 0;

        for (let i = 0; i < this.priceTime.length; i++) {
          if (this.priceTime[i].time == hour) {
            this.nowIndex = i;
          }

          total += this.priceTime[i].value;
        }

        this.mean = +((total / this.priceTime.length).toFixed(5));
      }
    )
  }
}
