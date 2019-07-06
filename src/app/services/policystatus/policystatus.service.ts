import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Policystatus } from './policystatus';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/policystatus";

@Injectable({
  providedIn: 'root'
})
export class PolicystatusService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getPolicystatuss (): Observable<Policystatus[]> {
    return this.http.get<Policystatus[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched policystatuss')),
        catchError(this.handleError('getPolicystatuss', []))
      );
  }
  
  getPolicystatus(id: number): Observable<Policystatus> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Policystatus>(url).pipe(
      tap(_ => console.log(`fetched policystatus id=${id}`)),
      catchError(this.handleError<Policystatus>(`getPolicystatus id=${id}`))
    );
  }
  



  createPolicystatus (policystatus): Observable<Policystatus> {
    return this.http.post<Policystatus>(apiUrl, policystatus, httpOptions).pipe(
      tap((policystatus: Policystatus) => console.log(`added policystatus w/`+policystatus)),
      catchError(this.handleError<Policystatus>('addPolicystatus'))
    );
  }
  
  updatePolicystatus (id, policystatus): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, policystatus, httpOptions).pipe(
      tap(_ => console.log(`updated policystatus`+policystatus)),
      catchError(this.handleError<any>('updatePolicystatus'))
    );
  }
  
  deletePolicystatus (id): Observable<Policystatus> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Policystatus>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted policystatus`)),
      catchError(this.handleError<Policystatus>('deletePolicystatus'))
    );
  }






}
