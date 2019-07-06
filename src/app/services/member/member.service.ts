import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Member } from './member';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/member";

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
  
  updateMember (id, member): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, member, httpOptions).pipe(
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






}