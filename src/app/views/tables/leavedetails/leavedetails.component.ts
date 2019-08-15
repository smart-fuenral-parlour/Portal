import { Component, OnInit } from '@angular/core';
import { TablesService } from '../tables.service';
import { AdalService } from 'adal-angular4';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

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
  public selectedItem: any;
  public siteurl = window.location.origin;
  public approvedleave: any = [];
  public rejectedleave: any = [];
  public Pendingleaves: any = [];
  public LeaveDetails: any = [];
  public LeaveBalances: any = [];
  public editLeaveDetails: any = [];
  public startDate: any;
  public endDate: any;
  public getLeaveSkipForward: any = 0;
  startdate: string;
  enddate: string;
  nextButtonDisable = ''

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
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=2&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
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

  //Business day count function between two dates
  getBusinessDatesCount(startDate: any, endDate: any) {
    var count = 0;
    var curDate = startDate;
    while (curDate <= endDate) {
      var dayOfWeek = curDate.getDay();

      if (!((dayOfWeek == 6) || (dayOfWeek == 0)))
        count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }

  onSelect(selectedItem: any) {

    // Get Method for current user leave request details
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter={"where":{"id":"' + selectedItem.id + '"},"order":["startdate DESC"]}').subscribe((res: any[]) => {
      // Asign Results to leavedetails variable
      this.editLeaveDetails = res[0];
      //Edit start date
      var startdate = new Date(this.editLeaveDetails.startdate);
      var dd = ("0" + (startdate.getDate())).slice(-2);
      var mm = ("0" + (startdate.getMonth() + 1)).slice(-2);
      var yyyy = startdate.getFullYear();
      this.startdate = yyyy + '-' + mm + '-' + dd;
      $("#startdate").attr("value", this.startdate);
      //Edit end date
      var enddate = new Date(this.editLeaveDetails.enddate);
      var dd = ("0" + (enddate.getDate())).slice(-2);
      var mm = ("0" + (enddate.getMonth() + 1)).slice(-2);
      var yyyy = enddate.getFullYear();
      this.enddate = yyyy + '-' + mm + '-' + dd;
      $("#enddate").attr("value", this.enddate);
      //Calculate leave days

      $('#calculated').val(this.getBusinessDatesCount(new Date(this.editLeaveDetails.startdate), new Date(this.editLeaveDetails.enddate)));
      //Edit reasonstartdate
      $('#reason').val(this.editLeaveDetails.reason);
      //Edit leave type
      $('#leavetype').val(this.editLeaveDetails.leaveType);
    });
  }
  calcLeaveDays() {
    //get startdate
    this.startDate = $('#startdate').val();

    //get enddate
    this.endDate = $('#enddate').val();
    //function calculate and allocate business days between the two dates
    $('#calculated').val(this.getBusinessDatesCount(new Date(this.startDate), new Date(this.endDate)));


  }
  getNextAlert() {
    //skip count for query
    this.getLeaveSkipForward += 2;
    const emails = this.adalSvc.userInfo.userName;
    // Get Method for current user leave request details
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=2&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
      // Asign Results to leavedetails variable
      if(res.length > 0){
        this.LeaveDetails = res;
        this.nextButtonDisable = 'disabled'
      } else {
        this.nextButtonDisable = 'disabled'
      }
      

    });

  }

  getPrevousAlert() {
    //skip count for query
    this.getLeaveSkipForward -= 2;
    if (this.getLeaveSkipForward < 0) {
      this.getLeaveSkipForward = 0
    }
    const emails = this.adalSvc.userInfo.userName;
    // Get Method for current user leave request details
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=2&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
      // Asign Results to leavedetails variable
      this.LeaveDetails = res;

    });

  }
}

