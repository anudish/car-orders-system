import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCarsComponent } from './add-cars/add-cars.component'


const routes: Routes = [
  { path: 'addcar', component: AddCarsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
