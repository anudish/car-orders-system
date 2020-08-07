import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl: string = 'http://localhost:3001';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllCarOrders(): Observable<any> {
    let API_URL = this.apiUrl + '/getAllOrders';
    return this.http.get(API_URL)
      .pipe()
  }
}
