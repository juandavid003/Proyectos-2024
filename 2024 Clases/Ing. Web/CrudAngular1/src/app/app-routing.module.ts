import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { EditUserComponent } from './edit-user/edit-user.component';


const routes: Routes = [
   { path: 'createUser', component: GestionUsuariosComponent },
   { path: 'edit-user/:id', component: EditUserComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}