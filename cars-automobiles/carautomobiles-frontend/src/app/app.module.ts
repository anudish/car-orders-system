import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCarsComponent } from './add-cars/add-cars.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCarsComponent } from './list-cars/list-cars.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';

import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    AddCarsComponent,
    ListCarsComponent,
    OrderhistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
