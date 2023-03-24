import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UsuarioData{

    private usuarioURL: string = "http://localhost:4010/api";

    constructor(private httpClient:HttpClient){ }

    getAllUsuarios(){
        return this.httpClient.get<[]>( (this.usuarioURL + "/usuarios"));
    }

    crearNuevoUsuario(username:string){
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        })

        let body = {"nombre": username,"tiempo_pomodoro": 20, "tiempo_descanso":6};

        this.httpClient.post( (this.usuarioURL + "/usuarios"), body, {
            headers: headers
        } ).subscribe(
            response=>{ console.log(response);}, error =>{console.log(error);}
        );
    }
}