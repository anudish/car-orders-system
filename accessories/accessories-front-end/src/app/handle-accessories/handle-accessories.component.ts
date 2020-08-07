import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccessoriesDbInteractionService} from '../accessories-db-interaction.service';
@Component({
  selector: 'app-handle-accessories',
  templateUrl: './handle-accessories.component.html',
  styleUrls: ['./handle-accessories.component.css']
})
export class HandleAccessoriesComponent implements OnInit {
  storeData: FormGroup;
    submitted = false;

  constructor(private formBuilder: FormBuilder, private accessoryService:AccessoriesDbInteractionService,
    private router:Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.storeData = this.formBuilder.group({
      accessoryName:['',[Validators.required]],
      carName: ['',[Validators.required]],
      model:['',[Validators.required]],
      price:['',[Validators.required]],
      qty: ['',[Validators.required]]
    });

  }
  get f() { return this.storeData.controls; }
  navigateToInsert(){
    this.submitted = true;
    if (this.storeData.invalid) {
        return;
    }
    else{
      //on successfull validation alert with success message and navigate to home page
     this.accessoryService.addAccessory(this.storeData.value).subscribe(data=>{
        if(data.status){
          this._snackBar.open(data.message,'',{
            duration:2000, panelClass: ["snackbar_confirm"]
          });
          this.router.navigate(['/']);
        }
        else{
          this._snackBar.open(data.message, '', {
            duration: 2000, panelClass: ["snackbar_confirm"]
          });

        }
      });
    }
  }

  navigateToUpdate(){
    this.submitted = true;
    if (this.storeData.invalid) {
      return;
    }
  
    else{
      //on successfull validation alert with success message and navigate to home page
      this.accessoryService.updateAccessory(this.storeData.value).subscribe(data=>{
        if(data.status){
          this._snackBar.open(data.message,'',{
            duration:2000, panelClass: ["snackbar_confirm"]
          });
          this.router.navigate(['/']);
        }
        else{
          this._snackBar.open(data.message, '', {
            duration: 2000, panelClass: ["snackbar_confirm"]
          });
        }
      });
    }
  }    

}
