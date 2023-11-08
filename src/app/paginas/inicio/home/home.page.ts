import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { PriceTime } from 'src/app/models/price-time.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  apiService = inject(ApiService);

  constructor() { }

  prices: any;
  priceTime: PriceTime[] = [];
  horaMin: PriceTime;
  horaMax: PriceTime;
  nowIndex: number = 0;
  mean: number;

  ngOnInit() {
    this.getPrices();
  }

  ionViewWillEnter() {
    this.getPrices();
  }

  getPrices() {
    this.apiService.getPrices().subscribe(
      (res) => {
        this.prices = res;

        console.log(res);

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
