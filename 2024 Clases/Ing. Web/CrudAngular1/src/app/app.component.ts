import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'CrudAngular1';
  users: any;
  tasks: any;
  isLoggedIn: boolean = false;
  startDate: any;
  endDate: any;
  specialists: any;
  consumptions: any;
  treatments: any;
  efficiencys: any;
  SpecialistsConsumption: any;
  patients: any;

  constructor(private Service: ApiService, private router: Router) {}

  isEditUserPage(): boolean {
    return this.router.url.startsWith('/edit-user');
  }

  isCreateUserPage(): boolean {
    return this.router.url.startsWith('/createUser');
  }

  isLogInPage(): boolean {
    return this.router.url.startsWith('/login');
  }

  isEditTaskPage(){
    return this.router.url.startsWith('/edit-task');
  }

  isCreateTaskPage(){
    return this.router.url.startsWith('/createTask');

  }
  
  isEditSpecialistPage(){
    return this.router.url.startsWith('/edit-specialist');
  }

  isCreateSpecialistPage(){
    return this.router.url.startsWith('/createSpecialist');

  }
  isEditConsumptionPage(){
    return this.router.url.startsWith('/edit-consumption');
  }
  isCreateConsumptionPage(){
    return this.router.url.startsWith('/createConsumption');

  }
  isEditTreatmentPage(){
    return this.router.url.startsWith('/edit-treatment');
  }
  isCreateTreatmentPage(){
    return this.router.url.startsWith('/createTreatment');
  }

  isEditPatientPage(){
    return this.router.url.startsWith('/edit-patient');
  }
  isCreatePatientPage(){
    return this.router.url.startsWith('/createPatient');

  }

  ngOnInit() {
    this.checkLoginStatus(); 

    this.Service.getPosts().subscribe(response => {
      this.users = response;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });

    this.Service.getTasks().subscribe(response => {
      this.tasks = response;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });

    this.Service.getSpecialists().subscribe(response => {
      this.specialists = response;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });

    this.Service.getConsumption().subscribe(response => {
      this.consumptions = response;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
    
    this.Service.getTreatment().subscribe(response => {
      this.treatments = response;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
    this.Service.getEfficiency().subscribe(response => {
      this.efficiencys = response;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
    this.Service.getPatient().subscribe(response => {
      this.patients = response;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });

  }




  specialistsConsumption(startDate: string, endDate: string){
    this.Service.getSpecialistsConsumption(startDate, endDate).subscribe(response => {
      this.SpecialistsConsumption = response;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }


  editUser(Id: number) {
    this.router.navigate([`/edit-user/${Id}`]);
  }

  deleteUser(Id: number, username: string) {
    this.Service.deleteUser(Id).subscribe(response => {
      this.users = response; 
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
    alert(`Usuario ${username} eliminado`);
  }

  createUser() {
    this.router.navigate(['/createUser']);  
  }






  editSpecialist(Id: number) {
    this.router.navigate([`/edit-specialist/${Id}`]);
  }

  deleteSpecialist(Id: number, specialistName: string) {
    this.Service.deleteSpecialist(Id).subscribe(response => {
      this.specialists = response; 
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
    alert(`Specialista ${specialistName} eliminado`);
  }

  createSpecialist() {
    this.router.navigate(['/createSpecialist']);  
  }









  editConsumption(Id: number) {
    this.router.navigate([`/edit-consumption/${Id}`]);
  }

  deleteConsumption(Id: number, consumptionId: number) {
    this.Service.deleteConsuption(Id).subscribe(response => {
      this.consumptions = response; 
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
    alert(`Consumo ${consumptionId} eliminado`);
  }

  createConsumption() {
    this.router.navigate(['/createConsumption']);  
  }





  
  editTreatment(Id: number) {
    this.router.navigate([`/edit-treatment/${Id}`]);
  }

  deleteTreatment(Id: number) {
    this.Service.deleteTreatment(Id).subscribe(response => {
      this.treatments = response; 
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
    alert(`Tratamiento ${Id} eliminado`);
  }

  createTreatment() {
    this.router.navigate(['/createTreatment']);  
  }





  editPatient(Id: number) {
    this.router.navigate([`/edit-patient/${Id}`]);
  }

  deletePatient(Id: number, name: string) {
    this.Service.deletePatient(Id).subscribe(response => {
      this.patients = response; 
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
    alert(`Paciente ${name} eliminado`);
  }

  createPatient() {
    this.router.navigate(['/createPatient']);  
  }





  checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData; 
  }
  
  logout() {
    localStorage.removeItem('userData');
    this.isLoggedIn = false; 
    this.router.navigate(['/login']); 
  }

  // searchTasksByDate(startDate: string, endDate: string) 
  // {
  //   if (startDate && endDate) {
      
  //     this.Service.searchTasksByDate(startDate, endDate).subscribe(response => {
  //       this.tasks = response;
  //     }, (err: HttpErrorResponse) => {
  //       console.log(err);
  //     });
  //   } else {
  //     alert('Por favor, selecciona ambas fechas de inicio y fin.');
  //   }
  // }


  // editTask(task_id: number){
  //   console.log(`Navigating to edit user with ID: ${task_id}`);
  //   this.router.navigate([`/edit-task/${task_id}`]);

  // }
  // deleteTask(task_id: number, taskname: string) {
  //   this.Service.deleteTask(task_id).subscribe(response => {
  //     this.users = response; 
  //   }, (err: HttpErrorResponse) => {
  //     console.log(err);
  //   });
  //   alert(`Tarea ${taskname} eliminada`);
  // }

  // createTask() {
  //   this.router.navigate(['/createTask']);  
  // }

  
  
}
