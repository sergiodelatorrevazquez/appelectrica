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
  maxIndex: number = 0;
  minIndex: number = 0;
  nowIndex: number = 0;
  max: number;
  min: number;
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
            value: +((+x.value)/1000).toFixed(5)
          })
        });

        let max = this.priceTime[0].value;
        let min = this.priceTime[0].value;
        let total = 0;

        let hour = new Date().getHours().toString();
        if(hour.length == 1){
          hour = `0${hour}`;
        }

        for(let i = 0; i < this.priceTime.length; i++){
          if ((this.priceTime[i].value > max && +this.priceTime[i].time >= +hour) || (this.priceTime[i].value == max && this.maxIndex == 0)) {
            max = this.priceTime[i].value;
            this.maxIndex = i;
          }

          if((this.priceTime[i].value < min && +this.priceTime[i].time >= +hour) || (this.priceTime[i].value == min && this.minIndex == 0)) {
            min = this.priceTime[i].value;
            this.minIndex = i;
          }

          if(this.priceTime[i].time == hour){
            this.nowIndex = i;
          }

          total += this.priceTime[i].value;
        }

        this.max = max;
        this.min = min;
        this.mean = +((total/this.priceTime.length).toFixed(5));
      }
    )
  }

}
