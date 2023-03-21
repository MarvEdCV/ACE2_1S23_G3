import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  missingUsername:boolean = true;
  USERNAME:string = "";

  ingresarUsuario():void {
    
    if(this.USERNAME.length === 0){ 
      this.missingUsername = !this.missingUsername;
      return; 
    }
    window.alert("tu nombre es:" + this.USERNAME);
  } 
}
