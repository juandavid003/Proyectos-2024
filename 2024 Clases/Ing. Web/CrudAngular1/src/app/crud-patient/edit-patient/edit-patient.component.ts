import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CrudPatientService } from '../crud-patient-service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent {
  allPatientTypes: any; // Lista de tipos de pacientes o especialidades, dependiendo de la lógica
  patientId: number = 0;
  patient: any = {};
  isLoggedIn: boolean = false;

  constructor(private route: ActivatedRoute, private editService: CrudPatientService) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.patientId = +params['id']; 
      this.editService.getById(this.patientId).subscribe(response => {
        this.patient = response;
        console.log(this.patient); 
      }, (error) => {
        console.error('Error encontrando paciente', error);
      });
    });

    this.checkLoginStatus(); 
  }

  checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData;
  }

  saveChanges() {
    this.editService.editId(this.patientId, this.patient).subscribe(response => {
      console.log('Paciente actualizado con éxito');
    }, (error) => {
      console.error('Error actualizando paciente', error);
    });
  }
}
