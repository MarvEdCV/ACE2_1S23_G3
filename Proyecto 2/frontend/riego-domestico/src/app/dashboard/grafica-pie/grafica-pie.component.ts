import { Component, Input, ViewChild, SimpleChanges} from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

export interface IDataset {
  data: any[], 
  backgroundColor: string[]
}

@Component({
  selector: 'app-grafica-pie',
  templateUrl: './grafica-pie.component.html',
  styleUrls: ['./grafica-pie.component.css']
})
export class GraficaPieComponent {

  @Input() nombreGrafica: string = "default";
  @Input() newDatasets: IDataset[] = [];
  @Input() newGraphPieLabels: string[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;  

  pieChartOptions: ChartOptions<'pie'> = {
    //events: [],
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend:{
        position:"top"
      },
      title: {
        display: true,
        position: 'bottom',
        text: this.nombreGrafica
      }
    }
  }


  public graphConfig = {
    data: {
      labels: ['humedad', 'hola'],
      datasets: [
        {
          data: [100,0], 
          backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(75, 80, 192, 0.8)']
        }
      ] 
    }
  };

  ngOnChanges(changes: SimpleChanges){ // cada vez que exista un cambio en las variables @Input()
    
    for ( const propertyName in changes ){
      
      switch(propertyName){

        case 'nombreGrafica':{
          
          if (this.pieChartOptions.plugins?.title != undefined){
          
            this.pieChartOptions.plugins.title.text = this.nombreGrafica;
            this.chart?.update("none");
          }
          break; 
        }
        case 'newDatasets':{

          this.graphConfig.data.datasets = this.newDatasets;
          this.chart?.update("none");

          break;
        }

        case 'newGraphPieLabels': {
          this.graphConfig.data.labels = this.newGraphPieLabels;
          this.chart?.update("none");
          break;
        }
      }
    }
  }
}
