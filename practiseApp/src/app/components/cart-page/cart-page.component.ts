import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { cart } from '../../models/cart';
import { AccountService } from '../../services/account.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  public cartProd: cart[] = [];
  orderSuccess: boolean=false;
  prod: any
  prodArray = []
  constructor(
    private cartServ: CartService,
    public acc: AccountService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if (this.acc.loggedin()) {
      this.getCartProducts();
    } else {
      this.getCartFromLocal()
    }
  }


  getCartProducts() {
    const addedBooks: any[] = JSON.parse(localStorage.getItem('addedBooks') || '[]');
    this.cartServ.getcart().subscribe({
      next: res => {
        this.cartProd = res.data;
        if (addedBooks.length > 0) {
          this.cartProd = Array.isArray(res.data) ? res.data : [];
          const dbId = new Set(this.cartProd.map((b: any) => b.id));
          const IdtoAdd = addedBooks.filter((book: any) => !dbId.has(book.id));
          if (IdtoAdd.length > 0) {
            Promise.all(IdtoAdd.map(book => {
              return firstValueFrom(this.cartServ.addToCart(book));
            }))
              .then(() => {
                
                this.getCartProducts();
                localStorage.removeItem('addedBooks');
              }).catch(err => {
                console.error('Error adding books:', err);
              });
          } else {
            localStorage.removeItem('addedBooks');
          }
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

  decrease(item: cart) {
    if (Number(item.quantity) > 1) {
      item.quantity = Number(item.quantity) - 1;
    }
    const newItem = {
      _id: item._id,
      quantity: item.quantity,
    }
    this.cartServ.updateCart(newItem).subscribe({
      next: res => {
        
      },
      error: err => {
        console.log(err)
      }
    })
  }

  Increase(item: cart) {
    if (Number(item.quantity) > 0) {
      item.quantity = Number(item.quantity) + 1;
      
    }
    const newItem = {
      _id: item._id,
      quantity: item.quantity,

    }
    this.cartServ.updateCart(newItem).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err)
      }
    })
  }
  get totalPrice(): number {
  return this.cartProd.reduce((sum, prod) => sum + (+prod.price * +prod.quantity), 0);
}
  getCartFromLocal() {
    this.prod = localStorage.getItem('addedBooks')
    this.cartProd = JSON.parse(localStorage.getItem('addedBooks') || '[]');
  }
  deleteBook(bookId:any){
    if (this.acc.loggedin()){
      this.cartServ.deleteCart(bookId).subscribe({
        next:res=>{
           this.cartProd = this.cartProd.filter(prod => (this.acc.loggedin() ? prod._id : prod.id) !== bookId);
          this.getCartProducts();
        },error:err=>{
          console.log("error",err)
        }
      })
    }
    else{
      let addedBooks = JSON.parse(localStorage.getItem('addedBooks') || '[]');
      addedBooks = addedBooks.filter((book: any) => book.id !== bookId);
      localStorage.setItem('addedBooks', JSON.stringify(addedBooks));
      this.getCartFromLocal();
    }
  }
  goHome(){
    this.router.navigate(['/'])
    this.cartProd=[]

    if (!this.acc.loggedin()) {
    localStorage.removeItem('addedBooks');
  }else{
    this.cartServ.clearCart().subscribe()
  }
  }
  placeOrder(){
    this.orderSuccess=true;
   
  }
}
