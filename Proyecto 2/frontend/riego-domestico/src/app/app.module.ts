import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { NgChartsModule } from 'ng2-charts';
import { TempExternaComponent } from './dashboard/temp-externa/temp-externa.component';
import { HttpClientModule } from '@angular/common/http';
import { GraficaPieComponent } from './dashboard/grafica-pie/grafica-pie.component';
import { GraficasComponent } from './graficas/graficas.component';
import { NavbarComponent } from './navbar/navbar.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TempExternaComponent,
    GraficaPieComponent,
    GraficasComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, 
    NgChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
