import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditSpecialistService } from '../edit-specialist-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-specialist',
  templateUrl: './edit-specialist.component.html',
  styleUrl: './edit-specialist.component.css'
})
export class EditSpecialistComponent {
  allEspecialities: any;

  constructor(private route: ActivatedRoute, private editService: EditSpecialistService) {}

  specialistId: number = 0;
  specialist: any = {};
  isLoggedIn: boolean = false;

  

  ngOnInit(): void {
  
    this.editService.getAllEspecialities().subscribe(response => {
      this.allEspecialities = response;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });

    this.route.params.subscribe(params => {
      this.specialistId = +params['id']; 
      this.editService.getById(this.specialistId).subscribe(response => {
        this.specialist= response;
        console.log(this.specialist); 
      }, (error) => {
        console.error('Error encontrando specialist', error);
      });
    });


    this.checkLoginStatus(); 
  }

  checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData;
  }

  saveChanges() {
    this.editService.editId(this.specialistId, this.specialist).subscribe(response => {
      console.log('specialist updated successfully');
    }, (error) => {
      console.error('Error updating specialist', error);
    });
  }

  
}
