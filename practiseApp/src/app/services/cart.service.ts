import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from '../../enviornments/enviornment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http:HttpClient) { }

  addToCart(product:{id:Number,name:String,cover:String,price:Number,quantity:Number}):Observable<any>{
    return this.http.post(`${environment.apiBaseUrl}/addCart`, product)
  }

  getcart():Observable<any>{
    return this.http.get(`${environment.apiBaseUrl}/cart`);
  }

  updateCart(product1:{_id:String,quantity:Number}):Observable<any>{
    return this.http.put(`${environment.apiBaseUrl}/cartUpdate`,product1);
  }
  deleteCart(id:string): Observable<any>{
    return this.http.delete(`${environment.apiBaseUrl}/removeCart`,{body:{_id:id}})
  }
  clearCart(){
    return this.http.delete(`${environment.apiBaseUrl}/clearCart`);
  }
}
