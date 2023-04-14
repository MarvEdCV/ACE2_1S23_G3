import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registrationService.service';
import { Router } from '@angular/router';
import { UsuarioData } from '../services/routes/usuarioData.service';
import { usuario } from 'src/data/usuario';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root-menu',
  templateUrl: './root-menu.component.html',
  styleUrls: ['./root-menu.component.css']
})

export class RootMenuComponent implements OnInit {

  usuarioSeleccionado:usuario = {usuario_id: -1, nombre: "", es_activo: 0, tiempo_pomodoro: 0, tiempo_descanso:  0};
  listaUsuarios:usuario[] = [];

  constructor(private registrationService:RegistrationService, private router:Router, private usuarioData:UsuarioData){
   
    this.usuarioData.getAllUsuarios().subscribe(
      (data:usuario[]) =>{this.listaUsuarios = data; console.log(this.listaUsuarios);}, 
      (error)=>{console.log(error);}      
    );
  }

  ngOnInit(){
    //window.alert("ejecuto el ngoninit"+ this.USERNAME );
  }

  login():void{
    
    if(this.usuarioSeleccionado.usuario_id === -1){
      window.alert("no ha seleccionando ningun usuario");
      return;
    }
    if(this.usuarioSeleccionado.es_activo != 1){ 
      // intentar activar el usuario
      this.usuarioData.activarUsuario(this.usuarioSeleccionado.usuario_id).subscribe( 
        (data)=>{ 
          this.allowLogin();
        },
        (error:HttpErrorResponse)=>{
          console.log(error);
          window.alert( (<{"cambio_usuario_activo":false, "mensaje":"" }>error.error).mensaje );
        }
      );
      
    }else{
      this.allowLogin();
    }
  }

  allowLogin():void{
    this.registrationService.setUsername(this.usuarioSeleccionado.nombre);
    this.router.navigate(["pomodoro-menu"]);
  }

  changeUsername(event:Event):void{
    let dropdownList = <HTMLSelectElement> event.target; 
    
    this.usuarioSeleccionado = this.listaUsuarios[parseInt(dropdownList.value)];
    //window.alert(this.usuarioSeleccionado.es_activo);
  }
}
