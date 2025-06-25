import { Component } from '@angular/core';
import { FetchBookService } from '../../services/fetch-book.service';
import { ActivatedRoute } from '@angular/router';
import { books } from '../../models/book';
import { AccountService } from '../../services/account.service';
import { CartService } from '../../services/cart.service';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent {
  public data:any
  public addedIDs = new Set<Number>();
  editMode=false;
  editData:any={};
  isAdded = false;
  showModal=false;

  constructor( 
    private route:ActivatedRoute,
    private fetch:FetchBookService,
    public acc:AccountService,
    private cart: CartService
    ){}

  ngOnInit(){
    const id=this.route.snapshot.paramMap.get('id');
    this.getDetails(id);
    if (this.acc.loggedin()) {
    this.cart.getcart().subscribe({
      next: (res: any) => {
        this.isAdded = (res.data || []).some((b: any) => b.id == id);
      },
      error: (err) => {
        console.log(err);
        this.isAdded = false;
      }
    });
  } else {
    const addedBooks = JSON.parse(localStorage.getItem('addedBooks') || '[]');
    this.isAdded = addedBooks.some((b: any) => b.id == id);
  }
  }

  getDetails(id: any) {
    this.fetch.getBookDetails(id).subscribe({
      next: (res: any) => {
        
        this.data = res.book;
        console.log(this.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  addToCart(data: books) {
    const addedBook = {
      id: data.id,
      name: data.title,
      cover: data.image,
      price: data.price,
      quantity: 1
    }
    if (this.acc.loggedin()) {
      this.cart.addToCart(addedBook).subscribe({
        next: (res) => {
          this.isAdded=true;
          this.addedIDs.add(data.id);
          sessionStorage.setItem('addedIDs', JSON.stringify(Array.from(this.addedIDs)));
          console.log("added to cart", res)
        },
        error: (err) => {
          console.log("not added", err)
        }
      })
    } else {
      this.isAdded=true;
      this.addedIDs.add(data.id);
      const books = JSON.parse(localStorage.getItem('addedBooks') || '[]');
      books.push(addedBook);
      localStorage.setItem('addedBooks', JSON.stringify(books));
    }

  }
  editBook(){
    this.editMode=true;
    this.editData={_id:this.data._id}
    console.log(...this.data)
  }

  saveEdit(){
    const updateData= {...this.editData, _id:this.data._id}
    this.fetch.updatebook(updateData).subscribe({
      next:res=>{
        this.editMode=false
      },
      error:err=>{
        console.log("update failed",err)
      }
    })
  }
  cancelEdit(){
    this.editMode=false
    this.editData={_id:this.data._id}
  }

  confirmSave(){
    this.showModal=false;
    this.saveEdit();
     window.location.reload();
  }
}
