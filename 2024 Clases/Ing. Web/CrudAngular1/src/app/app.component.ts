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
  isLoggedIn: boolean = false;

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

  ngOnInit() {
    this.Service.getPosts().subscribe(response => {
      this.users = response;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });

    this.checkLoginStatus(); 
  }

  checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData; 
  }

  editUser(Id: number) {
    console.log(`Navigating to edit user with ID: ${Id}`);
    this.router.navigate([`/edit-user/${Id}`]);
  }

  deleteUser(Id: number, username: string) {
    this.Service.delete(Id).subscribe(response => {
      this.users = response; 
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
    alert(`Usuario ${username} eliminado`);
  }

  createUser() {
    console.log('Navigating to create user');
    this.router.navigate(['/createUser']);  
  }

  logout() {
    localStorage.removeItem('userData'); // Elimina los datos de sesión
    this.isLoggedIn = false; // Actualiza el estado de inicio de sesión
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }
  
}
