import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './auth.guard'; 
import { EditTaskComponent } from './crud-task/edit-task/edit-task.component';
import { CreateTaskComponent } from './crud-task/create-task/create-task.component';
import { GestionUsuariosComponent } from './crud-user/gestion-usuarios/gestion-usuarios.component';
import { EditUserComponent } from './crud-user/edit-user/edit-user.component';
import { CreateSpecialistComponent } from './crud-specialist/create-specialist/create-specialist.component';
import { EditSpecialistComponent } from './crud-specialist/edit-specialist/edit-specialist.component';
import { CreateConsumptionComponent } from './crud-consumption/create-consumption/create-consumption.component';
import { EditConsumptionComponent } from './crud-consumption/edit-consumption/edit-consumption.component';

const routes: Routes = [
   { path: 'createUser', component: GestionUsuariosComponent, canActivate: [AuthGuard] }, 
   { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard] }, 
  //  { path: 'createTask', component: CreateTaskComponent, canActivate: [AuthGuard] }, 
  //  { path: 'edit-task/:id', component: EditTaskComponent, canActivate: [AuthGuard] }, 
  { path: 'createSpecialist', component: CreateSpecialistComponent, canActivate: [AuthGuard] }, 
  { path: 'edit-specialist/:id', component: EditSpecialistComponent, canActivate: [AuthGuard] }, 
  { path: 'createConsumption', component: CreateConsumptionComponent, canActivate: [AuthGuard] }, 
  { path: 'edit-consumption/:id', component: EditConsumptionComponent, canActivate: [AuthGuard] }, 

   { path: 'login', component: LogInComponent }, // Login no necesita protección
   { path: '', component: GestionUsuariosComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

