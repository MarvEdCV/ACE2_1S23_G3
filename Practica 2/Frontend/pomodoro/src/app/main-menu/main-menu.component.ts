import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../services/registrationService.service';

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

  constructor(private registrationService: RegistrationService) {
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
      return;
    }

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
