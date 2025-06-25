import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  authToken:any;
  User:any;
  constructor(private http:HttpClient) { }

  helper = new JwtHelperService();
  
  RegisterUser(user:{name:String,email:String,password:String}){
    return this.http.post('http://localhost:3000/api/register',user)
  }

  LoginUser(user:{email:String,password:String}){
    return this.http.post('http://localhost:3000/api/login',user)
  }

   StoreData(token:any, user:any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user',JSON.stringify(user))
    this.authToken=token
    this.User=user
  }

  getProfile(){
    this.authToken=localStorage.getItem('id_token');
    const headers=new HttpHeaders({Authorization: this.authToken? this.authToken: ''});
    return this.http.get('http://localhost:3000/api/profile',{headers})
  }

  logout(){
    this.authToken=null
    this.User=null
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');

  }

 loggedin() {
  const token = localStorage.getItem('id_token');
  if (!token) return false;
  const jwt = token.split(' ').pop() ?? null;
  return !this.helper.isTokenExpired(jwt);
}
checkAdmin():boolean{
if (this.loggedin()){
  const user=JSON.parse(localStorage.getItem('user')|| '{}');
  return user.admin === true;
}
return false;
}
}
