import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditSpecialistService } from '../../crud-specialist/edit-specialist-service';
import { HttpErrorResponse } from '@angular/common/http';
import { EditPatientComponent } from '../edit-patient/edit-patient.component';
import { CrudPatientService } from '../crud-patient-service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrl: './create-patient.component.css'
})
export class CreatePatientComponent {


  constructor(private route: ActivatedRoute, private service: CrudPatientService) {
    this.checkLoginStatus(); 
  }

  checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData; 
  }


  ngOnInit() {

  }
  NewPatient = {
    id: null,
    code: '',
    firstName: '',
    lastName: '',
    birthDate: new (Date),
    CI: 0,
    medicalHistory: ''
  };

  isLoggedIn: boolean = false; 


  ClickCreateNewPatient() {
    if (this.NewPatient.firstName && this.NewPatient.lastName && this.NewPatient.birthDate) {
      this.service.createPatient(this.NewPatient).subscribe(response => {
        alert(`Paciente ${this.NewPatient.firstName} creado`);
        this.resetForm();
      }, error => {
        console.error('Error al crear el paciente', error);
      });
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }

  resetForm() {
    this.NewPatient = { 
      id: null,
      code: '',
      firstName: '',
      lastName: '',
      birthDate: new (Date),
      CI: 0,
      medicalHistory: ''
    };
  }



}

