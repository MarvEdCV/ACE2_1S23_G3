import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationGuard } from './services/registrationGuard.guard';

const routes: Routes = [
  {path:"", component: RegistrationComponent},
  {path:"registration", component: RegistrationComponent}, 
  {path:"pomodoro-menu", canActivate:[RegistrationGuard], component: MainMenuComponent}
  //{path:"pomodoro-menu", component: MainMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
