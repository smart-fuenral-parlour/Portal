import { Component, OnInit } from '@angular/core';
import { TablesService } from '../tables.service';
import { AdalService } from 'adal-angular4';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-leavedetails',
  templateUrl: './leavedetails.component.html',
  styleUrls: ['./leavedetails.component.scss'],
  providers: [TablesService]
})

export class LeavedetailsComponent implements OnInit {

  public email: any;
  public fullnames: any;
  public ImageUpload: string | undefined;
  public currentUser: any;
  public siteurl = window.location.origin;
  public approvedleave: any = [];
  public rejectedleave: any = [];
  public Pendingleaves: any = [];
  public LeaveDetails: any = [];
  public LeaveBalances: any = [];
  public editLeaveDetails: any = [];

  constructor(private httpClient: HttpClient, private adalSvc: AdalService) {
    // Display
    this.getLeave();
    this.getUserBalance();
    this.getAllApproveLeave();
    this.getAllRejectedLeave();
    this.getAllPendingLeave();
  }

  ngOnInit() {
    // Get current   user Details
    this.fullnames = this.adalSvc.userInfo.profile.name;
    this.email = this.adalSvc.userInfo.userName;

  }
  // Get current  users leave request details
  getLeave() {
    // Get current  user email
    const emails = this.adalSvc.userInfo.userName;
    // Get Method for current user leave request details
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter={"where":{"email":"' + emails + '"},"order":["startdate DESC"]}').subscribe((res: any[]) => {
      // Asign Results to leavedetails variable
      this.LeaveDetails = res;

    });
  }
  // Get current  user Leave Types Balance
  getUserBalance() {
    // Get current  user email
    const emails = this.adalSvc.userInfo.userName;
    // Get Method for current user  Leave Types Balance
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaves?filter={"where":{"email":"' + emails + '"}}').subscribe((res: any[]) => {
      // Asign Results to LeaveBalances variable
      this.LeaveBalances = res;
    });
  }
  // Get All Approved leave
  getAllApproveLeave() {
    // Get current  user email
    const emails = this.adalSvc.userInfo.userName;
    // Get Method for All Approved Leave
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter={"where":{"email":"' + emails + '","status":"Approved"}}').subscribe((res: any[]) => {
      // Asign Results to approvedleave variable
      this.approvedleave = res;
    });
  }
  // Get All Rejected leave
  getAllRejectedLeave() {
    // Get current  user email
    const emails = this.adalSvc.userInfo.userName;
    // Get Method for All Rejected Leave
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter={"where":{"email":"' + emails + '","status":"Rejected"}}').subscribe((res: any[]) => {
      // Asign Results to rejectedleave variable
      this.rejectedleave = res;
    });
  }
  // Get All Pending leave
  getAllPendingLeave() {
    // Get current  user email
    const emails = this.adalSvc.userInfo.userName;
    // Get Method for All Pending Leave
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter={"where":{"email":"' + emails + '","status":"Pending"}}').subscribe((res: any[]) => {
      // Asign Results to approvedleave variable
      this.Pendingleaves = res;
    });
  }

  onSelect(selectedItem: any) {

    // Get Method for current user leave request details
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter={"where":{"id":"' + selectedItem.id + '"},"order":["startdate DESC"]}').subscribe((res: any[]) => {
      // Asign Results to leavedetails variable
      this.editLeaveDetails = res[0];
      alert(JSON.stringify(this.editLeaveDetails));
    });
  }

}

