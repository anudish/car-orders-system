import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {

  businessProducts: any[];
  searchCar: FormGroup;
  onInit;

  constructor(private carService: CarsService) {
    this.searchCar = new FormGroup({
      carName: new FormControl('', { validators: [Validators.required] })
    });
  }

  ngOnInit() {
    this.onInit = false;

    this.carService.getAllCars().subscribe(data => {
      console.log("Service", data);

    })
    this.businessProducts = [{ car: 'Audi', model: 'R8', description: 'dummy' }, { car: 'Audi', model: 'R8', description: 'dummy' }, { car: 'Audi', model: 'R8', description: 'dummy' }, { car: 'Audi', model: 'R8', description: 'dummy' }, { car: 'Audi', model: 'R8', description: 'dummy' }, { car: 'Audi', model: 'R8', description: 'dummy' }, { car: 'Audi', model: 'R8', description: 'dummy' }, { car: 'Audi', model: 'R8', description: 'dummy' }, { car: 'Audi', model: 'R8', description: 'dummy' }, { car: 'Audi', model: 'R8', description: 'dummy' }, { car: 'Audi', model: 'R8', description: 'dummy' }, { car: 'Audi', model: 'R8', description: 'dummy' }, { car: 'Audi', model: 'R8', description: 'dummy' }, { car: 'Audi', model: 'R8', description: 'dummy' }];
  }

  onSubmit() {
    if (this.searchCar.invalid) {
      this.onInit = true;
    }
    else {
      console.log(this.searchCar);
    }
  }


}
