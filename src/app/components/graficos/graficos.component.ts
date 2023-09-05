import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexFill, ApexTooltip, ApexDataLabels, ApexGrid, ApexLegend, ApexMarkers, ApexStroke } from 'ng-apexcharts';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AppSettings } from 'appsettings-json-reader';



export type ChartOptions = {
  
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  // yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {
  isReguioEncendido: boolean = false; // Inicialmente apagado
  chartOptions!: ChartOptions;
  appSettings = AppSettings.readAppSettings();
  data!: any[];
  humedad!: any[]
  relay!: any[]
  temperatura!: any[]
  constructor(
    private db: AngularFireDatabase) {
    this.temperatura = []
    this.humedad = []
    this.relay = []
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      xaxis: {
        type: "datetime",

      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val: string) {
                return val + " (mins)";
              }
            }
          },
          {
            title: {
              formatter: function (val: string) {
                return val + " per session";
              }
            }
          },
          {
            title: {
              formatter: function (val: any) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      },
      title: {
        text: "sensores"
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
    };
    
    const now = new Date();

    const currentMinute = now.getMinutes()
    this.db.object('ESP32_APP/TEMPERATURE').valueChanges().subscribe((dato: any) => {

      this.temperatura.push(dato)
      console.log('Temperatura:', this.temperatura);

      this.db.object('ESP32_APP/HUMIDITY').valueChanges().subscribe((dato: any) => {

        this.humedad.push(dato)
        console.log('humedad:', this.humedad);

        const startDate = new Date(now.getTime());
        const endDate = new Date(startDate.getTime() + 15 * 600000);
        console.log('endate:', now);
        
        this.chartOptions.series = [
          {
            name: 'humedad',
            data: this.humedad.map((valor, index) => ({
              x: new Date(now.getMinutes() + index * 600000),
              y: valor
            }))

          },
          {
            name: 'temperatura',
            data: this.temperatura.map((valor, index) => ({
              x: new Date(now.getMinutes() + index * 600000), // Asegúrate de ajustar el intervalo de tiempo adecuadamente
              y: valor
            }))

          }
        ],
          this.chartOptions.xaxis = {

            type: "datetime",
            min:startDate.getTime(),
            max:endDate.getTime(),
            // range: now.getMinutes()*6000,
            labels: {
              datetimeFormatter: {
                hour: "HH:mm"
              }
            }
          }

      });


    });

  }
  ngOnInit(): void {

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
