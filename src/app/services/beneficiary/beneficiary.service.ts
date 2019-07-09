import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Beneficiary } from './beneficiary';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/beneficiary";
const beneficiarybyidmemberUrl = "http://greenlinks1.dedicated.co.za:3002/api/beneficiarybyidmember";

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


  getBeneficiaries (): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched Beneficiaries')),
        catchError(this.handleError('getBeneficiaries', []))
      );
  }
  
  getBeneficiary(id: number): Observable<Beneficiary> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Beneficiary>(url).pipe(
      tap(_ => console.log(`fetched Beneficiary id=${id}`)),
      catchError(this.handleError<Beneficiary>(`getBeneficiary id=${id}`))
    );
  }
  

  getBeneficiarybyidmember(id: number): Observable<Beneficiary[]> {
    const url = `${beneficiarybyidmemberUrl}/${id}`;
    return this.http.get<Beneficiary[]>(url).pipe(
      tap(_ => console.log(`fetched Beneficiary id=${id}`)),
      catchError(this.handleError<Beneficiary[]>(`getBeneficiary id=${id}`))
    );
  }

  


  createBeneficiary (Beneficiary): Observable<Beneficiary> {
    return this.http.post<Beneficiary>(apiUrl, Beneficiary, httpOptions).pipe(
      tap((Beneficiary: Beneficiary) => console.log(`added Beneficiary w/`+Beneficiary)),
      catchError(this.handleError<Beneficiary>('addBeneficiary'))
    );
  }

  
  updateBeneficiary (id, Beneficiary): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Beneficiary, httpOptions).pipe(
      tap(_ => console.log(`updated Beneficiary`+Beneficiary)),
      catchError(this.handleError<any>('updateBeneficiary'))
    );
  }
  
  deleteBeneficiary (id): Observable<Beneficiary> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Beneficiary>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Beneficiary`)),
      catchError(this.handleError<Beneficiary>('deleteBeneficiary'))
    );
  }






}
