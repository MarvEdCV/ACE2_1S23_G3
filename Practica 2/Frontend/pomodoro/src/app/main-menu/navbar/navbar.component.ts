import { Component } from '@angular/core';
import { RegistrationService } from 'src/app/services/registrationService.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(private registrationService:RegistrationService){}
  
  username:string = this.registrationService.getUsername();

  logout():void{
    localStorage.removeItem(this.registrationService.LOCALSTORAGE_KEY_FOR_USERNAME);
  }
}
