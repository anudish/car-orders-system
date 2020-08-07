import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'carautomobiles-frontend';
  carDetails: any;
  @Output() eventClicked = new EventEmitter<Event>();

  constructor(private route: Router){}
  getCarDetails(car:any,model:any){
    console.log(car)

    //call getCarwithCarName&Model
    this.carDetails = {}
    this.carDetails.carName = 'audi';
    this.carDetails.carModel = 'R8';
    this.carDetails.description = 'this is description'
    this.carDetails.imgUrl = ''

    this.eventClicked.emit(this.carDetails);
    this.route.navigate(["addcar"])
  }
}
