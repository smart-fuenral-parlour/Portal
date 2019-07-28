import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Member, Members } from './member';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const patchhttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
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
const getmemberbysurnameUrl = "http://greenlinks1.dedicated.co.za:3002/api/getmemberbysurname";


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

    
  getMemberbysurname(id: number): Observable<Members> {
    const url = `${getmemberbysurnameUrl}/${id}`;
    return this.http.get<Members>(url).pipe(
      tap(_ => console.log(`fetched member id=${id}`)),
      catchError(this.handleError<Members>(`getMemberbysurname id=${id}`))
    );
  }

     
  getMemberbysurname1(id: number): Observable<Members> {
    const url = `${getmemberbysurnameUrl}/${id}`;
    return this.http.get<Members>(url).pipe(
      tap(_ => console.log(`fetched member id=${id}`)),
      catchError(this.handleError<Members>(`getMemberbysurname id=${id}`))
    );
  }

    
  getMember(id: number): Observable<Member> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Member>(url).pipe(
      tap(_ => console.log(`fetched member id=${id}`)),
      catchError(this.handleError<Member>(`getMember id=${id}`))
    );
  }


  createMember (member): Observable<Member> {
    return this.http.post<Member>(apiUrl, member, httpOptions).pipe(
      tap((member: Member) => console.log(`added member w/`+member)),
      catchError(this.handleError<Member>('addMember'))
    );
  }


  
  updateMembers (member): Observable<Member> {

    return this.http.patch<Member>(apiUrl, member, patchhttpOptions).pipe(
      tap((member: Member) => console.log(`updated member`+member)),
      catchError(this.handleError<Member>('updateMember'))
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
 * 
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
