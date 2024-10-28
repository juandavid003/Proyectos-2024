import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ModuleModule {
   // private url = 'https://localhost:44372/api/login/'
  // private taskUrl = 'https://localhost:44372/api/task/'
  private url = 'http://ec2-3-131-162-56.us-east-2.compute.amazonaws.com/api/api/login/';
  private taskUrl = 'http://ec2-3-131-162-56.us-east-2.compute.amazonaws.com/api/api/task/';

  constructor() { }

  getLoginUrl(): string {
    return this.url;
  }

  getTaskUrl(): string {
    return this.taskUrl;
  }
}