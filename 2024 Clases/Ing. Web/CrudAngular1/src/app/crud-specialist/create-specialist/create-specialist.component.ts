import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestionService } from '../../crud-user/gestion-usuarios/gestion.service';
import { SpecialistModel } from '../../Interfaces/SpecialistModel';
import { EditSpecialistService } from '../edit-specialist-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-specialist',
  templateUrl: './create-specialist.component.html',
  styleUrl: './create-specialist.component.css'
})
export class CreateSpecialistComponent {
  allEspecialities: any;

  ngOnInit() {
    this.service.getAllEspecialities().subscribe(response => {
      this.allEspecialities = response;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }


  NewSpecialist: SpecialistModel = { 
    Code: 1,
    FirstName: '',
    LastName: '',
    Password: '',
    BirthDate: new Date(),
    EspecialityId: 1,
    Efficiency: 1,
  };

  isLoggedIn: boolean = false; 

  constructor(private route: ActivatedRoute, private service: EditSpecialistService) {
    this.checkLoginStatus(); 
  }

  checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData; 
  }

  ClickCreateNewSpecialist() {
    if (this.NewSpecialist.FirstName && this.NewSpecialist.LastName && this.NewSpecialist.Password && this.NewSpecialist.BirthDate) {
      this.service.createSpecialist(this.NewSpecialist).subscribe(response => {
        alert(`Especialista ${this.NewSpecialist.FirstName} creado`);
        this.resetForm();
      }, error => {
        console.error('Error al crear el especialista', error);
      });
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }

  resetForm() {
    this.NewSpecialist = { 
      Code: 0,
      FirstName: '',
      LastName: '',
      Password: '',
      BirthDate: new Date(),
      EspecialityId: 0,
      Efficiency: 0,
    };
  }
}