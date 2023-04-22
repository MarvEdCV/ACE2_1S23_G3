import { Component } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})

export class GraficasComponent {

  dataTemperatura = [
    { timestamp: '2023-04-20T00:00:00.000Z', datos: 20 },
    { timestamp: '2023-04-20T01:00:00.000Z', datos: 18 },
    { timestamp: '2023-04-20T02:00:00.000Z', datos: 16 },
    { timestamp: '2023-04-20T03:00:00.000Z', datos: 14 },
    { timestamp: '2023-04-20T04:00:00.000Z', datos: 15 },
    { timestamp: '2023-04-20T05:00:00.000Z', datos: 17 },
    { timestamp: '2023-04-20T06:00:00.000Z', datos: 19 },
    { timestamp: '2023-04-20T07:00:00.000Z', datos: 21 },
    { timestamp: '2023-04-20T08:00:00.000Z', datos: 23 },
    { timestamp: '2023-04-20T09:00:00.000Z', datos: 25 },
    { timestamp: '2023-04-20T10:00:00.000Z', datos: 26 },
    { timestamp: '2023-04-20T11:00:00.000Z', datos: 27 },
    { timestamp: '2023-04-20T12:00:00.000Z', datos: 28 },
    { timestamp: '2023-04-20T13:00:00.000Z', datos: 29 },
    { timestamp: '2023-04-20T14:00:00.000Z', datos: 28 },
    { timestamp: '2023-04-20T15:00:00.000Z', datos: 27 },
    { timestamp: '2023-04-20T16:00:00.000Z', datos: 26 },
    { timestamp: '2023-04-20T17:00:00.000Z', datos: 25 },
    { timestamp: '2023-04-20T18:00:00.000Z', datos: 24 },
    { timestamp: '2023-04-20T19:00:00.000Z', datos: 23 },
    { timestamp: '2023-04-20T20:00:00.000Z', datos: 22 },
    { timestamp: '2023-04-20T21:00:00.000Z', datos: 21 },
    { timestamp: '2023-04-20T22:00:00.000Z', datos: 20 },
    { timestamp: '2023-04-20T23:00:00.000Z', datos: 19 }
  ];
  private newLabel? = 'New label';
  startDate!: string;
  startTime!: string;
  endDate!: string;
  endTime!: string;

  constructor() {
    Chart.register(Annotation)
  }

  //GRAFICA TEMPERATURA EXTERNA
  public lineChartData1: ChartConfiguration['data'] = this.generarData(this.dataTemperatura,"Temperatura Externa",'red','pink');
  public lineChartOptions1: ChartConfiguration['options'] = this.generarOptions("Fecha y hora","Temperatura °C")
  public lineChartType: ChartType = 'line';

  //GRAFICA TEMPERATURA INTERNA

  public lineChartData2: ChartConfiguration['data'] = this.generarData(this.dataTemperatura,"Temperatura Interna",'green','#a7f38d');
  public lineChartOptions2: ChartConfiguration['options'] = this.generarOptions("Fecha y hora","Temperatura °C")

  //GRAFICA DE HUMEDAD DEL LA TIERRA
  public lineChartData3: ChartConfiguration['data'] = this.generarData(this.dataTemperatura,"Humedad de la tierra",'brown','#da9180');
  public lineChartOptions3: ChartConfiguration['options'] = this.generarOptions("Fecha y hora","Humedad de la tierra")

  //PORCENTAJE DE AGUA
  public lineChartData4: ChartConfiguration['data'] = this.generarData(this.dataTemperatura,"Porcentaje de Agua",'blue','#87CEFA');
  public lineChartOptions4: ChartConfiguration['options'] = this.generarOptions("Fecha y hora","Porcentaje de agua %")


  public lineChartData5: ChartConfiguration['data'] ={
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  datasets: [{
    label: 'Activación de la bomba de agua',
    data: [0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]}

  /*
  public lineChartOptions5: ChartConfiguration['options'] ={
      scales: {
        y: {
          ticks: {
            suggestedMin: true
          }
        }
      }
  }*/


  private generarData(data:{timestamp: string; datos: number}[],tituloY: string,borderColor:string,backgrounColor:string):ChartConfiguration['data']{
    return {
      datasets: [
        {
          data: data.map((item) => item.datos),
          label: tituloY,
          backgroundColor: backgrounColor,
          borderColor: borderColor,
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        }],
      labels: data.map((item) => item.timestamp)
    }
  }

  private generarOptions(tituloX: string,tituloY: string):ChartConfiguration['options']{
    return {
      elements: {
        line: {
          tension: 0
        }
      },
      scales:{
        x:{
          title:{
            display:true,
            text: tituloX
          }
        },
        y:{
          title:{
            display: true,
            text: tituloY
          }
        }
      }
    }
  }
}
