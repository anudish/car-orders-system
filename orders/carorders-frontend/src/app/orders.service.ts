import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl: string = 'http://localhost:3003';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  registration(data): Observable<any> {
    let API_URL = this.apiUrl + '/registerUser'
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  login(data): Observable<any> {
    let API_URL = this.apiUrl + '/login'
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
