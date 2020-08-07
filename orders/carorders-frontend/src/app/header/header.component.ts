import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showLogout: boolean = false;

  constructor(private route: Router) { }

  ngOnInit() {

    console.log(sessionStorage.getItem('email'));
    if (sessionStorage.getItem('email') == null) {
      this.showLogout = false
    }
    else {
      this.showLogout = true;
    }

  }

  login() {
    this.route.navigate(["", "login"]);
  }

  logout() {
    this.showLogout = false;
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('email');
    this.route.navigate([""]);
  }

}
