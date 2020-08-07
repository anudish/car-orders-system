import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl: string = 'http://localhost:3001';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getCarBySearch(carName): Observable<any> {
    let API_URL = this.apiUrl + '/getCarBySearch/' + carName;
    return this.http.get(API_URL)
      .pipe()
  }

 insertCarOrderHistory(data): Observable<any> {
    let API_URL = this.apiUrl + '/insertOrderHistory';
    return this.http.post(API_URL,data)
      .pipe()
  }

}
