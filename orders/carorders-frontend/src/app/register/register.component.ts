import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { OrdersService } from '../orders.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  onInit;

  constructor(private route: Router, private _snackBar: MatSnackBar, private orderService: OrdersService) { }

  ngOnInit() {
    this.onInit = false;
    this.registrationForm = new FormGroup({
      'firstName': new FormControl('', { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)] }),
      'lastName': new FormControl('', { validators: [Validators.required, , Validators.minLength(2), Validators.maxLength(30)] }),
      'email': new FormControl('', { validators: [Validators.required] }),
      'password': new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(20)] }),
    })
  }

  register() {
    console.log("REGSITER function email" + this.registrationForm.get('email').value)
    console.log("REGSITER function password " + this.registrationForm.get('password').value)
    if (this.registrationForm.invalid) {
      this.onInit = true;
    } else {

      let body = {
        'firstName': this.registrationForm.get('firstName').value,
        'lastName': this.registrationForm.get('lastName').value,
        'email': this.registrationForm.get('email').value,
        'password': this.registrationForm.get('password').value

      }

      this.orderService.registration(body).subscribe(data => {

        if (data.status == true) {
          console.log("data ", +data);
          this.route.navigate(["", "login"]);
        }

        else if (data.status == false) {

          this._snackBar.open(data.message, "Please Login", {
            duration: 2000,
          });
          this.route.navigate(["login"]);


        }




      })



      // this.route.navigate(["", "homepage"]);
    }
  }
}