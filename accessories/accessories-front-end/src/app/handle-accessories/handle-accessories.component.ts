import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-handle-accessories',
  templateUrl: './handle-accessories.component.html',
  styleUrls: ['./handle-accessories.component.css']
})
export class HandleAccessoriesComponent implements OnInit {
  storeData: FormGroup;
    submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router:Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.storeData = this.formBuilder.group({
      accessoryID:['',[Validators.required]],
      accessoryName:['',[Validators.required]],
      UnitPrice:['',[Validators.required]]
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
     /* 
     this.partsService.addParts(this.uniqueData.value).subscribe(data=>{
        console.log(data.status);
        if(data.status){
          this._snackBar.open(data.message,'',{
            duration:2000,
          });
          this.router.navigate(['/']);
        }
        else{
          this._snackBar.open(data.message, '', {
            duration: 2000,
          });

        }
      });
      */ 
     this._snackBar.open("Added Accessory", '', { duration: 1500, horizontalPosition:"center", verticalPosition:"bottom", panelClass: ["snackbar_confirm"] });  
    }
  }

  navigateToUpdate(){
    this.submitted = true;
    if (this.storeData.invalid) {
      return;
    }
  
    else{
      //on successfull validation alert with success message and navigate to home page
      this._snackBar.open("Updated Accessory", '', { duration: 1500, horizontalPosition: "center", verticalPosition: "bottom", panelClass: ["snackbar_confirm"] });  }
  } 

}
