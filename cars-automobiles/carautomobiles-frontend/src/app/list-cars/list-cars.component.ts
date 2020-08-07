import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {

  businessProducts: any[];
  searchCar: FormGroup;
  onInit;

  constructor() {
    this.searchCar = new FormGroup({
      carName: new FormControl('', { validators: [Validators.required] })
    });
  }

  ngOnInit() {
    this.onInit = false;
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
