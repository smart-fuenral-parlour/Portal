import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Informant } from './informant';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/informant";

@Injectable({
  providedIn: 'root'
})
export class InformantService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  
  getInformant(id: number): Observable<Informant> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Informant>(url).pipe(
      tap(_ => console.log(`fetched informant id=${id}`)),
      catchError(this.handleError<Informant>(`getInformant id=${id}`))
    );
  }
  



  createInformant (informant): Observable<Informant> {
    return this.http.post<Informant>(apiUrl, informant, httpOptions).pipe(
      tap((informant: Informant) => console.log(`added informant w/`+informant)),
      catchError(this.handleError<Informant>('addInformant'))
    );
  }
  
  updateInformant (id, informant): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, informant, httpOptions).pipe(
      tap(_ => console.log(`updated informant`+informant)),
      catchError(this.handleError<any>('updateInformant'))
    );
  }
  
  deleteInformant (id): Observable<Informant> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Informant>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted informant`)),
      catchError(this.handleError<Informant>('deleteInformant'))
    );
  }






}
