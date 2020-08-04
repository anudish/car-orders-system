import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetAccessoriesComponent } from './get-accessories/get-accessories.component';
import { HandleAccessoriesComponent } from './handle-accessories/handle-accessories.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { from } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { DisplayordersComponent } from './displayorders/displayorders.component';
import { AccessoryfilterPipe } from './get-accessories/accessoryfilter.pipe';
import { OrdersfilterPipe } from './displayorders/ordersfilter.pipe';
import { FooterComponent } from './footer/footer.component';
import { AccessoriesDbInteractionService} from './accessories-db-interaction.service';
@NgModule({
  declarations: [
    AppComponent,
    GetAccessoriesComponent,
    HandleAccessoriesComponent,
    HeaderComponent,
    DisplayordersComponent,
    AccessoryfilterPipe,
    OrdersfilterPipe,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  providers: [AccessoriesDbInteractionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
