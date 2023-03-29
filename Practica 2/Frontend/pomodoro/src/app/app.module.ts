import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
//componentes
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NavbarComponent } from './main-menu/navbar/navbar.component';
import { RootMenuComponent } from './root-menu/root-menu.component';
// servicios
import { RegistrationService } from './services/registrationService.service';
import { RegistrationGuard } from './services/registrationGuard.guard';
import { UsuarioData } from './services/routes/usuarioData.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainMenuComponent,
    NavbarComponent,
    RootMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FormsModule,
    HttpClientModule
  ],
  providers: [RegistrationService, RegistrationGuard, UsuarioData],
  bootstrap: [AppComponent]
})
export class AppModule { }
