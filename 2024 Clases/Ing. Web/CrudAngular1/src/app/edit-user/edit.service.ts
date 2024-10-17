import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  // private url = 'https://localhost:44372/api/login/'

  
  private url = 'http://ec2-3-131-162-56.us-east-2.compute.amazonaws.com/api/api/login'
  constructor(private http: HttpClient) { }

  getById(Id: number) {
    return this.http.get(`${this.url}/${Id}`);
  }



  editId(Id: number, updatedUser: any) {
    return this.http.put(`${this.url}/${Id}`, updatedUser);
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

