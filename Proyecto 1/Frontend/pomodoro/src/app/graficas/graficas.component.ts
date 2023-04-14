import { Component, OnInit } from '@angular/core';

declare function myFunction():void;

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit{

  ngOnInit(): void {
    //myFunction();

    setInterval( myFunction, 1000);
  }
  
}
