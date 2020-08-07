import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCarsComponent } from './add-cars/add-cars.component'
import { ListCarsComponent } from './list-cars/list-cars.component'

const routes: Routes = [
  { path: 'addcar', component: AddCarsComponent },
  { path: '', component: ListCarsComponent },
  { path: 'updatecar', component: AddCarsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
