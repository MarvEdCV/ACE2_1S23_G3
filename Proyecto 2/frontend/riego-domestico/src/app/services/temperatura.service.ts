import { Injectable } from "@angular/core";
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable } from "rxjs";

export interface ITopicSensors {
    device:string;
    name: string; 
    TEmp_interior:number;
    Temp_exterior:number;
    Humedad:number;
    Tanque: number;
}

@Injectable({
    providedIn: 'root'
})
export class TemperaturaService{

    private tempContador = 2.4;
    //private subscription: Subscription;
    public message: string = "";

    constructor( private _mqttService:MqttService ){}

    
    public getTemperaturas(){

        this.tempContador = this.tempContador + 1;
        return { temperaturaExterna: 5 + this.tempContador, temperaturaInterna: 10 + this.tempContador};
    }

    public getAllSensoresTopic(): Observable<IMqttMessage>{
        return this._mqttService.observe('device/sensores/all');
    }
}