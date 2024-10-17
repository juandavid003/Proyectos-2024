import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestionService } from '../gestion-usuarios/gestion.service';
import { CreateTaskService } from './create-task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  NewTask = { 
    taskname: '',
    start_date: '',
    estimated_time: '',
    employee: '',
    project: '',
  };

  isLoggedIn: boolean = false; 

  constructor(private route: ActivatedRoute, private service: CreateTaskService) {
    this.checkLoginStatus(); 
  }

  checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData; 
  }

  ClickCreateNewTask() {
    if (this.NewTask.taskname && this.NewTask.start_date && this.NewTask.estimated_time && this.NewTask.employee && this.NewTask.project) {
      this.service.CreatTask(this.NewTask).subscribe(response => {
        alert(`Tarea ${this.NewTask.taskname} creada`);
        this.resetForm();
      }, error => {
        console.error('Error al crear tarea', error);
      });
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }

  resetForm() {
    this.NewTask = { 
      taskname: '',
      start_date: '',
      estimated_time: '',
      employee: '',
      project: ''
    };
  }
}

