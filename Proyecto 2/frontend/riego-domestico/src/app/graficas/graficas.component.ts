import {Component, OnInit} from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';
import { HttpClient } from '@angular/common/http';

interface ObjetoGraficas {
  timestamp: string;
  datos: number;
}

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})


export class GraficasComponent {

  constructor(private http: HttpClient) {
    Chart.register(Annotation)
  }

  //VARIABLES PARA LAS GRAFICAS
  public lineChartType: ChartType = 'line';
  public lineChartOptions1: ChartConfiguration['options'];
  public lineChartData1: ChartConfiguration['data'] = { labels: [], datasets: [] };

  public lineChartOptions2: ChartConfiguration['options'];
  public lineChartData2: ChartConfiguration['data'] = { labels: [], datasets: [] };

  public lineChartOptions3: ChartConfiguration['options'];
  public lineChartData3: ChartConfiguration['data'] = { labels: [], datasets: [] };

  public lineChartOptions4: ChartConfiguration['options'];
  public lineChartData4: ChartConfiguration['data'] = { labels: [], datasets: [] };

  public lineChartOptions5: ChartConfiguration['options'];
  public lineChartData5: ChartConfiguration['data'] = { labels: [], datasets: [] };

  startDate!: string;
  startDateTime!: string;
  startTime!: string;
  startTimeSeconds!: string;
  endDate!: string;
  endTime!: string;
  endTimeSeconds!: string;




  getData(){
    console.log(this.startTimeSeconds)
    console.log(this.startDate + 'T' + this.startTime + ':'+this.startTimeSeconds.toString()+'.000Z')
    console.log(this.startDate + 'T' + this.startTime + ':00.000Z')
    const body = {
      fechainicial: new Date(this.startDate + 'T' + this.startTime + ':00.000Z').toISOString(),
      fechafinal: new Date(this.endDate + 'T' + this.endTime + ':00.000Z').toISOString()
    };

    const url = 'http://54.183.38.85:3525/api/v1'

    //GRAFICA TEMPERATURA EXTERNA
    this.http.post(`${url}/datatemp1`, body)
      .subscribe((response: any) => {
        const objeto: ObjetoGraficas[] = [];
        response.forEach((element:any) => {
          const nuevoObjeto: ObjetoGraficas = {
            timestamp: element.created,
            datos: parseFloat(element.data)
          };
          objeto.push(nuevoObjeto);
        });
        this.lineChartData1 = this.generarData(objeto,"Temperatura Externa",'red','pink');
        this.lineChartOptions1 = this.generarOptions("Fecha y hora","Temperatura °C")
      });

    // GRAFICA TEMPERATURA INTERNA
    this.http.post(`${url}/datatemp2`, body)
      .subscribe((response: any) => {
        const objeto: ObjetoGraficas[] = [];
        response.forEach((element:any) => {
          const nuevoObjeto: ObjetoGraficas = {
            timestamp: element.created,
            datos: parseFloat(element.data)
          };
          objeto.push(nuevoObjeto);
        });
      this.lineChartData2 = this.generarData(objeto,"Temperatura Interna",'green','#a7f38d');
      this.lineChartOptions2 = this.generarOptions("Fecha y hora","Temperatura °C")
      });

    //GRAFICA DE HUMEDAD DEL LA TIERRA
    this.http.post(`${url}/datahum1`, body)
      .subscribe((response: any) => {
        const objeto: ObjetoGraficas[] = [];
        response.forEach((element:any) => {
          const nuevoObjeto: ObjetoGraficas = {
            timestamp: element.created,
            datos: parseFloat(element.data)
          };
          objeto.push(nuevoObjeto);
        });
        this.lineChartData3 =  this.generarData(objeto,"Humedad de la tierra",'brown','#da9180');
        this.lineChartOptions3 = this.generarOptions("Fecha y hora","Humedad de la tierra")
      });

    //PORCENTAJE DE AGUA
    this.http.post(`${url}/datadist1`, body)
      .subscribe((response: any) => {
        const objeto: ObjetoGraficas[] = [];
        response.forEach((element:any) => {
          const nuevoObjeto: ObjetoGraficas = {
            timestamp: element.created,
            datos: parseFloat(element.data)
          };
          objeto.push(nuevoObjeto);
        });
        this.lineChartData4 =  this.generarData(objeto,"Porcentaje de Agua",'blue','#87CEFA');
        this.lineChartOptions4 = this.generarOptions("Fecha y hora","Porcentaje de agua %")
      });

    //ACTIVACION DE BOMBA

    this.http.post(`http://54.183.38.85:3525/api/v1/databomba1`, body)
      .subscribe((response: any) => {
        const objeto: ObjetoGraficas[] = [];
        response.forEach((element:any) => {
          const nuevoObjeto: ObjetoGraficas = {
            timestamp: element.created,
            datos: parseFloat(element.data)
          };
          objeto.push(nuevoObjeto);
        });
        console.log(objeto);

        this.lineChartData5 =  {
          labels: objeto.map((item) => item.timestamp),
          datasets: [{
            label: 'Activación de la bomba de agua',
            data: objeto.map((item) => item.datos),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: '#b8f1a5',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin',
            tension: 0.6
          }]}

        this.lineChartOptions5 = {
          scales:{
            x:{
              title:{
                display:true,
                text: "Fecha y Hora"
              }
            },
            y:{
              title:{
                display: true,
                text: "Activada/Desactivada"
              },
              ticks:{
                stepSize:1
              }
            }
          }
        }
      });
  }

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
