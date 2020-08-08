import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarsService } from '../cars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {

  businessProducts: any[] = [];
  searchCar: FormGroup;
  onInit;
  showError = false;

  constructor(private carService: CarsService, private route: Router) {
    this.searchCar = new FormGroup({
      carName: new FormControl('', { validators: [Validators.required] })
    });
  }

  ngOnInit() {
    this.onInit = false;

    this.carService.getAllCars().subscribe(data => {
      console.log("Service", data.message);
      this.businessProducts = data.message;
      if (this.businessProducts.length == 0) {
        this.showError = true;
      }
    });
  }

  onSubmit() {
    if (this.searchCar.invalid) {
      this.onInit = true;
    }
    else {

      console.log(this.searchCar.get('carName').value);

      this.carService.getCarBySearch(this.searchCar.get('carName').value).subscribe(data => {
        console.log("Service", data.message);
        this.businessProducts = data.message;
        if (this.businessProducts.length == 0) {
          this.showError = true;
        }
      });




    }
  }

  loadCarDetails(car_name, model) {
    var carInfo = { 'car_name': car_name, 'model': model }
    sessionStorage.setItem('carInfo', JSON.stringify(carInfo))
    this.route.navigate(['updatecar'])
  }



}
