import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudTreatmentService } from '../crud-treatment-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-treatment',
  templateUrl: './create-treatment.component.html',
  styleUrl: './create-treatment.component.css'
})
export class CreateTreatmentComponent implements OnInit {
  allTreatments: any[] = []; // Asegurarse de que sea un arreglo para evitar errores.
  isLoggedIn: boolean = false; // Indicador de inicio de sesión.
  
  // Modelo para un nuevo tratamiento.
  newTreatment = {
    description: '',
    startDate: '',
    endDate: '',
    standardCost: 0,
    standardConsumption: 0,
    patientId: null,
    specialistId: null,
    adminId: null,
  };
  allPatients: any;
  allEspecialities: any;
  selectedEspecialityId: any;
  allSpecialistsOfEspeciality: any;


  constructor(private route: ActivatedRoute, private service: CrudTreatmentService) {}

  ngOnInit(): void {
    this.checkLoginStatus();

    this.service.getAllPatients().subscribe(
      (response: any) => {
        if (response && Array.isArray(response)) {
          this.allPatients = response;
        } else {
          console.warn('La respuesta no contiene pacientes válidos.');
        }
      },
      (err: HttpErrorResponse) => {
        console.error('Error al obtener los pacientes:', err.message);
      }
    );

    this.service.getAllEspecialities().subscribe(
      (response: any) => {
        if (response && Array.isArray(response)) {
          this.allEspecialities = response;
        } else {
          console.warn('La respuesta no contiene especialidades válidas.');
        }
      },
      (err: HttpErrorResponse) => {
        console.error('Error al obtener las especialidades:', err.message);
      }
    );



    this.service.getAllTreatments().subscribe(
      (response: any) => {
        if (response && Array.isArray(response)) {
          this.allTreatments = response;
        } else {
          console.warn('La respuesta no contiene tratamientos válidos.');
        }
      },
      (err: HttpErrorResponse) => {
        console.error('Error al obtener los tratamientos:', err.message);
      }
    );
  }



  onEspecialityChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.selectedEspecialityId = +selectedId; // Convertir a número
    this.service.getSpecialistsByEspeciality(this.selectedEspecialityId).subscribe(
      (response: any) => {
        if (response && Array.isArray(response)) {
          this.allSpecialistsOfEspeciality = response;
        } else {
          console.warn('La respuesta no contiene especialidades válidas.');
        }
      },
      (err: HttpErrorResponse) => {
        console.error('Error al obtener las especialidades:', err.message);
      }
    );
  }

  

  checkLoginStatus(): void {
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData;
  }

  createTreatment(): void {
    this.service.createTreatment(this.newTreatment).subscribe(
      (response: any) => {
        console.log('Tratamiento creado con éxito:', response);
        this.allTreatments.push(response);
      },
      (err: HttpErrorResponse) => {
        console.error('Error al crear el tratamiento:', err.message);
      }
    );
  }
}
