import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestionService } from './gestion.service';
import { UserLogInModel } from '../../Interfaces/userLogIn.model';


@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'] 
})
export class GestionUsuariosComponent {

  NewUser : UserLogInModel = { 
    FirstName: '',
    LastName: '',
    Password: '',
    BirthDate: new Date,
    RoleName:'',
    RoleId: 1,
    UpdatedAt: new Date,
    CreatedAt: new Date,
    Status: ''
  };

  isLoggedIn: boolean = false; 

  constructor(private route: ActivatedRoute, private service: GestionService) {
    this.checkLoginStatus(); 
  }

  checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData; 
  }

  ClickCreateNewUser() {
    if (this.NewUser.FirstName && this.NewUser.LastName && this.NewUser.Password && this.NewUser.BirthDate) {
      this.NewUser.RoleId
      this.service.CreatUser(this.NewUser).subscribe(response => {
        alert(`Usuario ${this.NewUser.FirstName} creado`);
        this.resetForm();
      }, error => {
        console.error('Error al crear el usuario', error);
      });
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }

  resetForm() {

    this.NewUser = { 
      FirstName: '',
      LastName: '',
      Password: '',
      BirthDate: new Date,
      RoleName:'',
      RoleId: 1,
      UpdatedAt: new Date,
      CreatedAt: new Date,
      Status: ''
    };
  }
}
