import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ModuleModule } from './module/module.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private url = 'https://localhost:44372/api/login/'
  // private taskUrl = 'https://localhost:44372/api/task/'
  // private specialistUrl = 'https://localhost:44372/api/specialist'

   //private url = 'http://ec2-3-131-162-56.us-east-2.compute.amazonaws.com/api/api/login/'
  //private taskUrl = 'http://ec2-3-131-162-56.us-east-2.compute.amazonaws.com/api/api/task/'
  // private specialistUrl = 'http://ec2-3-131-162-56.us-east-2.compute.amazonaws.com/api/specialist'



  constructor(private http: HttpClient, private module: ModuleModule) { }

  getPosts() {
    const url = `${this.module.getLoginUrl()}login`;
    return this.http.get(url, this.getHeader()).pipe(
    );
  }

  getTasks() {
    const url = `${this.module.getLoginUrl()}task`;
    return this.http.get(url, this.getHeader()).pipe(
    );
  }
  
  getSpecialists() {
    const url = `${this.module.getLoginUrl()}specialist`;
    return this.http.get(url, this.getHeader()).pipe(
    );
  }

  getConsumption() {
    const url = `${this.module.getLoginUrl()}consumption`;
    return this.http.get(url, this.getHeader()).pipe(
    );
  }

  getTreatment() {
    const url = `${this.module.getLoginUrl()}treatment`;
    return this.http.get(url, this.getHeader()).pipe(
    );
  }

  getEfficiency() {
    const url = `${this.module.getLoginUrl()}efficiency`;
    return this.http.get(url, this.getHeader()).pipe(
    );
  }

  getPatient() {
    const url = `${this.module.getLoginUrl()}patient`;
    return this.http.get(url, this.getHeader()).pipe(
    );
  }

  getSpecialistsConsumption(startDate: string, endDate: string): Observable<any[]> {
    const url = `${this.module.getLoginUrl()}specialties/consumptions?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<any[]>(url, this.getHeader()).pipe(
      catchError(this.handleError('getSpecialistsConsumption', []))
    );
  }
  
  




  // searchTasksByDate(startDate: string, endDate: string): Observable<any[]> {
  //   const url = `${this.taskUrl}searchByDate?startDate=${startDate}&endDate=${endDate}`;
  //   return this.http.get<any[]>(url).pipe(
  //     catchError(this.handleError('searchTasksByDate', []))
  //   );
  // }


  

  editId(Id: number, updatedUser: any) {
    return this.http.put(`${this.module.getLoginUrl()}/${Id}`, updatedUser);
  }

  deleteUser(Id: number){
    return this.http.delete(`${this.module.getLoginUrl()}/${Id}`);
      }

  deleteTask(Id: number){
    const url = `${this.module.getLoginUrl()}task`;
    return this.http.delete(`${url}/${Id}`);
      }

  deleteSpecialist(Id: number){
    const url = `${this.module.getLoginUrl()}specialist`;
    return this.http.delete(`${url}/${Id}`);
 }
 deleteConsuption(Id: number){
  const url = `${this.module.getLoginUrl()}consumption`;
  return this.http.delete(`${url}/${Id}`);
}
deleteTreatment(Id: number){
  const url = `${this.module.getLoginUrl()}treatment`;
  return this.http.delete(`${url}/${Id}`);
}

deletePatient(Id: number){
  const url = `${this.module.getLoginUrl()}patient`;
  return this.http.delete(`${url}/${Id}`);
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

