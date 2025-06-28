import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http:HttpClient) { }

  addToCart(product:{id:Number,name:String,cover:String,price:Number,quantity:Number}):Observable<any>{
    return this.http.post('http://localhost:3000/api/addCart', product)
  }

  getcart():Observable<any>{
    return this.http.get('http://localhost:3000/api/cart');
  }

  updateCart(product1:{_id:String,quantity:Number}):Observable<any>{
    return this.http.put('http://localhost:3000/api/cartUpdate',product1);
  }
  deleteCart(id:string): Observable<any>{
    return this.http.delete('http://localhost:3000/api/removeCart',{body:{_id:id}})
  }
  clearCart(){
    return this.http.delete('http://localhost:3000/api/clearCart');
  }
}
