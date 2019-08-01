import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { User, LoginUser } from './user';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


/**  "email": "thabangM@gmail.com",
  "name": "Thabang",
  "password": "56545",
  "role": "Admin",
  "surname": "Mabambi"
 * 
const apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/user";
const loginUrl = "http://greenlinks1.dedicated.co.za:3000/api/login"
 */


const apiUrl = "http://greenlinks1.dedicated.co.za:3000/api/Users";
const loginUrl = "http://greenlinks1.dedicated.co.za:3000/api/login"


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  loginUser (user): Observable<LoginUser> {
    return this.http.post<LoginUser>(loginUrl, user, httpOptions).pipe(
      tap((user: LoginUser) => console.log(`added user w/`+user)),
      catchError(this.handleError<LoginUser>('addUser'))
    );
  }





  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched users')),
        catchError(this.handleError('getUsers', []))
      );
  }
  
  getUser(id: number): Observable<User> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }
  



  createUser (user): Observable<User> {
    return this.http.post<User>(apiUrl, user, httpOptions).pipe(
      tap((user: User) => console.log(`added user w/`+user)),
      catchError(this.handleError<User>('addUser'))
    );
  }
  
  updateUser (id, user): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => console.log(`updated user`+user)),
      catchError(this.handleError<any>('updateUser'))
    );
  }
  
  deleteUser (id): Observable<User> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted user`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }






}
