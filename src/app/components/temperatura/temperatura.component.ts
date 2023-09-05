import { Component, OnInit } from '@angular/core';
import { ApexNonAxisChartSeries, ApexPlotOptions, ApexChart } from 'ng-apexcharts';
import { AngularFireDatabase } from '@angular/fire/compat/database';

export type ChartOptions = {

  temperaturaChart: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: any; 
  stroke: any; 
};

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent implements OnInit {
  chartOptionsTemperatura!: ChartOptions;


  temperatura!: number; 

  constructor(private db: AngularFireDatabase) {

    this.temperatura = 0; 
    this.chartOptionsTemperatura = {
      temperaturaChart: [this.temperatura],
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0,
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function(val: { toString: () => string; }) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Percent"]
    };
  }

  ngOnInit(): void {
    
    this.db.object('ESP32_APP/TEMPERATURE').valueChanges().subscribe((dato: any) => {
      this.temperatura = dato;
      this.actualizarGrafico2();
    });
  }

  actualizarGrafico2() {
    this.chartOptionsTemperatura.temperaturaChart = [this.temperatura];
  }
}
