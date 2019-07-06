import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Policytype } from './policytype';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/policytype";
const getpolicytypebyageUrl = "http://greenlinks1.dedicated.co.za:3002/api/getpolicytypebyage";

@Injectable({
  providedIn: 'root'
})
export class PolicytypeService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getPolicytypes (): Observable<Policytype[]> {
    return this.http.get<Policytype[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched policytypes')),
        catchError(this.handleError('getPolicytypes', []))
      );
  }
  
  getPolicytype(id: number): Observable<Policytype> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Policytype>(url).pipe(
      tap(_ => console.log(`fetched policytype id=${id}`)),
      catchError(this.handleError<Policytype>(`getPolicytype id=${id}`))
    );
  }
  

  getPolicytypebyage(id: number): Observable<Policytype> {
    const url = `${getpolicytypebyageUrl}/${id}`;
    return this.http.get<Policytype>(getpolicytypebyageUrl).pipe(
      tap(_ => console.log(`fetched policytype id=${id}`)),
      catchError(this.handleError<Policytype>(`getPolicytype id=${id}`))
    );
  }
  

  

  createPolicytype (policytype): Observable<Policytype> {
    return this.http.post<Policytype>(apiUrl, policytype, httpOptions).pipe(
      tap((policytype: Policytype) => console.log(`added policytype w/`+policytype)),
      catchError(this.handleError<Policytype>('addPolicytype'))
    );
  }
  
  updatePolicytype (id, policytype): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, policytype, httpOptions).pipe(
      tap(_ => console.log(`updated policytype`+policytype)),
      catchError(this.handleError<any>('updatePolicytype'))
    );
  }
  
  deletePolicytype (id): Observable<Policytype> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Policytype>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted policytype`)),
      catchError(this.handleError<Policytype>('deletePolicytype'))
    );
  }






}
