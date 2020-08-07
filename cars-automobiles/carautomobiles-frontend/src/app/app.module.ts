import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCarsComponent } from './add-cars/add-cars.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCarsComponent } from './list-cars/list-cars.component';


@NgModule({
  declarations: [
    AppComponent,
    AddCarsComponent,
    ListCarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
