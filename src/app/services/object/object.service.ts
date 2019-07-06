import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Object } from './object';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/object";

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getObjects (): Observable<Object[]> {
    return this.http.get<Object[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched objects')),
        catchError(this.handleError('getObjects', []))
      );
  }
  
  getObject(id: number): Observable<Object> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Object>(url).pipe(
      tap(_ => console.log(`fetched object id=${id}`)),
      catchError(this.handleError<Object>(`getObject id=${id}`))
    );
  }
  



  createObject (object): Observable<Object> {
    return this.http.post<Object>(apiUrl, object, httpOptions).pipe(
      tap((object: Object) => console.log(`added object w/`+object)),
      catchError(this.handleError<Object>('addObject'))
    );
  }
  
  updateObject (id, object): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, object, httpOptions).pipe(
      tap(_ => console.log(`updated object`+object)),
      catchError(this.handleError<any>('updateObject'))
    );
  }
  
  deleteObject (id): Observable<Object> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Object>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted object`)),
      catchError(this.handleError<Object>('deleteObject'))
    );
  }






}
