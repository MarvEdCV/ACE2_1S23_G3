import { Component } from '@angular/core';
import { TemperaturaService, ITopicSensors } from 'src/app/services/temperatura.service';
import { IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  
  public temperaturas = {
    externa: {
      nombre: 'Temperatura externa',
      data: 0
    }, 
    interna:{
      nombre: 'Temperatura interna',
      data: 0
    }
  }

  public humedad = {
    nombre: "Humedad",
    labels: ['Vapor de Agua', 'Aire'],
    datasets: [
      {
        data: [100, 0],
        backgroundColor: ['rgb(177, 222, 255, 0.8)', 'rgb(222, 224, 203, 0.8)']
      }
    ]
  }

  public porcentajeDeAgua = {
    nombre: 'Porcentaje de agua', 
    labels: ['% de Agua', '% de Tanque vacio'],
    datasets: [
      {
        data: [40, 60], 
        backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgb(177, 222, 255, 0.8)']
      }
    ] 
  }

  private subscription: Subscription = new Subscription();

  constructor(private temperaturaService: TemperaturaService){}

  ngOnInit(): void {
    this.getSensorsData();
  }


  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
 

  public getSensorsData(){

    this.subscription = this.temperaturaService.getAllSensoresTopic().subscribe((message: IMqttMessage) => {
      
      //console.log(message.payload.toString());
      let item:ITopicSensors = JSON.parse( message.payload.toString() );
      //console.log(item.device, item.Temp_exterior, item.TEmp_interior, item.Humedad, item.Tanque);
      // Temperaturas
      this.temperaturas.externa.data = item.Temp_exterior;
      this.temperaturas.interna.data = item.TEmp_interior;
      // porcentaje de agua en el tanque
      this.porcentajeDeAgua.datasets = [
        {
          data: [item.Tanque, (100-item.Tanque)], 
          backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgb(184, 255, 174, 0.8)']
        }
      ];

      this.porcentajeDeAgua.labels[0] = `% de Agua (${item.Tanque} %)`;
      this.porcentajeDeAgua.labels[1] = `% de Tanque vacio (${100 -item.Tanque} %)`

      // humedad en el aire
      this.humedad.datasets =[
        {
          data: [item.Humedad, (100-item.Humedad)], 
          backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgb(177, 222, 255, 0.8)']
        }
      ];

      this.humedad.labels[0] = `Vapor de agua (${item.Humedad} %)`;
      this.humedad.labels[1] = `Aire (${100 -item.Humedad} %)`
      
    });
  }
}
