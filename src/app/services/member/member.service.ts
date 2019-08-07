import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Member } from './member';
import { Count } from '../count/count'
import { Injectable } from '@angular/core';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


// XMLHttpRequest
const patchhttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'raw',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ' PATCH, GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  })
};

/**
 *
 * const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/member";
const getmemberbyidentitynumberUrl = "http://greenlinks1.dedicated.co.za:3002/api/getmemberbyidentitynumber";
const getmemberbymembershipnumberUrl = "http://greenlinks1.dedicated.co.za:3002/api/getmemberbymembershipnumber";
const getmemberbysurnameUrl = "http://greenlinks1.dedicated.co.za:3002/api/getmemberbysurname";
 */

const apiUrl = "http://greenlinks1.dedicated.co.za:3000/api/Members";
const getmemberbyidentitynumberUrl = "http://greenlinks1.dedicated.co.za:3002/api/getmemberbyidentitynumber";
const getmemberbymembershipnumberUrl = "http://greenlinks1.dedicated.co.za:3002/api/getmemberbymembershipnumber";
// wild card search  http://greenlinks1.dedicated.co.za:3000/api/Members/count?where=%7B%22membershipnumber%22%3A%20%22string%22%7D
const getmemberbysurnameUrl = "http://greenlinks1.dedicated.co.za:3000/api/Members?filter=%7B%22where%22%3A%7B%22surname%22%3A%7B%22like%22%3A%20%22%25ma%22%7D%7D%20%7D";
const checkEmailUrl = "http://greenlinks1.dedicated.co.za:3000/api/Members/count?where=%7B%22email%22%3A%20%22string%22%7D";
const checkmembershipnumberUrl = "http://greenlinks1.dedicated.co.za:3000/api/Members/count?where=%7B%22membershipnumber%22%3A%20%22string%22%7D";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getMembers (): Observable<Member[]> {
    return this.http.get<Member[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched members')),
        catchError(this.handleError('getMembers', []))
      );
  }
  
  getMemberbyidentitynumber (id: any): Observable<Member[]> {
    return this.http.get<Member[]>("http://greenlinks1.dedicated.co.za:3000/api/Members?filter=%7B%22where%22%3A%20%7B%22identitynumber%22%3A%20%22"+id+"%22%7D%20%7D")
      .pipe(
        tap(_ => console.log(`fetched member id=${id}`)),
        catchError(this.handleError(`getMemberbyidentitynumber id=${id}`))
      );
  }

    
  getMemberbymembershipnumber (membershipnumber: any): Observable<Member[]> {
    return this.http.get<Member[]>("http://greenlinks1.dedicated.co.za:3000/api/Members?filter=%7B%22where%22%3A%7B%22membershipnumber%22%3A%7B%22like%22%3A%20%22%25"+membershipnumber+"%25%22%7D%7D%20%7D")
      .pipe(
        tap(_ => console.log(`fetched member id=${membershipnumber}`)),
        catchError(this.handleError(`getMemberbymembershipnumber id=${membershipnumber}`))
      );
  }

  getMemberbysurname (surname: string): Observable<Member[]> {
    return this.http.get<Member[]>("http://greenlinks1.dedicated.co.za:3000/api/Members?filter=%7B%22where%22%3A%7B%22surname%22%3A%7B%22like%22%3A%20%22%25"+surname+"%25%22%7D%7D%20%7D")
      .pipe(
        tap(_ => console.log(`fetched member id=${surname}`)),
        catchError(this.handleError(`getMemberbysurname id=${surname}`))
      );
  }

    
  getMember(id: number): Observable<Member> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Member>(url).pipe(
      tap(_ => console.log(`fetched member id=${id}`)),
      catchError(this.handleError<Member>(`getMember id=${id}`))
    );
  }



    // check for existing Membership Number
    checkMembershipNumber(membershipnumber: string): Observable<Count> {
      return this.http.get<Count>('http://greenlinks1.dedicated.co.za:3000/api/Members/count?where=%7B%22membershipnumber%22%3A%20%22'+membershipnumber+'%22%7D')
        .pipe(
          tap(_ => console.log('check member membership number')),
          catchError(this.handleError('checkMembershipNumber'))
        );
    }


    // check for existing Member Email
    checkMemberEmail(email: string): Observable<Count> {
      return this.http.get<Count>('http://greenlinks1.dedicated.co.za:3000/api/Members/count?where=%7B%22email%22%3A%20%22'+email+'%22%7D')
        .pipe(
          tap(_ => console.log('check member email')),
          catchError(this.handleError('checkMemberEmail'))
        );
    }


  createMember (member): Observable<Member> {
    return this.http.post<Member>(apiUrl, member, httpOptions).pipe(
      tap((member: Member) => console.log(`added member w/`+member)),
      catchError(this.handleError<Member>('addMember'))
    );
  }


  
  updateMember (id, member): Observable<any> {

    const url = `${apiUrl}/${id}`;
    return this.http.patch(url, member, httpOptions).pipe(
      tap(_ => console.log(`updated member`+member)),
      catchError(this.handleError<any>('updateMember'))
    );
  }


  
  deleteMember (id): Observable<Member> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Member>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted member`)),
      catchError(this.handleError<Member>('deleteMember'))
    );
  }


/**
 *  OLD APIs
 * 
 *   
  getMemberbyidentitynumber(id: number): Observable<Members> {
    const url = `${getmemberbyidentitynumberUrl}/${id}`;
    return this.http.get<Members>(url).pipe(
      tap(_ => console.log(`fetched member id=${id}`)),
      catchError(this.handleError<Members>(`getMemberbyidentitynumber id=${id}`))
    );
  }

    
  getMemberbymembershipnumber(id: number): Observable<Members> {
    const url = `${getmemberbymembershipnumberUrl}/${id}`;
    return this.http.get<Members>(url).pipe(
      tap(_ => console.log(`fetched member id=${id}`)),
      catchError(this.handleError<Members>(`getMember id=${id}`))
    );
  }
 * 
 *   getMemberbysurname(id: number): Observable<Members> {
    const url = `${getmemberbysurnameUrl}/${id}`;
    return this.http.get<Members>(url).pipe(
      tap(_ => console.log(`fetched member id=${id}`)),
      catchError(this.handleError<Members>(`getMemberbysurname id=${id}`))
    );
  }

 * 
 *   
  updateMember (id, member): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, member, httpOptions).pipe(
      tap(_ => console.log(`updated member`+member)),
      catchError(this.handleError<any>('updateMember'))
    );
  }
 * 
  createMember (member): Observable<Member> {
    return this.http.post<Member>(apiUrl, member, httpOptions).pipe(
      tap((member: Member) => console.log(`added member w/`+member)),
      catchError(this.handleError<Member>('addMember'))
    );
  }
 */




}
