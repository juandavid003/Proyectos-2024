import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GestionUsuariosComponent } from './crud-user/gestion-usuarios/gestion-usuarios.component';
import { EditUserComponent } from './crud-user/edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { EditTaskComponent } from './crud-task/edit-task/edit-task.component';
import { CreateTaskComponent } from './crud-task/create-task/create-task.component';
import { SpecialistComponent } from './specialist/specialist.component';
import { CreateSpecialistComponent } from './crud-specialist/create-specialist/create-specialist.component';
import { EditSpecialistComponent } from './crud-specialist/edit-specialist/edit-specialist.component';
import { ModuleModule } from './module/module.module';
import { CreateConsumptionComponent } from './crud-consumption/create-consumption/create-consumption.component';
import { EditConsumptionComponent } from './crud-consumption/edit-consumption/edit-consumption.component';

@NgModule({
  declarations: [
    AppComponent,
    GestionUsuariosComponent,
    EditUserComponent,
    LogInComponent,
    EditTaskComponent,
    CreateTaskComponent,
    SpecialistComponent,
    EditSpecialistComponent,
    CreateSpecialistComponent,
    CreateConsumptionComponent,
    EditConsumptionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ModuleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
