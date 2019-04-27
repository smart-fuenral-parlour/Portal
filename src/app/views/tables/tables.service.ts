import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class TablesService {

  constructor(private http: HttpClient) {}

  public StartNinteLeaveDetailsx(usersData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    const body = JSON.stringify(usersData);
     // tslint:disable-next-line:max-line-length
     return this.http.post('https://npn-082010.workflowcloud.com/api/v1/workflow/published/d58256c6-fa84-4a7a-bc08-e9c9e6190840/instances?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJOV0MiLCJ3b3JrZmxvd0lkIjoiZDU4MjU2YzYtZmE4NC00YTdhLWJjMDgtZTljOWU2MTkwODQwIiwidGVuYW50SWQiOiI3ZmMyNmY0MC1hYThmLTRiMTQtYTY3Mi1kYWM4NmQzMWRlMjciLCJpYXQiOjE1NTYyOTI5ODN9.Ewjarfa2jrRRs-Ki-EYH9SgAn2kb4UGRGvCo-argqI8', body , httpOptions) .pipe(

    );
  }
  public postLeaveToDb(usersData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    const body = JSON.stringify(usersData);
    return this.http.post('https://sktleaveapi.herokuapp.com/api/leaveRequesteds/', body , httpOptions) .pipe(

    );
}
}
