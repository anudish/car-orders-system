import { Component, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OrdersService } from '../orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})

export class OrderhistoryComponent implements OnInit {
  dataSource: MatTableDataSource<any>;

   ELEMENT_DATA: PeriodicElement[] = [
    {car_name: 1, model: 'Hydrogen', userId: 1.0079, totalPrice: 'H'},
   
  ];
  constructor(private carOrderService: OrdersService,  private _snackBar: MatSnackBar) { }


  
  displayedColumns: string[] = ['car_name', 'model', 'userId', 'totalPrice'];
  


  ngOnInit() {
    this.carOrderService.getAllCarOrders().subscribe(response=>{
      if(response['status']){
        console.log(response['message'])
        this.ELEMENT_DATA = []
        var listOfJobs : any
        listOfJobs = response['message'];
        this.dataSource = new MatTableDataSource(listOfJobs);
      }else{
        this._snackBar.open(response['message'], 'ok', {
          duration: 30000
        });
        this.dataSource = null;
      }
    })
  }

}
export interface PeriodicElement {
  car_name: any;
  model: any;
  userId: any;
  totalPrice: any;
 
}



