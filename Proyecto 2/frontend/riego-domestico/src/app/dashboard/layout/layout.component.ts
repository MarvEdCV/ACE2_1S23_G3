import { Component } from '@angular/core';
import { TemperaturaService } from 'src/app/services/temperatura.service';

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

  constructor(private temperaturaService: TemperaturaService){
    
    setInterval( ()=>{
      let lecturaTemperaturas = this.temperaturaService.getTemperaturas();

      this.temperaturas.externa.data = lecturaTemperaturas.temperaturaExterna;
      this.temperaturas.interna.data = lecturaTemperaturas.temperaturaInterna;
    }, 1000);
  }
}
