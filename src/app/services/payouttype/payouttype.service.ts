import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Payouttype } from './payouttype';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/payouttype";

@Injectable({
  providedIn: 'root'
})
export class PayouttypeService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getPayouttypes (): Observable<Payouttype[]> {
    return this.http.get<Payouttype[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched payouttypes')),
        catchError(this.handleError('getPayouttypes', []))
      );
  }
  
  getPayouttype(id: number): Observable<Payouttype> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Payouttype>(url).pipe(
      tap(_ => console.log(`fetched payouttype id=${id}`)),
      catchError(this.handleError<Payouttype>(`getPayouttype id=${id}`))
    );
  }
  



  createPayouttype (payouttype): Observable<Payouttype> {
    return this.http.post<Payouttype>(apiUrl, payouttype, httpOptions).pipe(
      tap((payouttype: Payouttype) => console.log(`added payouttype w/`+payouttype)),
      catchError(this.handleError<Payouttype>('addPayouttype'))
    );
  }
  
  updatePayouttype (id, payouttype): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, payouttype, httpOptions).pipe(
      tap(_ => console.log(`updated payouttype`+payouttype)),
      catchError(this.handleError<any>('updatePayouttype'))
    );
  }
  
  deletePayouttype (id): Observable<Payouttype> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Payouttype>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted payouttype`)),
      catchError(this.handleError<Payouttype>('deletePayouttype'))
    );
  }






}
