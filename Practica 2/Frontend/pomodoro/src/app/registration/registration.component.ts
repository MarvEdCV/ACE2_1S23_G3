import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registrationService.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private router:Router, private registrationService:RegistrationService){

  }

  hideUsernameError:boolean = true;
  USERNAME:string = "";

  ingresarUsuario():void {
    
    if(this.USERNAME.length === 0){ 
      this.hideUsernameError = false;
      return; 
    }
    this.registrationService.setUsername(this.USERNAME);
    this.router.navigate(["pomodoro-menu"]);
    
  } 

  typingUsername():void{
    this.hideUsernameError = true;
  }
}
