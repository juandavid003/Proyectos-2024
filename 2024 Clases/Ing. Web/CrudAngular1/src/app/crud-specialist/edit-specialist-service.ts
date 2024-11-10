import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ModuleModule } from '../module/module.module';


@Injectable({
  providedIn: 'root'
})
export class EditSpecialistService {


  constructor(private http: HttpClient, private module: ModuleModule) { }

  getById(Id: number) {
    const url = `${this.module.getLoginUrl()}specialist`;
    return this.http.get(`${url}/${Id}`);
  }



  
  editId(Id: number, updatedUser: any) {
    const url = `${this.module.getLoginUrl()}specialist`;
    return this.http.put(`${url}/${Id}`, updatedUser);
  }


  createSpecialist(updatedUser: any) {
    const url = `${this.module.getLoginUrl()}specialist`;
    return this.http.post(`${url}`, updatedUser);
  }

  getAllEspecialities() {
    const url = `${this.module.getLoginUrl()}especiality`;
    return this.http.get(`${url}`);
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

