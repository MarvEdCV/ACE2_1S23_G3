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

  myType = {
    device: ""
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
      
      this.temperaturas.externa.data = item.Temp_exterior;
      this.temperaturas.interna.data = item.TEmp_interior;
    });
  }
}
