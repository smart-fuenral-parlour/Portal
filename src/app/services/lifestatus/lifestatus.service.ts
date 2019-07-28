import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Lifestatus } from './lifestatus';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

/**
 * 
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/lifestatus";
 */

const apiUrl = "http://greenlinks1.dedicated.co.za:3000/api/Lifestatuses";

@Injectable({
  providedIn: 'root'
})
export class LifestatusService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  
  getLifestatus(id: number): Observable<Lifestatus> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Lifestatus>(url).pipe(
      tap(_ => console.log(`fetched lifestatus id=${id}`)),
      catchError(this.handleError<Lifestatus>(`getLifestatus id=${id}`))
    );
  }
  



  createLifestatus (lifestatus): Observable<Lifestatus> {
    return this.http.post<Lifestatus>(apiUrl, lifestatus, httpOptions).pipe(
      tap((lifestatus: Lifestatus) => console.log(`added lifestatus w/`+lifestatus)),
      catchError(this.handleError<Lifestatus>('addLifestatus'))
    );
  }
  
  updateLifestatus (id, lifestatus): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, lifestatus, httpOptions).pipe(
      tap(_ => console.log(`updated lifestatus`+lifestatus)),
      catchError(this.handleError<any>('updateLifestatus'))
    );
  }
  
  deleteLifestatus (id): Observable<Lifestatus> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Lifestatus>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted lifestatus`)),
      catchError(this.handleError<Lifestatus>('deleteLifestatus'))
    );
  }






}
