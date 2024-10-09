import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestionService } from './gestion.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'] 
})
export class GestionUsuariosComponent {
  NewUser = { 
    username: '',
    mail: '',
    password: '',
    completeName: '',
    startDate: '',
    state: '',
    rol: ''
  };

  isLoggedIn: boolean = false; // Agrega esta línea

  constructor(private route: ActivatedRoute, private service: GestionService) {
    this.checkLoginStatus(); // Verificar el estado de inicio de sesión
  }

  checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData; // Actualiza isLoggedIn según la presencia de userData
  }

  ClickCreateNewUser() {
    if (this.NewUser.username && this.NewUser.mail && this.NewUser.password && this.NewUser.completeName && this.NewUser.startDate) {
      this.service.CreatUser(this.NewUser).subscribe(response => {
        alert(`Usuario ${this.NewUser.username} creado`);
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
      username: '',
      mail: '',
      password: '',
      completeName: '',
      startDate: '',
      state: '',
      rol: ''
    };
  }
}
