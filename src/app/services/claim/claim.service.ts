import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Claim } from './claim';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/claim";

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  
  getClaim(id: number): Observable<Claim> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Claim>(url).pipe(
      tap(_ => console.log(`fetched claim id=${id}`)),
      catchError(this.handleError<Claim>(`getClaim id=${id}`))
    );
  }
  



  createClaim (claim): Observable<Claim> {
    return this.http.post<Claim>(apiUrl, claim, httpOptions).pipe(
      tap((claim: Claim) => console.log(`added claim w/`+claim)),
      catchError(this.handleError<Claim>('addClaim'))
    );
  }
  
  updateClaim (id, claim): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, claim, httpOptions).pipe(
      tap(_ => console.log(`updated claim`+claim)),
      catchError(this.handleError<any>('updateClaim'))
    );
  }
  
  deleteClaim (id): Observable<Claim> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Claim>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted claim`)),
      catchError(this.handleError<Claim>('deleteClaim'))
    );
  }






}
