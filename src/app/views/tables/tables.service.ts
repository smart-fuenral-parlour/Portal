import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class TablesService {

  constructor(private http: HttpClient) { }

  public StartNinteLeaveDetailsx(usersData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    const body = JSON.stringify(usersData);
    // tslint:disable-next-line:max-line-length
    return this.http.post('https://npn-082010.workflowcloud.com/api/v1/workflow/published/f9f47321-a0ea-42c7-8edc-976e1631b2fc/instances?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJOV0MiLCJ3b3JrZmxvd0lkIjoiZjlmNDczMjEtYTBlYS00MmM3LThlZGMtOTc2ZTE2MzFiMmZjIiwidGVuYW50SWQiOiI3ZmMyNmY0MC1hYThmLTRiMTQtYTY3Mi1kYWM4NmQzMWRlMjciLCJpYXQiOjE1NjM5OTAwMDd9.R3xRFg_Y2gpub4gvsJsPwed70ijmvgBdcpTbKbBcWzY', body, httpOptions).pipe(

    );
  }
  public postLeaveToDb(usersData: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    const body = JSON.stringify(usersData);
    return this.http.post('https://sktleaveapi.herokuapp.com/api/leaveRequesteds/', body, httpOptions).pipe(

    );
  }
}
