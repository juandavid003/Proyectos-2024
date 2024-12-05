import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudTreatmentService } from '../crud-treatment-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-treatment',
  templateUrl: './edit-treatment.component.html',
  styleUrls: ['./edit-treatment.component.css']
})
export class EditTreatmentComponent implements OnInit {
  isLoggedIn: boolean = false; // Indicador de inicio de sesión.
  treatmentId: number | null = null; // ID del tratamiento que se está editando.

  // Modelo del tratamiento que se editará.
  editTreatment = {
    description: '',
    startDate: '',
    endDate: '', 
    standardCost: 0,
    standardConsumption: 0,
    specialistName: '',
    patientName: '',
    specialty: '',
    adminId: null, 
  };
  allPatients: any;
  allEspecialities: any;
  allSpecialistsOfEspecialityByName: any;
  selectedEspecialityName: string = '';  


  constructor(
    private route: ActivatedRoute,
    private service: CrudTreatmentService,
    private router: Router,
  ) {}

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

    

    



    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.treatmentId = id ? +id : null;

      if (this.treatmentId) {
        this.loadTreatment(this.treatmentId);
      } else {
        console.error('ID del tratamiento no válido.');
      }
    });
  }

  checkLoginStatus(): void {
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData;
  }

  loadTreatment(id: number): void {
    this.service.getById(id).subscribe(
      (response: any) => {
        this.editTreatment = response;
      },
      (err: HttpErrorResponse) => {
        console.error('Error al cargar el tratamiento:', err.message);
      }
    );
  }

  updateTreatment(): void {
    if (this.treatmentId) {
      this.service.editId(this.treatmentId, this.editTreatment).subscribe(
        (response: any) => {
          console.log('Tratamiento actualizado con éxito:', response);
          this.router.navigate(['/treatments']);
        },
        (err: HttpErrorResponse) => {
          console.error('Error al actualizar el tratamiento:', err.message);
        }
      );
    } else {
      console.error('ID del tratamiento no disponible.');
    }
  }

  onEspecialityChange(event: Event) {
    const selectedName = (event.target as HTMLSelectElement).value;
    this.selectedEspecialityName = selectedName; 
    this.service.getSpecialistsByEspecialityByName(this.selectedEspecialityName).subscribe(
      (response: any) => {
        if (response && Array.isArray(response)) {
          this.allSpecialistsOfEspecialityByName = response;
        } else {
          console.warn('La respuesta no contiene especialidades válidas.');
        }
      },
      (err: HttpErrorResponse) => {
        console.error('Error al obtener las especialidades:', err.message);
      }
    );
  }


}
