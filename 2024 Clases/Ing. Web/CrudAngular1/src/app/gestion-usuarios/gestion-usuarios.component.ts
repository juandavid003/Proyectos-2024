import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestionService } from './gestion.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'] // Cambia "styleUrl" a "styleUrls"
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

  constructor(private route: ActivatedRoute, private service: GestionService) {}

 

 
}
