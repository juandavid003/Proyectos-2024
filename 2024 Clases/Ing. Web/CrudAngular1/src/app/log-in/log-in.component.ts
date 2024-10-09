import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogInService } from './log-in.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserLogInModel } from '../Interfaces/userLogIn.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  userId: number = 0;
  user: any = {};
  users: any;
  
  
  constructor(private router: Router, private Service: LogInService) {}

  ngOnInit() {
    this.Service.getPosts().subscribe(response => {
      this.users = response;
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }
  

  

  logInButton() {

    const userData = {
      username: this.user.username,
      password: this.user.password
    };
  
    const foundUser = this.users.find(
      (user: UserLogInModel) =>
        user.UserName == userData.username &&
        user.Password == userData.password &&
        user.Rol == "admin" && 
        user.State == "ACTIVE"
    );
  
    if (foundUser) {
      localStorage.setItem('userData', JSON.stringify(userData));
      this.router.navigateByUrl('/').then(() => {
        window.location.reload();
      });
    } else {
      console.log('Usuario o contraseña incorrectos');
    }
  }
  
  

  
}


