import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {
  private url = 'https://localhost:44372/api/Specialist'

  
  //private url = 'http://ec2-3-131-162-56.us-east-2.compute.amazonaws.com/api/api/Specialist'

  constructor(private http: HttpClient) { }

  
 



  GetSpecialist(x: any) {
    return this.http.get(`${this.url}`, x);

    }  
  
  }
