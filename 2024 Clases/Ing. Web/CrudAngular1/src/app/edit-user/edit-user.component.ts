import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditService } from './edit.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: number = 0;
  user: any = {};

  constructor(private route: ActivatedRoute, private editService: EditService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id']; 
      this.editService.getById(this.userId).subscribe(response => {
        this.user = response;
        console.log(this.user); 
      }, (error) => {
        console.error('Error fetching user', error);
      });
    });
  }

  saveChanges() {
    this.editService.editId(this.userId, this.user).subscribe(response => {
      console.log('User updated successfully');
    }, (error) => {
      console.error('Error updating user', error);
    });
  }
}
