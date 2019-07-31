import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Count } from './count';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

/**
 * 
 * 
 * const membercountUrl = "http://greenlinks1.dedicated.co.za:3002/api/membercount/";
const declinedclaimsUrl = "http://greenlinks1.dedicated.co.za:3002/api/declinedclaimscount";
const approvedclaimsUrl = "http://greenlinks1.dedicated.co.za:3002/api/approvedclaimscount";
const pendingclaimsUrl = "http://greenlinks1.dedicated.co.za:3002/api/pendingclaimscount";
 */

const membercountUrl = "http://greenlinks1.dedicated.co.za:3000/api/Members/count";
const declinedclaimsUrl = "http://greenlinks1.dedicated.co.za:3000/api/Claims/count?where=%7B%22id%22%3A%203%7D";
const approvedclaimsUrl = "http://greenlinks1.dedicated.co.za:3000/api/Claims/count?where=%7B%22id%22%3A%202%7D";
const pendingclaimsUrl = "http://greenlinks1.dedicated.co.za:3000/api/Claims/count?where=%7B%22id%22%3A%201%7D";

@Injectable({
  providedIn: 'root'
})
export class CountService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



  getmemberCount(): Observable<Count> {
    const url = `${membercountUrl}`;
    return this.http.get<Count>(url).pipe(
      tap(_ => console.log(`fetched count id=`)),
      catchError(this.handleError<Count>(`getmemberCount id=`))
    );
  }


  
  getpendingclaimsCount(): Observable<Count> {
    const url = `${pendingclaimsUrl}`;
    return this.http.get<Count>(url).pipe(
      tap(_ => console.log(`fetched count id=`)),
      catchError(this.handleError<Count>(`getpendingclaimsCount`))
    );
  }

  getapprovedclaimsCount(): Observable<Count> {
    const url = `${approvedclaimsUrl}`;
    return this.http.get<Count>(url).pipe(
      tap(_ => console.log(`fetched count id=`)),
      catchError(this.handleError<Count>(`getapprovedclaimsCount `))
    );
  }

  getdeclinedclaimsCount(): Observable<Count> {
    const url = `${declinedclaimsUrl}`;
    return this.http.get<Count>(url).pipe(
      tap(_ => console.log(`fetched count id=`)),
      catchError(this.handleError<Count>(`getdeclinedclaimsCount `))
    );
  }
  








}
