import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  constructor() { }
  carName
  model
  basePrice
  totalPrice
  accessories=[]
  email
  ngOnInit() {
    this.email = sessionStorage.getItem('email')
    var orderObj = JSON.parse(sessionStorage.getItem('orderObj'))
    this.carName = orderObj['carName']
    this.model = orderObj['model']
    this.basePrice = orderObj['basePrice']
    this.totalPrice = orderObj['totalPrice']
    this.accessories = orderObj['accessories']

    sessionStorage.removeItem('orderObj')
    sessionStorage.removeItem('carInfo')
  }

}
