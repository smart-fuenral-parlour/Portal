import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Role } from './role';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getRoles (): Observable<Role[]> {
    return this.http.get<Role[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched roles')),
        catchError(this.handleError('getRoles', []))
      );
  }
  
  getRole(id: number): Observable<Role> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Role>(url).pipe(
      tap(_ => console.log(`fetched role id=${id}`)),
      catchError(this.handleError<Role>(`getRole id=${id}`))
    );
  }
  



  createRole (role): Observable<Role> {
    return this.http.post<Role>(apiUrl, role, httpOptions).pipe(
      tap((role: Role) => console.log(`added role w/`+role)),
      catchError(this.handleError<Role>('addRole'))
    );
  }
  
  updateRole (id, role): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, role, httpOptions).pipe(
      tap(_ => console.log(`updated role`+role)),
      catchError(this.handleError<any>('updateRole'))
    );
  }
  
  deleteRole (id): Observable<Role> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Role>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted role`)),
      catchError(this.handleError<Role>('deleteRole'))
    );
  }






}
