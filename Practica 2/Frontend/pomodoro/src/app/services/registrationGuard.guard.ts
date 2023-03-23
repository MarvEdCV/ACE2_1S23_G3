import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { RegistrationService } from "./registrationService.service";

@Injectable()
export class RegistrationGuard implements CanActivate{

    constructor(private registrationService:RegistrationService, private router:Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        if(this.registrationService.getUsername() == ""){
            this.router.navigate(['registration']);
            return false;
        }

        return true;
    }

}