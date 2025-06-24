import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { books } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchBookService {
  private api='http://localhost:3000/api/books'

  constructor(private httpclent:HttpClient) { }

  getBooks():Observable<any>{
    return this.httpclent.get(this.api);
  }

  getBookDetails(bookID:number){
    return this.httpclent.get('http://localhost:3000/api/bookDetail',{params:{id:bookID}});
  }
}
