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
    let API_URL = this.apiUrl + '/getAllAccessoriesForCar';
    return this.http.post(API_URL,data)
      .pipe()
  }

}
