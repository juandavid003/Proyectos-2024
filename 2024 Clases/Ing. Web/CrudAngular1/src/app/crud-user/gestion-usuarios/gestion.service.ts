import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ModuleModule } from '../../module/module.module';

@Injectable({
  providedIn: 'root'
})
export class GestionService {


  constructor(private http: HttpClient, private module: ModuleModule) { }

  


  

 
  CreatUser(updatedUser: any) {
    const url = `${this.module.getLoginUrl()}login`;
    return this.http.post(`${url}`, updatedUser);
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

