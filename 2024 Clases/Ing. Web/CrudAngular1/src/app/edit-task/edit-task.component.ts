import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditTaskService } from './edit-task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {
  taskId: number = 0;
  task: any = {};
  isLoggedIn: boolean = false;

  constructor(private route: ActivatedRoute, private editService: EditTaskService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = +params['id']; 
      this.editService.getById(this.taskId).subscribe(response => {
        this.task = response;
        console.log(this.task); 
      }, (error) => {
        console.error('Error encontrando task', error);
      });
    });
    this.checkLoginStatus(); 
  }
  
  checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData;
  }

  saveChanges() {
    this.editService.editId(this.taskId, this.task).subscribe(response => {
      console.log('Task updated successfully');
    }, (error) => {
      console.error('Error updating user', error);
    });
  }
}

