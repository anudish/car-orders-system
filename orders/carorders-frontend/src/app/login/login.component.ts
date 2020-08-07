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

  constructor(private route: Router, private orderService: OrdersService, private _snackBar: MatSnackBar) {

    this.loginForm = new FormGroup({
      username: new FormControl('', { validators: [Validators.required, Validators.maxLength(30)] }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(20)] })
    })
  }

  ngOnInit() {
    this.onInit = false;
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
          //sessionStorage.setItem('lastName',data['message']['lastName'])


          this._snackBar.open(data.status, "Login Success", {
            duration: 1500,
          });
          this.route.navigate(["login"]);
        }
        else{
          this._snackBar.open(data.message, "Please Try Again", {
            duration: 1500,
          });
          this.route.navigate(["login"]);
          

        }


      })


    }


  }

}
