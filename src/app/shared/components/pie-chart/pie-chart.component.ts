import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent  implements OnInit {

  @Input() percentaje: number;
  @Input() darkMode: boolean;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() { }

  ngOnInit() {
    this.createChart()
  }

  ngOnChanges(){
    this.createChart()
  }

  createChart(){
    this.chartOptions = {
      series: [this.percentaje, 100-this.percentaje],
      chart: {
        width: 600,
        type: "pie"
      },
      labels: ["Tu grupo de consumo", "Resto de grupos de consumo"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350,
              fill:{
                colors: ["#6AC49C", "#F05365"]
              }
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

}
