import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PriceTime } from 'src/app/models/price-time.model';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-bar-chart1',
  templateUrl: './bar-chart1.component.html',
  styleUrls: ['./bar-chart1.component.scss'],
})
export class BarChart1Component implements OnInit {

  @Input() priceTime: PriceTime[];
  @Input() text: String;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;;

  constructor(
  ) {  }

  ngOnInit() {
    this.createChart()
  }

  ngOnChanges(){
    this.createChart()
  }

  createChart() {
    const hours = this.priceTime.map(x => x.time);
    const values = this.priceTime.map(x => x.value);

    const max = Math.max(...values);
    const min = Math.min(...values);

    this.chartOptions = {
      series: [
        {
          name: "Precio",
          data: values
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false, // Establece show en false para ocultar el botón de descarga
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          colors:{
            ranges: [
              {
                from: min,
                to: max,
                color: "#7A9A80"
              },
            ]
          }
        }
      },
      dataLabels: {
        enabled: false,
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: hours,
        position: "top",
        labels: {
          offsetY: -18,
          style: {
            colors: "#7F7F7F"
          },
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false
        }
      },
      title: {
        text: `${this.text}`,
        floating: false,
        offsetY: 330,
        align: "center",
        style: {
          color: "#7F7F7F"
        }
      }
    };
  }
}

