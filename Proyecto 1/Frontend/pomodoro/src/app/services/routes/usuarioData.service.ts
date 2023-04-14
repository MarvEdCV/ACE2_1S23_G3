import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UsuarioData{
                                  
    private usuarioURL: string = "http://35.172.236.7:4010/api/usuarios";

    constructor(private httpClient:HttpClient){ }

    getAllUsuarios(){
        let headers = new HttpHeaders();
        //headers.append('Content-Type', 'application/json');
        //headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');

        return this.httpClient.get<[]>(this.usuarioURL, {headers:headers});
    }

    crearNuevoUsuario(username:string){
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        })

        let body = {"nombre": username,"tiempo_pomodoro": 20, "tiempo_descanso":6};

        this.httpClient.post(this.usuarioURL, body, {
            headers: headers
        } ).subscribe(
            response=>{ console.log(response);}, error =>{console.log(error);}
        );
    }

    modificarTimerDelPomodoro(defaultTimePomodoro:number, defaultTimeDescanso:number){

        let newBody = {
            "tiempo_pomodoro": defaultTimePomodoro, 
            "tiempo_descanso": defaultTimeDescanso
        };

        
        return this.httpClient.put<{inmediato:false, mensaje:""}>(this.usuarioURL, newBody );
    }

    activarUsuario(idUsuario:number){
        
        let url = "http://35.172.236.7:4010/api/activar-usuario/"+idUsuario;
        return this.httpClient.post<{cambio_usuario_activo:false, mensaje:""}>(url, {});
    }
}