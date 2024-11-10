import { Component } from '@angular/core';
import { consumptionModel } from '../../Interfaces/ConsumptionModel';
import { ActivatedRoute } from '@angular/router';
import { CrudConsuptionService } from '../crud-consumption-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-consumption',
  templateUrl: './create-consumption.component.html',
  styleUrl: './create-consumption.component.css'
})
export class CreateConsumptionComponent {
  
  allProducts: any;

  ngOnInit() {
    this.service.getAllProducts().subscribe(response => {
      this.allProducts = response;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  NewConsuption: consumptionModel = { 
    usedDate: new Date(),
    productId: 0,
    treatmentId: 0,
    usedQuantity: 0,
  };

  isLoggedIn: boolean = false; 

  constructor(private route: ActivatedRoute, private service: CrudConsuptionService) {
    this.checkLoginStatus(); 
  }

  checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData; 
  }


  ClickCreateNewConsumption() {
    if (this.NewConsuption.productId && this.NewConsuption.treatmentId && this.NewConsuption.usedQuantity) {
      this.service.createConsuption(this.NewConsuption).subscribe(response => {
        alert(`Consumo ${this.NewConsuption.treatmentId} creado`);
        this.resetForm();
      }, error => {
        console.error('Error al crear el consumo', error);
      });
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }

  resetForm() {
    this.NewConsuption = { 
      usedDate: new Date(),
      productId: 0,
      treatmentId: 0,
      usedQuantity: 0,
    };
  }
}