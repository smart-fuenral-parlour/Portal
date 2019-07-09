import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Claimaudit } from './claimaudit';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/claimaudit";
const getclaimauditbyidclaimUrl = "http://greenlinks1.dedicated.co.za:3002/api/claimaudit";

@Injectable({
  providedIn: 'root'
})
export class ClaimauditService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getClaimaudits (): Observable<Claimaudit[]> {
    return this.http.get<Claimaudit[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched claimaudit')),
        catchError(this.handleError('getClaimaudits', []))
      );
  }

  
  
  getClaimaudit(id: number): Observable<Claimaudit> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Claimaudit>(url).pipe(
      tap(_ => console.log(`fetched claimaudit id=${id}`)),
      catchError(this.handleError<Claimaudit>(`getClaimaudit id=${id}`))
    );
  }

 
    
  getClaimauditbyidclaim(id: number): Observable<Claimaudit> {
    const url = `${getclaimauditbyidclaimUrl}/${id}`;
    return this.http.get<Claimaudit>(url).pipe(
      tap(_ => console.log(`fetched claimaudit id=${id}`)),
      catchError(this.handleError<Claimaudit>(`getClaimauditbyidclaim id=${id}`))
    );
  }
  



  createClaimaudit (claimaudit): Observable<Claimaudit> {
    return this.http.post<Claimaudit>(apiUrl, claimaudit, httpOptions).pipe(
      tap((claimaudit: Claimaudit) => console.log(`added claimaudit w/`+claimaudit)),
      catchError(this.handleError<Claimaudit>('addClaimaudit'))
    );
  }
  
  updateClaimaudit (id, claimaudit): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, claimaudit, httpOptions).pipe(
      tap(_ => console.log(`updated claimaudit`+claimaudit)),
      catchError(this.handleError<any>('updateClaimaudit'))
    );
  }
  
  deleteClaimaudit (id): Observable<Claimaudit> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Claimaudit>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted claimaudit`)),
      catchError(this.handleError<Claimaudit>('deleteClaimaudit'))
    );
  }






}
