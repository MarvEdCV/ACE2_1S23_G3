import { Component, OnInit } from '@angular/core';

declare function myFunction():void;

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit{

  constructor(){
    //setInterval( function x() {
    //  console.log("hola mundo");
    //}, 1000);
  }

  ngOnInit(): void {
    //myFunction();

    setInterval( myFunction, 1000);
  }
  
}
