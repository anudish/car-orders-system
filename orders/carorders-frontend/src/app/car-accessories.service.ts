import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarAccessoriesService {
  apiUrl: string = 'http://localhost:3002';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllAssessoriesForCar(data): Observable<any> {
    let API_URL = this.apiUrl + '/getCarAccessories/'+data['carName']+'/'+data['model'];
    return this.http.get(API_URL)
      .pipe()
  }

  insertOrderToAccessories(data): Observable<any> {
    let API_URL = this.apiUrl + '/insertIntoAccessoriesOrders';
    return this.http.post(API_URL,data)
      .pipe()
  }

}
