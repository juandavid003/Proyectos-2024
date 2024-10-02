import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  private url = 'https://localhost:44372/api/login/'
  constructor(private http: HttpClient) { }

  
 



  CreatUser(updatedUser: any) {
    return this.http.post(`${this.url}`, updatedUser);
  }
























  private getHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(${operation} failed: ${error.message});

      // Let the app keep running by returning an empty result.

      return error; // of(result as T);
    };
  }

  
}

