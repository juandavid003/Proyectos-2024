import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ModuleModule {
  private url = 'https://localhost:44372/api/'
  // private url = 'http://ec2-3-131-162-56.us-east-2.compute.amazonaws.com/api/api/';

  constructor() { }

  getLoginUrl(): string {
    return this.url;
  }
}