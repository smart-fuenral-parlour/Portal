import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Policydetails } from './policydetails';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/policydetails";
const getpolicydetailsbyidmemberUrl = "http://greenlinks1.dedicated.co.za:3002/api/getpolicydetailsbyidmember";

@Injectable({
  providedIn: 'root'
})
export class PolicydetailsService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.  
      return of(result as T);
    };
  }


  getPolicydetails (): Observable<Policydetails[]> {
    return this.http.get<Policydetails[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched policydetailss')),
        catchError(this.handleError('getPolicydetailss', []))
      );
  }
  
  getPolicydetail(id: number): Observable<Policydetails> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Policydetails>(url).pipe(
      tap(_ => console.log(`fetched policydetails id=${id}`)),
      catchError(this.handleError<Policydetails>(`getPolicydetails id=${id}`))
    );
  }
  
  
  getPolicydetailbyidmember(id: number): Observable<Policydetails> {
    const url = `${getpolicydetailsbyidmemberUrl}/${id}`;
    return this.http.get<Policydetails>(url).pipe(
      tap(_ => console.log(`fetched policydetails id=${id}`)),
      catchError(this.handleError<Policydetails>(`getPolicydetails id=${id}`))
    );
  }


  createPolicydetails (policydetails): Observable<Policydetails> {
    return this.http.post<Policydetails>(apiUrl, policydetails, httpOptions).pipe(
      tap((policydetails: Policydetails) => console.log(`added policydetails w/`+policydetails)),
      catchError(this.handleError<Policydetails>('addPolicydetails'))
    );
  }
  
  updatePolicydetails (id, policydetails): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, policydetails, httpOptions).pipe(
      tap(_ => console.log(`updated policydetails`+policydetails)),
      catchError(this.handleError<any>('updatePolicydetails'))
    );
  }
  
  deletePolicydetails (id): Observable<Policydetails> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Policydetails>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted policydetails`)),
      catchError(this.handleError<Policydetails>('deletePolicydetails'))
    );
  }






}
