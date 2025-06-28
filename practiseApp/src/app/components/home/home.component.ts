import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { CartService } from '../../services/cart.service';
import { FetchBookService } from '../../services/fetch-book.service';
import { books } from '../../models/book';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public data: books[] = [];
  constructor(private book: FetchBookService,
      private cart: CartService,
      public acc: AccountService,
      private router:Router){}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.book.getBooks().subscribe({
      next: (res) => {
        console.log(res);
        this.data = res.data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  goLibrary(){
    this.router.navigate(['/lib']);
  }
  getBookDetails(id:number){
    this.router.navigate(['/bookDetail',id]);
  }
}
