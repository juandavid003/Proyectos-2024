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

  ngOnInit(){}

  
}
