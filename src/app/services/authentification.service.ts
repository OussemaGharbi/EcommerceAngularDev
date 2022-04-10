import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  url = `${environment.apiUrl}/api/auth`
  public token
  isAuthentificated:boolean=false
  public user
  
  constructor(private http: HttpClient, private router: Router) {
  }
  register(user) {
    return this.http.post(this.url + '/register', user).subscribe((result) => {
      if (result['token']) {
        this.token = result['token']
        this.user= jwt_decode(this.token)

        this.tokenToLocalStorage(this.token)
        this.isAuthentificated=true
        this.router.navigate([''])
      }
    });
  }
  //pour enregistrer le token dans le localstorage
  tokenToLocalStorage(token) {
    localStorage.setItem('token', token);
  }

  login(user){
    console.log(user);
    
    return this.http.post(this.url + '/login', user).subscribe((result) => {
      console.log(result)

      if (result['token']) {
        this.token = result['token']
        this.tokenToLocalStorage(this.token)
        this.isAuthentificated=true
        this.user= jwt_decode(this.token)
        console.log(this.user);
        
        this.router.navigate([''])
      }
    });
    
  }

  logout() {
    localStorage.removeItem('token');
    this.token =''
    this.isAuthentificated=false
    this.router.navigate(['/auth/login'])
  }
  //quand le token expires
  expires(){
    setTimeout(() =>{
      this.logout()
    }, 72000)
  }
  //to get token from localStorage
  getAuthData(){
    const token = localStorage.getItem('token')
    if(token){
      return token
    }
  }
  autoLogin(){
    let  token = this.getAuthData()
    if (!token){
      return;
    }
    this.token= token
    this.user= jwt_decode(this.token)

    this.isAuthentificated=true
  }
  

}
