import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Extratype } from './extratype';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/extratype";

@Injectable({
  providedIn: 'root'
})
export class ExtratypeService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  
  getExtratype(id: number): Observable<Extratype> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Extratype>(url).pipe(
      tap(_ => console.log(`fetched extratype id=${id}`)),
      catchError(this.handleError<Extratype>(`getExtratype id=${id}`))
    );
  }
  



  createExtratype (extratype): Observable<Extratype> {
    return this.http.post<Extratype>(apiUrl, extratype, httpOptions).pipe(
      tap((extratype: Extratype) => console.log(`added extratype w/`+extratype)),
      catchError(this.handleError<Extratype>('addExtratype'))
    );
  }
  
  updateExtratype (id, extratype): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, extratype, httpOptions).pipe(
      tap(_ => console.log(`updated extratype`+extratype)),
      catchError(this.handleError<any>('updateExtratype'))
    );
  }
  
  deleteExtratype (id): Observable<Extratype> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Extratype>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted extratype`)),
      catchError(this.handleError<Extratype>('deleteExtratype'))
    );
  }






}
