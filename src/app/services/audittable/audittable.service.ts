import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Audittable } from './audittable';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/audittable";

@Injectable({
  providedIn: 'root'
})
export class AudittableService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getAudittables (): Observable<Audittable[]> {
    return this.http.get<Audittable[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched audittables')),
        catchError(this.handleError('getAudittables', []))
      );
  }
  
  getAudittable(id: number): Observable<Audittable> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Audittable>(url).pipe(
      tap(_ => console.log(`fetched audittable id=${id}`)),
      catchError(this.handleError<Audittable>(`getAudittable id=${id}`))
    );
  }
  



  createAudittable (audittable): Observable<Audittable> {
    return this.http.post<Audittable>(apiUrl, audittable, httpOptions).pipe(
      tap((audittable: Audittable) => console.log(`added audittable w/`+audittable)),
      catchError(this.handleError<Audittable>('addAudittable'))
    );
  }
  
  updateAudittable (id, audittable): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, audittable, httpOptions).pipe(
      tap(_ => console.log(`updated audittable`+audittable)),
      catchError(this.handleError<any>('updateAudittable'))
    );
  }
  
  deleteAudittable (id): Observable<Audittable> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Audittable>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted audittable`)),
      catchError(this.handleError<Audittable>('deleteAudittable'))
    );
  }






}
