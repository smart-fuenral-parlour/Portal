import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from './user';
import { Count } from '../count/count'
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


const apiUrl = "http://greenlinks1.dedicated.co.za:3000/api/Systemusers";
const loginUrl = "http://greenlinks1.dedicated.co.za:3000/api/Systemusers/findOne?filter=%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22name%22%3A%20%22tebogo%22%7D%2C%7B%22password%22%3A%20%2211111%22%7D%5D%20%7D%20%7D"
const useremailUrl = "http://greenlinks1.dedicated.co.za:3000/api/Systemusers/count?where=%7B%22email%22%3A%20%22tebo2%40gmail.com%22%7D";



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


  loginUser (username,password): Observable<User[]> {
                                  
    return this.http.get<User[]>('http://greenlinks1.dedicated.co.za:3000/api/Systemusers?filter=%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22name%22%3A%20%22'+username+'%22%7D%2C%7B%22password%22%3A%20%22'+password+'%22%7D%5D%20%7D%20%7D    ')
    .pipe(
      tap(_ => console.log('loginUser')),
      catchError(this.handleError('loginUser'))
    );
  }


  // tebo2%40gmail.com
  checkUserEmail(email: string): Observable<Count> {
    return this.http.get<Count>('http://greenlinks1.dedicated.co.za:3000/api/Systemusers/count?where=%7B%22email%22%3A%20%22'+email+'%22%7D')
      .pipe(
        tap(_ => console.log('check User Email')),
        catchError(this.handleError('checkUserEmail'))
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
    return this.http.patch(url, user, httpOptions).pipe(
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
