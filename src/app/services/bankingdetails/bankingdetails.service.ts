import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Bankingdetails } from './bankingdetails';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/bankingdetails";

@Injectable({
  providedIn: 'root'
})
export class BankingdetailsService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getBankingdetailss (): Observable<Bankingdetails[]> {
    return this.http.get<Bankingdetails[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched bankingdetailss')),
        catchError(this.handleError('getBankingdetailss', []))
      );
  }
  
  getBankingdetails(id: number): Observable<Bankingdetails> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Bankingdetails>(url).pipe(
      tap(_ => console.log(`fetched bankingdetails id=${id}`)),
      catchError(this.handleError<Bankingdetails>(`getBankingdetails id=${id}`))
    );
  }
  



  createBankingdetails (bankingdetails): Observable<Bankingdetails> {
    return this.http.post<Bankingdetails>(apiUrl, bankingdetails, httpOptions).pipe(
      tap((bankingdetails: Bankingdetails) => console.log(`added bankingdetails w/`+bankingdetails)),
      catchError(this.handleError<Bankingdetails>('addBankingdetails'))
    );
  }
  
  updateBankingdetails (id, bankingdetails): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, bankingdetails, httpOptions).pipe(
      tap(_ => console.log(`updated bankingdetails`+bankingdetails)),
      catchError(this.handleError<any>('updateBankingdetails'))
    );
  }
  
  deleteBankingdetails (id): Observable<Bankingdetails> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Bankingdetails>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted bankingdetails`)),
      catchError(this.handleError<Bankingdetails>('deleteBankingdetails'))
    );
  }






}
