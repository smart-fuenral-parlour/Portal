import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Claimtype } from './claimtype';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/claimtype";

@Injectable({
  providedIn: 'root'
})
export class ClaimtypeService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  

  getClaimtypes (): Observable<Claimtype[]> {
    return this.http.get<Claimtype[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched policytypes')),
        catchError(this.handleError('getClaimtypes', []))
      );
  }

  
  getClaimtype(id: number): Observable<Claimtype> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Claimtype>(url).pipe(
      tap(_ => console.log(`fetched claimtype id=${id}`)),
      catchError(this.handleError<Claimtype>(`getClaimtype id=${id}`))
    );
  }
  



  createClaimtype (claimtype): Observable<Claimtype> {
    return this.http.post<Claimtype>(apiUrl, claimtype, httpOptions).pipe(
      tap((claimtype: Claimtype) => console.log(`added claimtype w/`+claimtype)),
      catchError(this.handleError<Claimtype>('addClaimtype'))
    );
  }
  
  updateClaimtype (id, claimtype): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, claimtype, httpOptions).pipe(
      tap(_ => console.log(`updated claimtype`+claimtype)),
      catchError(this.handleError<any>('updateClaimtype'))
    );
  }
  
  deleteClaimtype (id): Observable<Claimtype> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Claimtype>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted claimtype`)),
      catchError(this.handleError<Claimtype>('deleteClaimtype'))
    );
  }






}
