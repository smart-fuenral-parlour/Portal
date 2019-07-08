import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Balance } from './balance';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/balance";
const getbalancebyidpolicydetailsUrl = "http://greenlinks1.dedicated.co.za:3002/api/getbalancebyidpolicydetails";


@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getBalances (): Observable<Balance[]> {
    return this.http.get<Balance[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched balances')),
        catchError(this.handleError('getBalances', []))
      );
  }
  
  getBalance(id: number): Observable<Balance> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Balance>(url).pipe(
      tap(_ => console.log(`fetched balance id=${id}`)),
      catchError(this.handleError<Balance>(`getBalance id=${id}`))
    );
  }
  

  getBalancebyidpolicydetails(id: number): Observable<Balance> {
    const url = `${getbalancebyidpolicydetailsUrl}/${id}`;
    return this.http.get<Balance>(url).pipe(
      tap(_ => console.log(`fetched balance id=${id}`)),
      catchError(this.handleError<Balance>(`getBalance id=${id}`))
    );
  }
  


  createBalance (balance): Observable<Balance> {
    return this.http.post<Balance>(apiUrl, balance, httpOptions).pipe(
      tap((balance: Balance) => console.log(`added balance w/`+balance)),
      catchError(this.handleError<Balance>('addBalance'))
    );
  }
  
  updateBalance (id, balance): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, balance, httpOptions).pipe(
      tap(_ => console.log(`updated balance`+balance)),
      catchError(this.handleError<any>('updateBalance'))
    );
  }
  
  deleteBalance (id): Observable<Balance> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Balance>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted balance`)),
      catchError(this.handleError<Balance>('deleteBalance'))
    );
  }






}
