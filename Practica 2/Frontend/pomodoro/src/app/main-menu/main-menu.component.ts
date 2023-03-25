import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../services/registrationService.service';
import { UsuarioData } from '../services/routes/usuarioData.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {

  minutos: string = "25";
  segundos: string = "00";
  descansoEnMinutos:string = "05";
  disableButton:boolean = false;

  // timer del pomodoro
  mensajeEstadoDelTimer:string = ""
  mostrarMensaje = false;

  constructor(private registrationService: RegistrationService, private usuarioData:UsuarioData) {
    //window.alert(registrationService.getUsername());

  }

  inputMinutos(minutosInput: HTMLInputElement): void {
    
    this.disableButton = false;
    
    if (minutosInput.name == "trabajo") {
      if (!(minutosInput.validity.valid)){
        this.disableButton = true;
        return;
      }
        
      if (minutosInput.value.length < 2)
        this.minutos = "0" + minutosInput.value;
      else
        this.minutos = minutosInput.value;
    }else {

      if (!(minutosInput.validity.valid)){
        this.disableButton = true;
        return;
      }
      if (minutosInput.value.length < 2)
        this.descansoEnMinutos = "0" + minutosInput.value;
      else
        this.descansoEnMinutos = minutosInput.value;

    }
  }

  establecerTimer():void{

    this.usuarioData.modificarTimerDelPomodoro(parseInt(this.minutos), parseInt(this.descansoEnMinutos))
    .subscribe(
      info => { 
        console.log(info.mensaje);
        this.mostrarMensaje = true;
        this.mensajeEstadoDelTimer = info.mensaje;
        this.quitarMensajeEmergente();
      }, 
      error =>{ console.log(error);}
    );
  }

  quitarMensajeEmergente():void{
    setTimeout( ()=>{
      this.mostrarMensaje = false;
    }, 5000);
    
  }
}
