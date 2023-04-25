import { Component, ViewChild, Input, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { TemperaturaService } from 'src/app/services/temperatura.service';


@Component({
  selector: 'app-temp-externa',
  templateUrl: './temp-externa.component.html',
  styleUrls: ['./temp-externa.component.css']
})
export class TempExternaComponent {

  randomData: number[] = [40,24.8, 15, 17, 44.3, 24.8, 15,16,2,-10, -11,7, -20,6];
  private ceroAbsolutoGrafica:number = 100;
  @Input() temperaturaActual:number = 0;
  @Input() nombreGrafica:string = 'Temperatura';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private temperaturaService: TemperaturaService){}

  ngOnChanges(changes: SimpleChanges){ // cada vez que exista un cambio en las variables @Input()
    
    for ( const propertyName in changes ){
      
      switch(propertyName){

        case 'nombreGrafica':{
          this.externalTemperatureGraph.data.labels[0] = this.nombreGrafica;
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

  private changeTemperatureData(temperatura:number){

    this.externalTemperatureGraph.data.labels[0] = `Temperatura Externa (${temperatura} ${String.fromCharCode(186)}C)`;
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
