import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  dataSource: MatTableDataSource<any>;

  ELEMENT_DATA: PeriodicElement[] = [
   {carName: 1, model: 'Hydrogen', userId: 1.0079, totalPrice: 'H',accessoryName:'d',price:2},
  
 ];
  constructor(private orderService: OrdersService,  private _snackBar: MatSnackBar, private route: Router) { }

  displayedColumns: string[] = ['carName', 'model', 'userId', 'totalPrice','accessoryName','price'];

  ngOnInit() {
    var user= sessionStorage.getItem('email')
    if(user){
      this.orderService.getAllUserOrders(user).subscribe(response=>{
        if(response['status']){
          console.log(response['message'])
          this.ELEMENT_DATA = []
          var listOfOrder : any
          listOfOrder = response['message'];
          this.dataSource = new MatTableDataSource(listOfOrder);
        }else{
          this._snackBar.open(response['message'], 'ok', {
            duration: 30000
          });
          this.dataSource = null;
         
        }
      })
    }else{
      this.route.navigate(['login'])
    }
  }

}

export interface PeriodicElement {
  carName: any;
  model: any;
  userId: any;
  totalPrice: any;
  accessoryName: any;
  price: any;
 
}


