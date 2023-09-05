import { Component, OnInit } from '@angular/core';
import { ApexNonAxisChartSeries, ApexPlotOptions, ApexChart } from 'ng-apexcharts';
import { AngularFireDatabase } from '@angular/fire/compat/database';

export type ChartOptions = {
  humedadChart: ApexNonAxisChartSeries;
  temperaturaChart: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: any; 
  stroke: any; 
};

@Component({
  selector: 'app-graficos3',
  templateUrl: './graficos3.component.html',
  styleUrls: ['./graficos3.component.css']
})
export class Graficos3Component implements OnInit {
  
  chartOptionsHumedad!: ChartOptions;
  chartOptionsTemperatura!: ChartOptions;

  humedad!: number;
  temperatura!: number; 

  constructor(private db: AngularFireDatabase) {
    this.humedad = 0; 
    this.temperatura = 0; 

    this.chartOptionsHumedad = {
      humedadChart: [this.humedad], 
      temperaturaChart: [],
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

    this.chartOptionsTemperatura = {
      humedadChart: [], 
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
    this.db.object('ESP32_APP/HUMIDITY').valueChanges().subscribe((dato: any) => {
      this.humedad = dato;
      this.actualizarGrafico1();
    });

    this.db.object('ESP32_APP/TEMPERATURE').valueChanges().subscribe((dato: any) => {
      this.temperatura = dato;
      this.actualizarGrafico2();
    });
  }

  actualizarGrafico1() {
    this.chartOptionsHumedad.humedadChart = [this.humedad];
  }
  
  actualizarGrafico2() {
    this.chartOptionsTemperatura.temperaturaChart = [this.temperatura];
  }

  updateValue(newValue: boolean) {
    // Cambiar el valor en Firebase
    this.db.object('ESP32_APP1/RELAY').set(newValue)
    .then(() => {
      if (newValue) {
        window.alert('El riego está encendido');
      } else {
        window.alert('El riego está apagado');
      }
    })
      .catch(error => {
        console.error('Error al cambiar el valor:', error);
      });
  }
}
