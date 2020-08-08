import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessoriesDbInteractionService {
  apiUrl: string = 'https://ghgj1rn04i.execute-api.us-east-1.amazonaws.com/production';


  constructor(private http: HttpClient) { }
  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }

  getAllAccessories(): Observable<any> {
    let API_URL = this.apiUrl + '/getAllAccessories';
    return this.http.get(API_URL).pipe(
      tap(data => console.log(data)), catchError(this.handleError)
    );

  }

  getUniqueAccessory(accsseoryName: string) {
    let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let params: HttpParams = new HttpParams().set('accessoryName', accsseoryName);
    let API_URL = this.apiUrl + '/getOneAccessory';
    return this.http.get(API_URL, { headers, params }).pipe(
      tap(data => console.log(data)), catchError(this.handleError)
    );

  }

  updateAccessory(body): Observable<any> {
    let API_URL = this.apiUrl + '/updateAccessory';
    return this.http.put(API_URL, body)
      .pipe(
        tap(data => console.log(data)), catchError(this.handleError)
      )

  }

  addAccessory(body): Observable<any> {
    let API_URL = this.apiUrl + '/insertIntoAccessories';
    return this.http.post(API_URL, body)
      .pipe(
        tap(data => console.log(data)), catchError(this.handleError)
      )
  }

  deleteAccessory(accessoryDetails): Observable<any> {
    let API_URL = this.apiUrl + '/deleteAccessory';
    return this.http.post(API_URL, accessoryDetails).pipe(
      tap(data => console.log(data)), catchError(this.handleError)
    );

  }

  getAllAccessoriesOrders(): Observable<any> {
    let API_URL = this.apiUrl + '/getAllOrderDetails';
    return this.http.get(API_URL).pipe(
      tap(data => console.log(data)), catchError(this.handleError)
    );
  }
}
