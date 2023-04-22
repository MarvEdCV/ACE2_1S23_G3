import {HttpClient} from "@angular/common/http"
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TemperaturaService{

    private tempContador = 2.4;

    constructor(private httpClient:HttpClient){}

    
    public getTemperaturas(){

        this.tempContador = this.tempContador + 1;
        return { temperaturaExterna: 5 + this.tempContador, temperaturaInterna: 10 + this.tempContador};
    }
}