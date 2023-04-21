import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(){ }


  options = {
    scales:{
      x:{

        grid: {
          display: false
        },
        //border: {
        //  display: false
        //},
        //ticks: {
        //  display: false
        //}
      },
      y:{
        suggestedMin: 0, 
        suggestedMax: 200,
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    }
  }


  public externalTemperatureGraph = {
    //type: "line",
    data: {
      labels: ['Temperatura externa'],
      datasets: [
        {
          label: 'Temperatura externa jiji',
          data: [100], 
          borderRadius: 5, 
          barPercentage: 0.15, 
          backgroundColor: ['rgba(75, 192, 192, 0.8)']
        }
      ], 
    },
    options: this.options
  };

  

  public changeData():void{

    console.log(this.chart);
    let contador = 100;
    let c = 1;
    setInterval( ()=>{
      console.log(c);
      c = c + 1;
      this.externalTemperatureGraph.data.labels[0] = `Temperatura Externa (${c} ${String.fromCharCode(186)}C)`;
      this.externalTemperatureGraph.data.datasets[0].data = [ contador];
      contador = contador - 2.5;

      this.chart?.update();
    }, 200);

  }
  

}
