import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { tap, catchError, map} from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessoriesDbInteractionService {
  apiUrl: string = 'http://localhost:3000/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }

  getAllAccessories(){
    let API_URL = this.apiUrl + '/getAllAccessories';
    return this.http.get(API_URL);
    
  }

  getUniqueParts(){
    let API_URL = this.apiUrl + '/getUniqueAccessory';
    return this.http.get(API_URL);
    
  }


  updateParts(body): Observable<any> {
    let API_URL = this.apiUrl + '/updateAccessory';
    return this.http.put(API_URL, body)
      .pipe(
        tap(data => console.log(data)),catchError(this.handleError)
      )

  }

  addParts(body): Observable<any> {
    let API_URL = this.apiUrl + '/addAccessory';
    return this.http.post(API_URL, body)
      .pipe(
        tap(data => console.log(data)),catchError(this.handleError)
      )
  }

  getAllPartsOrder(){
    let API_URL = this.apiUrl + '/getAllOrders';
    return this.http.get(API_URL)
  }

}
