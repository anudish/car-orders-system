import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersService } from '../orders.service'
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  onInit;
  loginForm: FormGroup;
  otpForm: FormGroup;
  showLoginForm: boolean = true;

  constructor(private route: Router, private orderService: OrdersService, private _snackBar: MatSnackBar) {

    this.loginForm = new FormGroup({
      username: new FormControl('', { validators: [Validators.required, Validators.maxLength(30)] }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(20)] })
    })

    this.otpForm = new FormGroup({
      otp: new FormControl('', { validators: [Validators.required] })
    })
  }

  ngOnInit() {
    if (sessionStorage.getItem('email') != null) {
      this.route.navigate([""]);
    }
    this.onInit = false;
    this.showLoginForm = true;
  }

  onRegister() {
    this.route.navigate(["", "register"]);

  }

  onLogin() {
    console.log(" login username " + this.loginForm.get('username').value)

    if (this.loginForm.invalid) {
      this.onInit = true;
    }
    else {

      let body = {
        'email': this.loginForm.get('username').value,
        'password': this.loginForm.get('password').value
      }

      this.orderService.login(body).subscribe(data => {

        if (data.status) {
          console.log("data " + data['message']['lastName']);
          console.log("data " + data['message']['firstName']);
          console.log("data " + data['message']['email']);
          sessionStorage.setItem('firstName', data['message']['firstName'])
          sessionStorage.setItem('lastName', data['message']['lastName'])
          sessionStorage.setItem('email', data['message']['email'])
          let otpbody = {
            email: sessionStorage.getItem('email'),
            otp: Math.floor(Math.random() * (9999) + 1000)
          }
          this.orderService.saveOTP(otpbody).subscribe(data => {

            if (data.status) {
              this.orderService.sendOTP(otpbody).subscribe(data => {

                if (data.status) {
                  this.showLoginForm = false;
                }
                else {
                  this.route.navigate(["login"]);
                }

              })
            }
            else {

            }

          })


        }
        else {
          this._snackBar.open(data.message, "Please Try Again", {
            duration: 1500,
          });
          this.route.navigate(["login"]);
        }
      })
    }
  }

  validateOTP() {
    if (this.otpForm.invalid) {
      this.onInit = true;

    }
    else {
      let otpbody = {
        email: sessionStorage.getItem('email'),
        otp: this.otpForm.get('otp').value
      }
      this.orderService.validateOTP(otpbody).subscribe(data => {

        if (data.status) {
          var carInfo = JSON.parse(sessionStorage.getItem('carInfo'))
          if(carInfo){
            this.route.navigate(['productInfo'])
          }else{
            this.route.navigate([""]);
          }
          

        }
      })

    }


  }

}
