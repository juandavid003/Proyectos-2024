import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudConsuptionService } from '../crud-consumption-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-consumption',
  templateUrl: './edit-consumption.component.html',
  styleUrl: './edit-consumption.component.css'
})
export class EditConsumptionComponent {
  allProducts: any;

  constructor(private route: ActivatedRoute, private editService: CrudConsuptionService) {}

  consumptionId: number = 0;
  consumption: any = {};
  isLoggedIn: boolean = false;
  treatments: any[] = [];

  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.consumptionId = +params['id']; 
      this.editService.getAllProducts().subscribe(response => {
        this.allProducts = response;
      }, (err: HttpErrorResponse) => {
        console.log(err);
      });
      
      this.editService.getById(this.consumptionId).subscribe(response => {
        this.consumption= response;
        console.log(this.consumption); 
      }, (error) => {
        console.error('Error encontrando consumption', error);
      });
    });
    this.checkLoginStatus(); 
  }

  checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData;
  }

  saveChanges() {
    this.editService.editId(this.consumptionId, this.consumption).subscribe(response => {
      console.log('consumption updated successfully');
    }, (error) => {
      console.error('Error updating consumption', error);
    });
  }

  
}

