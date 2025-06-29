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
        this.data = res.data;
        setTimeout(()=>{
          const scroll=localStorage.getItem('libraryScroll');
          if(scroll){
            window.scrollTo({top:+scroll,left: 0, behavior:'auto'});
            localStorage.removeItem('libraryScroll');
          }
        },100);
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
    localStorage.setItem('libraryScroll',window.scrollY.toString());
    this.router.navigate(['/bookDetail',id]);
  }
}
