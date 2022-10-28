import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVueloComponent } from './components/create-vuelo/create-vuelo.component';
import { DeleteVueloComponent } from './components/delete-vuelo/delete-vuelo.component';
import { EditVueloComponent } from './components/edit-vuelo/edit-vuelo.component';
import { GetVueloComponent } from './components/get-vuelo/get-vuelo.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'crear-vuelo',
    component: CreateVueloComponent,
  },
  {
    path: 'buscar-vuelo',
    component: GetVueloComponent,
  },
  {
    path: 'editar-vuelo',
    component: EditVueloComponent,
  },
  {
    path: 'eliminar-vuelo',
    component: DeleteVueloComponent,
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
