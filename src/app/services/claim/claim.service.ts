import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Claim } from './claim';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

/**
 * const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/claim";
const getclaimbyclaimstatusUrl = "http://greenlinks1.dedicated.co.za:3002/api/getclaimbyclaimstatus";
const getclaimbyidmemberUrl = "http://greenlinks1.dedicated.co.za:3002/api/getclaimbyidmember";
 */

const apiUrl = "http://greenlinks1.dedicated.co.za:3000/api/Claims";
const getclaimbyclaimstatusUrl = "http://greenlinks1.dedicated.co.za:3000/api/Claims?filter=%7B%22where%22%3A%20%7B%22idclaimstatus%22%3A%203%7D%20%7D";
const getclaimbyidmemberUrl = "http://greenlinks1.dedicated.co.za:3000/api/Claims?filter=%7B%22where%22%3A%20%7B%22idmember%22%3A%20666%7D%20%7D";

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getClaims (): Observable<Claim[]> {
    return this.http.get<Claim[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched claim')),
        catchError(this.handleError('getClaims', []))
      );
  }

  
  
  getClaim(id: number): Observable<Claim> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Claim>(url).pipe(
      tap(_ => console.log(`fetched claim id=${id}`)),
      catchError(this.handleError<Claim>(`getClaim id=${id}`))
    );
  }

  getClaimbyclaimstatus(id: number): Observable<Claim[]> {

    return this.http.get<Claim[]>('http://greenlinks1.dedicated.co.za:3000/api/Claims?filter=%7B%22where%22%3A%20%7B%22idclaimstatus%22%3A%20'+id+'%7D%20%7D')
    .pipe(
      tap(heroes => console.log('fetched claim by status')),
      catchError(this.handleError('getClaimbyclaimstatus', []))
    );

  }
  
  
  getClaimbyidmember(id: number): Observable<Claim[]> {

    return this.http.get<Claim[]>('http://greenlinks1.dedicated.co.za:3000/api/Claims?filter=%7B%22where%22%3A%20%7B%22idmember%22%3A%20'+id+'%7D%20%7D')
    .pipe(
      tap(heroes => console.log('fetched claim by status')),
      catchError(this.handleError('getClaimbyclaimstatus', []))
    );

    
  }


  createClaim (claim): Observable<Claim> {
    return this.http.post<Claim>(apiUrl, claim, httpOptions).pipe(
      tap((claim: Claim) => console.log(`added claim w/`+claim)),
      catchError(this.handleError<Claim>('addClaim'))
    );
  }

  
  updateClaim (id, claim): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.patch(url, claim, httpOptions).pipe(
      tap(_ => console.log(`updated claim `+claim)),
      catchError(this.handleError<any>('updateClaim'))
    );
  }

  
  deleteClaim (id): Observable<Claim> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Claim>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted claim`)),
      catchError(this.handleError<Claim>('deleteClaim'))
    );
  }


}

/**
 * 
 *   updateClaim (id, claim): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, claim, httpOptions).pipe(
      tap(_ => console.log(`updated claim`+claim)),
      catchError(this.handleError<any>('updateClaim'))
    );
  }
 * 
 *   getClaimbyclaimstatus(id: number): Observable<Claim[]> {
    const url = `${getclaimbyclaimstatusUrl}/${id}`;
    return this.http.get<Claim[]>(url).pipe(
      tap(_ => console.log(`fetched claim id=${id}`)),
      catchError(this.handleError<Claim[]>(`getClaimbyclaimstatus id=${id}`))
    );
  }
 * 
 */
