import { Component, OnInit } from '@angular/core';
import { accessoriesOrders } from './accessoriesOrders';
import { AccessoriesDbInteractionService } from '../accessories-db-interaction.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-displayorders',
  templateUrl: './displayorders.component.html',
  styleUrls: ['./displayorders.component.css']
})
export class DisplayordersComponent implements OnInit {
  public accessoryList: accessoriesOrders[];
  accessoriesSearch: String;

  constructor(private router: Router, private accessoriesService: AccessoriesDbInteractionService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.populateAccessoryOrderDetails();
  }
  populateAccessoryOrderDetails() {
    this.accessoriesService.getAllAccessoriesOrders().subscribe((data) => {
      // debugger;
      console.log(data.message);
      this.accessoryList = data.message as accessoriesOrders[];
    }, error => {
      console.log(error);
    });

  }
}
