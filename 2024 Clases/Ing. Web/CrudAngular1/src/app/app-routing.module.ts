import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './auth.guard'; 

const routes: Routes = [
   { path: 'createUser', component: GestionUsuariosComponent, canActivate: [AuthGuard] }, 
   { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard] }, 
   { path: 'login', component: LogInComponent }, // Login no necesita protección
   { path: '', component: GestionUsuariosComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
