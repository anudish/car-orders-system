import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  apiUrl: string = 'http://localhost:3001';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<any> {
    let API_URL = this.apiUrl + '/getAllCars';
    return this.http.get(API_URL)
      .pipe()
  }
}
