import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from 'src/data/usuario';
import { RegistrationService } from '../services/registrationService.service';
import { UsuarioData } from '../services/routes/usuarioData.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private router:Router, private registrationService:RegistrationService, private usuarioData:UsuarioData){

  }

  hideUsernameError:boolean = true;
  USERNAME:string = "";
 
  ingresarUsuario():void {
    
    if(this.USERNAME.length === 0){ 
      this.hideUsernameError = false;
      return; 
    }
    
    this.usuarioData.getAllUsuarios().subscribe(
        (usuarios: usuario[])=>{ 
          console.log(usuarios.length);
          let existeUsuario = false;   
          for(let i =0 ; i < usuarios.length; i ++){
            if(usuarios[i].nombre == this.USERNAME){
              existeUsuario = true;
              break;
            }
          }
          
          if(!existeUsuario){ 
            //console.log("crear un nuevo usuario");
            this.usuarioData.crearNuevoUsuario(this.USERNAME);
          }
          
          this.registrationService.setUsername(this.USERNAME);
          this.router.navigate(["pomodoro-menu"]);
        },error =>{
            console.log(error)
        });
  } 

  typingUsername():void{
    this.hideUsernameError = true;
  }
}
