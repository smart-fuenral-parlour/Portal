import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Beneficiary } from './beneficiary';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/beneficiary";

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  
  getBeneficiary(id: number): Observable<Beneficiary> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Beneficiary>(url).pipe(
      tap(_ => console.log(`fetched beneficiary id=${id}`)),
      catchError(this.handleError<Beneficiary>(`getBeneficiary id=${id}`))
    );
  }
  



  createBeneficiary (beneficiary): Observable<Beneficiary> {
    return this.http.post<Beneficiary>(apiUrl, beneficiary, httpOptions).pipe(
      tap((beneficiary: Beneficiary) => console.log(`added beneficiary w/`+beneficiary)),
      catchError(this.handleError<Beneficiary>('addBeneficiary'))
    );
  }
  
  updateBeneficiary (id, beneficiary): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, beneficiary, httpOptions).pipe(
      tap(_ => console.log(`updated beneficiary`+beneficiary)),
      catchError(this.handleError<any>('updateBeneficiary'))
    );
  }
  
  deleteBeneficiary (id): Observable<Beneficiary> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Beneficiary>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted beneficiary`)),
      catchError(this.handleError<Beneficiary>('deleteBeneficiary'))
    );
  }






}
