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
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

  @Input() priceTime: PriceTime[];
  @Input() max: number;
  @Input() min: number;
  @Input() mean: number;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {

  }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const hours = this.priceTime.map(x => x.time);
    const values = this.priceTime.map(x => x.value);

    const date = new Date()
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const colores: string[] = this.getColor(values);

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
                from: this.min,
                to: this.mean - this.mean*0.1,
                color: "#2dd36f"
              },
              {
                from: this.mean - this.mean*0.1,
                to: this.mean + this.mean*0.1,
                color: "#ffc409"
              },
              {
                from: this.mean + this.mean*0.1,
                to: this.max,
                color: "#eb445a"
              }
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
          offsetY: -18
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
          show: true,
        }
      },
      title: {
        text: `Precio de la luz hoy, ${day}/${month}/${year}`,
        floating: false,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  getColor(values: number[]) {
    let colors: string[] = [];
    values.forEach(value => {
      if (value < this.mean - this.mean * 0.1) {
        colors.push("#33FF33"); // Verde
      } else if (value > this.mean + this.mean * 0.1) {
        colors.push("#EC1414"); // Rojo
      } else {
        colors.push("#FFF11B"); // Amarillo
      }
    });
    return colors;
  }
}

