import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { HttpClient } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-emplyees',
  templateUrl: './emplyees.component.html',
  styleUrls: ['./emplyees.component.scss']
})
export class EmplyeesComponent implements OnInit {
  public email: any;
  public fullnames: any;
  public ImageUpload: string | undefined;
  public currentUser: any;
  public siteurl = window.location.origin;
  private approvedleave  = [];
  private allemployees  = [];
  private rejectedleave  = [];
  private Pendingleaves  = [];
  private allLeaves  = [];
  constructor(private httpClient: HttpClient, private adalSvc: AdalService) {
    // Display
    this.getAllLeave();
    this.getAllEmployees();
    this.getAllApproveLeave();
    this.getAllRejectedLeave();
    this.getAllPendingLeave();
      }

  ngOnInit() {
    // Get current   user Details
    this.fullnames = this.adalSvc.userInfo.profile.name;
    this.email = this.adalSvc.userInfo.userName;

  }

  // Get All Employees
    getAllEmployees() {
      // Get current  user email
      const emails = this.adalSvc.userInfo.userName;
      // Get Method for All Employees
      // tslint:disable-next-line:max-line-length
      this.httpClient.get('https://sktleaveapi.herokuapp.com/api/sktleaveusers').subscribe((res: any[]) => {
        // Asign Results to allemployees variable
      this.allemployees = res;
      });
      }
      // Get All Approved leave
    getAllApproveLeave() {
      // Get current  user email
      const emails = this.adalSvc.userInfo.userName;
      // Get Method for All Approved Leave
      // tslint:disable-next-line:max-line-length
      this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter={"where":{"status":"Approved"}}').subscribe((res: any[]) => {
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
      this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter={"where":{"status":"Rejected"}}').subscribe((res: any[]) => {
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
      this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter={"where":{"status":"Pending"}}').subscribe((res: any[]) => {
        // Asign Results to approvedleave variable
      this.Pendingleaves = res;
      });
      }
         // Get All  leaves
    getAllLeave() {
      // Get current  user email
      const emails = this.adalSvc.userInfo.userName;
      // Get Method for All  Leaves
      // tslint:disable-next-line:max-line-length
      this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds').subscribe((res: any[]) => {
        // Asign Results to allLeaves variable
      this.allLeaves = res;
      });
      }
  }


