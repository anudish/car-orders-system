import { Component, OnInit } from '@angular/core';
import { accessories} from './accessories';
import { AccessoriesDbInteractionService} from '../accessories-db-interaction.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-get-accessories',
  templateUrl: './get-accessories.component.html',
  styleUrls: ['./get-accessories.component.css']
})
export class GetAccessoriesComponent implements OnInit {
public accessoryList: accessories[];
accessoriesSearch: String;
  
  constructor(private router: Router, private accessoriesService: AccessoriesDbInteractionService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.popualateAccessoryDetails();
  }
  
  onDeleteAccessory(accessories:accessories){
    this.accessoriesService.deleteAccessory(accessories).subscribe((data)=>{
      this.popualateAccessoryDetails();
      this._snackBar.open(data.message, '', {
        duration: 2000, panelClass: ["snackbar_confirm"]
      });
  
    })
  }
  popualateAccessoryDetails(){
    this.accessoriesService.getAllAccessories().subscribe((data) => {
      this.accessoryList = data.message as accessories[];
    }, error => {
        console.log(error);
    });
   }

  }
