import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthentificationService } from "./services/authentification.service";
//pour ajouter au header le token 
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService: AuthentificationService){}
    intercept(req:HttpRequest<any>, next:HttpHandler){
        const authToken = this.authService.token;
        const authRequest = req.clone({
            headers : req.headers.set("Authorization","Bearer "+authToken)
        })
        return next.handle(authRequest);
    }

}