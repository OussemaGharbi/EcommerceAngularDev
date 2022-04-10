import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthentificationService } from "./services/authentification.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthentificationService,private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuth = this.authService.isAuthentificated;
        if(isAuth==false){
            this.router.navigate(["/login"])
        }
       return isAuth || false; 
    }

}