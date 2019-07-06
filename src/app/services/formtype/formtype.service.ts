import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Formtype } from './formtype';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/formtype";

@Injectable({
  providedIn: 'root'
})
export class FormtypeService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  
  getFormtype(id: number): Observable<Formtype> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Formtype>(url).pipe(
      tap(_ => console.log(`fetched formtype id=${id}`)),
      catchError(this.handleError<Formtype>(`getFormtype id=${id}`))
    );
  }
  



  createFormtype (formtype): Observable<Formtype> {
    return this.http.post<Formtype>(apiUrl, formtype, httpOptions).pipe(
      tap((formtype: Formtype) => console.log(`added formtype w/`+formtype)),
      catchError(this.handleError<Formtype>('addFormtype'))
    );
  }
  
  updateFormtype (id, formtype): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, formtype, httpOptions).pipe(
      tap(_ => console.log(`updated formtype`+formtype)),
      catchError(this.handleError<any>('updateFormtype'))
    );
  }
  
  deleteFormtype (id): Observable<Formtype> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Formtype>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted formtype`)),
      catchError(this.handleError<Formtype>('deleteFormtype'))
    );
  }






}
