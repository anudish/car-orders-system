import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  apiUrl: string = 'https://0eqbl31hh4.execute-api.us-east-1.amazonaws.com/production';
  bucketUrl: string = 'https://cors-anywhere.herokuapp.com/https://fvsam1oq54.execute-api.us-east-1.amazonaws.com/default/car-inventory-upload-image-s3'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<any> {
    let API_URL = this.apiUrl + '/getAllCars';
    return this.http.get(API_URL)
      .pipe()
  }

  saveImgToS3(data: any): Observable<any> {
    let API_URL = this.bucketUrl;
    return this.http.post(API_URL, data)
      .pipe()
  }

  insertCar(data: any): Observable<any> {
    let API_URL = this.apiUrl + '/insertIntoCar';
    return this.http.post(API_URL, data)
  }

  updateCar(data: any): Observable<any> {
    let API_URL = this.apiUrl + '/updateCar';
    return this.http.post(API_URL, data)
  }

  deleteCar(data: any): Observable<any> {
    let API_URL = this.apiUrl + '/deleteCar';
    return this.http.post(API_URL, data)
  }
  getCar(data: any): Observable<any> {
    let API_URL = this.apiUrl + '/getOneCar/' + data['car_name'] + '/' + data['model'];
    return this.http.get(API_URL)
  }

  getCarBySearch(carName): Observable<any> {
    let API_URL = this.apiUrl + '/getCarBySearch/' + carName;
    return this.http.get(API_URL)
      .pipe()
  }
}
