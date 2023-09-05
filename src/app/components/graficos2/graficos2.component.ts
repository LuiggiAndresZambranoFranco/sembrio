import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexFill, ApexTooltip, ApexDataLabels, ApexGrid, ApexLegend, ApexMarkers, ApexStroke } from 'ng-apexcharts';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AppSettings } from 'appsettings-json-reader';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-graficos2',
  templateUrl: './graficos2.component.html',
  styleUrls: ['./graficos2.component.css']
})
export class Graficos2Component implements OnInit {
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
        type: "bar"
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [], 
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + "%"; 
          }
        }
      },
      grid: {
        borderColor: "#f1f1f1"
      },
      title: {
        text: "sensores"
      },
      legend: {
        show: true
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

      this.db.object('ESP32_APP/HUMIDITY').valueChanges().subscribe((dato: any) => {

        this.humedad.push(dato);

        const maxHumedad = 100; 
        const maxTemperatura = 40; 

        this.chartOptions.series = [
          {
            name: 'humedad',
            data: this.humedad.map(valor => (valor / maxHumedad) * 100) 

          },
          {
            name: 'temperatura',
            data: this.temperatura.map(valor => (valor / maxTemperatura) * 100) 

          }
        ];
        
        this.chartOptions.xaxis = {
          categories: this.temperatura.map((_valor, index) => now.getMinutes() + index * 60000), 
        };

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