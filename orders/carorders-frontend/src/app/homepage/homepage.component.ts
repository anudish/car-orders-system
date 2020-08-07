import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CarService } from '../car.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  searchBarControl = new FormControl();
  carDetails: any[] = [];

  constructor(private _snackBar: MatSnackBar, private carService: CarService, private route: Router) { }

  ngOnInit() {
    sessionStorage.removeItem('carInfo');
  }

  getCarDetails() {

    if (this.searchBarControl.value == null) {

      this._snackBar.open("Car name cannot be empty", "OK", {
        duration: 1500,
      });
    }
    else {
      this.carService.getCarBySearch(this.searchBarControl.value).subscribe(data => {
        console.log("Service", data.message);
        this.carDetails = data.message;
      });

    }
  }

  loadCarDetails(car_details) {
    var carInfo = { 'car_name': car_details['car_name'], 'model': car_details['model'], description: car_details['description'], image_url: car_details['image_url'], price: car_details['price'] }
    sessionStorage.setItem('carInfo', JSON.stringify(carInfo))
    this.route.navigate(['productInfo'])
  }

}
