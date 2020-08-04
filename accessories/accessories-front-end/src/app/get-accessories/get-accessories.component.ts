import { Component, OnInit } from '@angular/core';
import { accessories} from './accessories';

@Component({
  selector: 'app-get-accessories',
  templateUrl: './get-accessories.component.html',
  styleUrls: ['./get-accessories.component.css']
})
export class GetAccessoriesComponent implements OnInit {
public accessoryList: accessories[] = [  
  {
  accessoryID: 1,
  accessoryName: "Winter Tires",
  UnitPrice: 100
  },
  {
  accessoryID: 2,
  accessoryName: "Music System",
  UnitPrice: 300
  },
  {
  accessoryID: 3,
  accessoryName: "Car Jack",
  UnitPrice: 150
  },
  {
  accessoryID: 4,
  accessoryName: "Axle",
  UnitPrice: 2000
  },
  {
  accessoryID: 5,
  accessoryName: "AC",
  UnitPrice: 500
  },
  {
  accessoryID: 6,
  accessoryName: "Airfilter",
  UnitPrice: 2000
  },
  {
  accessoryID: 7,
  accessoryName: "Seat Covers",
  UnitPrice: 500
  }
]; 
accessoriesSearch: String;
  
  constructor() { }

  ngOnInit(): void {
//    this.popualateAccessoryDetails();
  }
  popualateAccessoryDetails(){
  }
}
