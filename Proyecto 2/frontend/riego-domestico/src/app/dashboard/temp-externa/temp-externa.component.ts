import { Component, ViewChild, Input, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-temp-externa',
  templateUrl: './temp-externa.component.html',
  styleUrls: ['./temp-externa.component.css']
})
export class TempExternaComponent {

  private ceroAbsolutoGrafica:number = 100;
  
  @Input() temperaturaActual:number = 0;
  @Input() nombreGrafica:string = 'Temperatura';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(){}

  options = {
    scales:{
      x:{
        grid: {
          display: false
        },
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
    },
    events: [],
    plugins: {
      legend:{
        display: false // hide data.datasets[].label
      }
    }
  }

  public externalTemperatureGraph = {
    //type: "line",
    data: {
      labels: [this.nombreGrafica],
      datasets: [
        {
          label: 'Temperatura (hide to user)',
          data: [100], 
          borderRadius: 5, 
          barPercentage: 0.15, 
          backgroundColor: ['rgba(75, 192, 192, 0.8)']
        }
      ], 
    },
    options: this.options
  };

  ngOnChanges(changes: SimpleChanges){ // cada vez que exista un cambio en las variables @Input()
    
    for ( const propertyName in changes ){
      
      switch(propertyName){

        case 'nombreGrafica':{
          
          this.externalTemperatureGraph.data.labels[0] = this.nombreGrafica;
          this.chart?.update();
          break; 
        }
        case 'temperaturaActual':{
          const temperaturaObject = changes['temperaturaActual'];
          this.changeTemperatureData(temperaturaObject.currentValue);
          break;
        }
      }
    }
  }

  private changeTemperatureData(temperatura:number){

    this.externalTemperatureGraph.data.labels[0] = `${this.nombreGrafica} (${temperatura} ${String.fromCharCode(186)}C)`;
    this.externalTemperatureGraph.data.datasets[0].backgroundColor = [this.getColorBasedOnTemperature(temperatura)]
    this.externalTemperatureGraph.data.datasets[0].data = [ this.ceroAbsolutoGrafica + (temperatura *2.5)];

    this.chart?.update();
  }


  private getColorBasedOnTemperature(temperatura:number): string{

    if(temperatura > 15 && temperatura <= 23)
      return 'rgb(255, 125, 70, 0.8)';
    else if(temperatura > 24 && temperatura <= 50)
      return 'rgb(255, 57, 0)';
    else if (temperatura <= 15 && temperatura >= -50)
      return 'rgba(75, 192, 192, 1)';
    return 'rgb(255, 57, 0)';
  }

}
