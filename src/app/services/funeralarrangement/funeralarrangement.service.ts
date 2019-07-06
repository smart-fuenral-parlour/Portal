import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Funeralarrangement } from './funeralarrangement';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/funeralarrangement";

@Injectable({
  providedIn: 'root'
})
export class FuneralarrangementService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getFuneralarrangements (): Observable<Funeralarrangement[]> {
    return this.http.get<Funeralarrangement[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched funeralarrangements')),
        catchError(this.handleError('getFuneralarrangements', []))
      );
  }
  
  getFuneralarrangement(id: number): Observable<Funeralarrangement> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Funeralarrangement>(url).pipe(
      tap(_ => console.log(`fetched funeralarrangement id=${id}`)),
      catchError(this.handleError<Funeralarrangement>(`getFuneralarrangement id=${id}`))
    );
  }
  



  createFuneralarrangement (funeralarrangement): Observable<Funeralarrangement> {
    return this.http.post<Funeralarrangement>(apiUrl, funeralarrangement, httpOptions).pipe(
      tap((funeralarrangement: Funeralarrangement) => console.log(`added funeralarrangement w/`+funeralarrangement)),
      catchError(this.handleError<Funeralarrangement>('addFuneralarrangement'))
    );
  }
  
  updateFuneralarrangement (id, funeralarrangement): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, funeralarrangement, httpOptions).pipe(
      tap(_ => console.log(`updated funeralarrangement`+funeralarrangement)),
      catchError(this.handleError<any>('updateFuneralarrangement'))
    );
  }
  
  deleteFuneralarrangement (id): Observable<Funeralarrangement> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Funeralarrangement>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted funeralarrangement`)),
      catchError(this.handleError<Funeralarrangement>('deleteFuneralarrangement'))
    );
  }






}
