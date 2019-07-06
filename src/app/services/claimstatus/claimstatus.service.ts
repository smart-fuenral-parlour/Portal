import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Claimstatus } from './claimstatus';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/claimstatus";

@Injectable({
  providedIn: 'root'
})
export class ClaimstatusService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  
  getClaimstatus(id: number): Observable<Claimstatus> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Claimstatus>(url).pipe(
      tap(_ => console.log(`fetched claimstatus id=${id}`)),
      catchError(this.handleError<Claimstatus>(`getClaimstatus id=${id}`))
    );
  }
  



  createClaimstatus (claimstatus): Observable<Claimstatus> {
    return this.http.post<Claimstatus>(apiUrl, claimstatus, httpOptions).pipe(
      tap((claimstatus: Claimstatus) => console.log(`added claimstatus w/`+claimstatus)),
      catchError(this.handleError<Claimstatus>('addClaimstatus'))
    );
  }
  
  updateClaimstatus (id, claimstatus): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, claimstatus, httpOptions).pipe(
      tap(_ => console.log(`updated claimstatus`+claimstatus)),
      catchError(this.handleError<any>('updateClaimstatus'))
    );
  }
  
  deleteClaimstatus (id): Observable<Claimstatus> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Claimstatus>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted claimstatus`)),
      catchError(this.handleError<Claimstatus>('deleteClaimstatus'))
    );
  }






}
