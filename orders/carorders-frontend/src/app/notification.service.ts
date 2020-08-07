import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  notifyDealers(order): Observable<any> {
    let API_URL = 'https://cors-anywhere.herokuapp.com/https://2izapsfxlc.execute-api.us-east-1.amazonaws.com/default/notify-orders-car-accessories';
    return this.http.post(API_URL,order)
      .pipe()
  }
  
}
