import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Action } from './action';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/action";

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getActions (): Observable<Action[]> {
    return this.http.get<Action[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched actions')),
        catchError(this.handleError('getActions', []))
      );
  }
  
  getAction(id: number): Observable<Action> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Action>(url).pipe(
      tap(_ => console.log(`fetched action id=${id}`)),
      catchError(this.handleError<Action>(`getAction id=${id}`))
    );
  }
  



  createAction (action): Observable<Action> {
    return this.http.post<Action>(apiUrl, action, httpOptions).pipe(
      tap((action: Action) => console.log(`added action w/`+action)),
      catchError(this.handleError<Action>('addAction'))
    );
  }
  
  updateAction (id, action): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, action, httpOptions).pipe(
      tap(_ => console.log(`updated action`+action)),
      catchError(this.handleError<any>('updateAction'))
    );
  }
  
  deleteAction (id): Observable<Action> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Action>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted action`)),
      catchError(this.handleError<Action>('deleteAction'))
    );
  }






}
