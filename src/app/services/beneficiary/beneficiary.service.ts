import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Beneficiary } from './beneficiary';
import { Count } from '../count/count'
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

/**
 * 
 * const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/beneficiary";
const beneficiarybyidmemberUrl = "http://greenlinks1.dedicated.co.za:3002/api/beneficiarybyidmember";
 */

const apiUrl = "http://greenlinks1.dedicated.co.za:3000/api/Beneficiaries";
const beneficiarybyidmemberUrl = "http://greenlinks1.dedicated.co.za:3000/api/Beneficiaries?filter=%7B%22where%22%3A%20%7B%22idmember%22%3A%203%7D%20%7D";
const checkIdnumberUrl = "http://greenlinks1.dedicated.co.za:3000/api/Beneficiaries/count?where=%7B%22identitynumber%22%3A%20%22string%22%7D";

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

  
  // check if Beneficiary already exist
  checkBeneficiaryIdnumber(idnumber: string): Observable<Count> {
    return this.http.get<Count>('http://greenlinks1.dedicated.co.za:3000/api/Beneficiaries/count?where=%7B%22identitynumber%22%3A%20%22'+idnumber+'%22%7D')
      .pipe(
        tap(_ => console.log('check Beneficiary Idnumber')),
        catchError(this.handleError('checkBeneficiaryIdnumber'))
      );
  }
  

  getBeneficiarybyidmember(id: number): Observable<Beneficiary[]> {

    return this.http.get<Beneficiary[]>("http://greenlinks1.dedicated.co.za:3000/api/Beneficiaries?filter=%7B%22where%22%3A%20%7B%22idmember%22%3A%20"+id+"%7D%20%7D")
    .pipe(
      tap(_ => console.log(`fetched Beneficiary id=${id}`)),
      catchError(this.handleError(`getBeneficiarybyidmember id=${id}`))
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



/**  A single object beneficiary
 * OLD APIs
 * 
 * 
  getBeneficiarybyidmember(id: number): Observable<Beneficiary[]> {
    const url = `${beneficiarybyidmemberUrl}/${id}`;
    return this.http.get<Beneficiary[]>(url).pipe(
      tap(_ => console.log(`fetched Beneficiary id=${id}`)),
      catchError(this.handleError<Beneficiary[]>(`getBeneficiary id=${id}`))
    );
  }

 * 
 * 
  createBeneficiary (Beneficiary): Observable<Beneficiary> {
    return this.http.post<Beneficiary>(apiUrl, Beneficiary, httpOptions).pipe(
      tap((Beneficiary: Beneficiary) => console.log(`added Beneficiary w/`+Beneficiary)),
      catchError(this.handleError<Beneficiary>('addBeneficiary'))
    );
  }
 */





}
