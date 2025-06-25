import { Component, OnInit } from '@angular/core';
import { FetchBookService } from '../../services/fetch-book.service';
import { books } from '../../models/book';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-library',
  standalone: false,
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {
  public data: books[] = [];
  public addedIDs = new Set<Number>();
  constructor(
    private book: FetchBookService,
    private cart: CartService,
    public acc: AccountService,
    private router: Router) { }


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

  goToCart() {
    this.router.navigate(['/cart']);
  }

  getBookDetails(id:number){
    this.router.navigate(['/bookDetail',id]);
  }
}
