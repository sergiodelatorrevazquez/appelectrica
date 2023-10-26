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
  priceTime: PriceTime[];

  ngOnInit() {
    this.getPrices();
  }

  getPrices(){
    this.apiService.getPrices().subscribe(
      (res) => {
        this.prices = res;
        console.log(res);
        this.priceTime = [];
        this.prices.indicator.values.forEach(x => {
          this.priceTime.push({
            time: x.datetime.substring(11, 16),
            value: x.value
          })
        });
      }
    )
  }

}
