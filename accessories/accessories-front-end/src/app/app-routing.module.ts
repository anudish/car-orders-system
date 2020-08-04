import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetAccessoriesComponent } from './get-accessories/get-accessories.component';
import { HandleAccessoriesComponent } from './handle-accessories/handle-accessories.component';
import {DisplayordersComponent} from './displayorders/displayorders.component';

const routes: Routes = [
  { path: '', component: GetAccessoriesComponent , pathMatch: 'full' },
  { path: 'getAccessories', component: GetAccessoriesComponent},
  { path: 'handleAccssory', component: HandleAccessoriesComponent},
  { path: 'displayorders', component: DisplayordersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
