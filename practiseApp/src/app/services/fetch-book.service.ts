import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { books } from '../models/book';
import { Observable } from 'rxjs';
import { environment } from '../../enviornments/enviornment';

@Injectable({
  providedIn: 'root'
})
export class FetchBookService {
  private api=`${environment.apiBaseUrl}/books`;

  constructor(private httpclent:HttpClient) { }

  getBooks():Observable<any>{
    return this.httpclent.get(this.api);
  }

  getBookDetails(bookID:number){
    return this.httpclent.get(`${environment.apiBaseUrl}/bookDetail`,{params:{id:bookID}});
  }
  
  updatebook(bookdata:any){
    return this.httpclent.put(`${environment.apiBaseUrl}/updateBook`,bookdata);
  }
}
