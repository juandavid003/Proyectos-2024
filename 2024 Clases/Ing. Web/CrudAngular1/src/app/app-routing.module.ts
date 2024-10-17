import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './auth.guard'; 
import { EditTaskComponent } from './edit-task/edit-task.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
   { path: 'createUser', component: GestionUsuariosComponent, canActivate: [AuthGuard] }, 
   { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard] }, 
   { path: 'createTask', component: CreateTaskComponent, canActivate: [AuthGuard] }, 
   { path: 'edit-task/:id', component: EditTaskComponent, canActivate: [AuthGuard] }, 
   { path: 'login', component: LogInComponent }, // Login no necesita protección
   { path: '', component: GestionUsuariosComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
