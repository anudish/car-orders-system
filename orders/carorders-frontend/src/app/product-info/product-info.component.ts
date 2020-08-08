import { Component, OnInit } from '@angular/core';
import { CarAccessoriesService } from '../car-accessories.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { CarService } from '../car.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  imgUrl
  carName
  basePrice
  model
  totalPrice
  description
  ELEMENT_DATA: PeriodicElement[] = [];
  accessoriesDetails: PeriodicElement[] = [];
  displayedColumns: string[] = ['select', 'position', 'accessoryName', 'price'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  constructor(private carAccessoriesService: CarAccessoriesService
    , private carService: CarService, private route: Router
    , private orderService: OrdersService, private notificationService: NotificationService, 
    private snackBar: MatSnackBar) { }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));

    if (this.selection.selected.length === this.dataSource.data.length) {
      this.accessoriesDetails = this.ELEMENT_DATA;
    }
    else {
      this.accessoriesDetails = [];
    }
  }

   /** The label for the checkbox on the passed row */
   checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  addAccessory(rowValue){
    
      console.log(this.accessoriesDetails.length);
      console.log(event);
      console.log(this.selection.isSelected(rowValue));
      if (this.selection.isSelected(rowValue)) {
        for (var i = 0; i < this.accessoriesDetails.length; i++) {
          if (this.accessoriesDetails[i].position == rowValue.position) {
            for (var j = i; j < this.accessoriesDetails.length; j++) {
              console.log(j);
              if ((j + 1) === this.accessoriesDetails.length) {
                this.accessoriesDetails.pop();
              }
              else {
                this.accessoriesDetails[j] = this.accessoriesDetails[j + 1];
              } 
            }
          }
        }
      }
      else {
        this.accessoriesDetails.push(rowValue);
  
      }

       this.totalPrice = this. basePrice;
    this.accessoriesDetails.forEach(element => {
      this.totalPrice += element.price
    });


      console.log("After Order details" + this.accessoriesDetails.length)
      for (var i = 0; i < this.accessoriesDetails.length; i++) {
        console.log(this.accessoriesDetails[i]);
      }
    
  }

  ngOnInit() {
    this.accessoriesDetails = []
    var carInfo = JSON.parse(sessionStorage.getItem('carInfo'))
    if (carInfo){
      this.imgUrl = carInfo['image_url']
      this.carName = carInfo['car_name']
      this.model = carInfo['model']
      this.basePrice = carInfo['price']
      console.log(this.carName)
      this.description = carInfo['description']
      this.totalPrice = this.basePrice 
      this.carAccessoriesService.getAllAssessoriesForCar({
        'carName':this.carName,
        'model':this.model}).subscribe(response=>{
          if(response['status']){
            this.ELEMENT_DATA =  []
            response['message']
            
           for(var pos = 0;pos<response.message.length;pos++){
              this.ELEMENT_DATA.push(<PeriodicElement>{position:pos+1 , accessoryName: response.message[pos]['accessoryName'], price:  response.message[pos]['price'] })
            }

        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            
          
          }
        })
    }
  }

  submitOrder(){
    var totalPrice = this. basePrice;
    this.accessoriesDetails.forEach(element => {
      totalPrice += element.price
    });
    var email = sessionStorage.getItem('email')
    var orderObj = { 'basePrice': this.basePrice,'carName':this.carName, 'model':this.model, 'userId': email, 'totalPrice': this.totalPrice, 'accessories': this.accessoriesDetails}
    sessionStorage.setItem('orderObj',JSON.stringify(orderObj))
    var messages =[]
    if(email){
      this.carService.insertCarOrderHistory({
        'car_name': this.carName,
        'model': this.model,
        'userId': email,
        'totalPrice': this.basePrice
    
    }).subscribe(res=>{
        if(res['status']){

          //insert into company y order history
          messages.push(res['message'])
          this.carAccessoriesService.insertOrderToAccessories({
            'userId' : email,
            'carName': this.carName,
            'model': this.model,
            'totalPrice':totalPrice,
            'accessoryList':this.accessoriesDetails

          }).subscribe(response=>{
            if(response['status']){
              messages.push(response['message'])
              this.orderService.insertOrdersToCarDealer({
                 'userId' : email,
              'carName': this.carName,
              'model': this.model,
              'totalPrice':totalPrice,
              'accessoryList':this.accessoriesDetails}).subscribe(val=>{
                if(val['status']){
                  messages.push(val['message'])
                  this.notificationService.notifyDealers({
                    "dealer":"ABT-Car Dealers",
                    "user": email,
                    "carName":this.carName,
                    "model":this.model,
                    "price":this.basePrice,
                    "accessories":this.accessoriesDetails
                  }).subscribe(resp=>{
                    if(resp['status']){
                      console.log('check success')
    
                      //notify user
                      this.notificationService.sendOrderConfirmation({
                          "email": email,
                          "carName": this.carName,
                          "model": this.model,
                          "price": this.totalPrice,
                          "firstName": sessionStorage.getItem('firstName')
                        }).subscribe(r=>{
                          if(r['status']){
                            console.log('checjjivi')
                            this.route.navigate(['orderSuccess'])
                            //navigate to order success page
                          }else{
                            this.snackBar.open(r['message'], 'ok', {
                              duration: 30000
                            });
                          }
                        })   
                    } else{
                      this.snackBar.open(resp['message'], 'ok', {
                        duration: 30000
                      });
                    }
        
                  })
                }else{
                  this.snackBar.open(val['message'], 'ok', {
                    duration: 30000
                  });
                }
              })
             
              
            }else{
              this.snackBar.open(response['message'], 'ok', {
                duration: 30000
              });
            }
            
          })
          


        }else{
          messages.push(res['message'])
          this.snackBar.open(res['message'], 'ok', {
            duration: 30000
          });
        }
      })
    }else{
      
      this.route.navigate(["login"])
    }
    console.log('totalPrice: '+ totalPrice)
  }
}

export interface PeriodicElement {
  accessoryName: string;
  price: number;
  position: number;

  
}
