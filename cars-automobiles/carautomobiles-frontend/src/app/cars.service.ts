import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  apiUrl: string = 'http://localhost:3001';
  bucketUrl: string = 'https://cors-anywhere.herokuapp.com/https://fvsam1oq54.execute-api.us-east-1.amazonaws.com/default/car-inventory-upload-image-s3'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<any> {
    let API_URL = this.apiUrl + '/getAllCars';
    return this.http.get(API_URL)
      .pipe()
  }

  saveImgToS3(data: any): Observable<any> {
    let API_URL = this.bucketUrl ;
    return this.http.post(API_URL, data)
      .pipe()
  }

  insertCar(data: any): Observable<any> {
    let API_URL = this.apiUrl + '/insertIntoCar';
    return this.http.post(API_URL, data)
      .pipe()
  }
}
