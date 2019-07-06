import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Extras } from './extras';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/extras";

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getExtrass (): Observable<Extras[]> {
    return this.http.get<Extras[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched extrass')),
        catchError(this.handleError('getExtrass', []))
      );
  }
  
  getExtras(id: number): Observable<Extras> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Extras>(url).pipe(
      tap(_ => console.log(`fetched extras id=${id}`)),
      catchError(this.handleError<Extras>(`getExtras id=${id}`))
    );
  }
  



  createExtras (extras): Observable<Extras> {
    return this.http.post<Extras>(apiUrl, extras, httpOptions).pipe(
      tap((extras: Extras) => console.log(`added extras w/`+extras)),
      catchError(this.handleError<Extras>('addExtras'))
    );
  }
  
  updateExtras (id, extras): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, extras, httpOptions).pipe(
      tap(_ => console.log(`updated extras`+extras)),
      catchError(this.handleError<any>('updateExtras'))
    );
  }
  
  deleteExtras (id): Observable<Extras> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Extras>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted extras`)),
      catchError(this.handleError<Extras>('deleteExtras'))
    );
  }






}
