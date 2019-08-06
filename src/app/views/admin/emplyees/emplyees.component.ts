import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { HttpClient } from '@angular/common/http';
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
  public approvedleave: any = [];
  public allemployees: any = [];
  public rejectedleave: any = [];
  public Pendingleaves: any = [];
  public allLeaves: any = [];
  editLeaveDetails: any;
  startdate: string;
  enddate: string;
  public startDate: any;
  public endDate: any;
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

    // Get Method for All Employees
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/sktleaveusers').subscribe((res: any[]) => {
      // Asign Results to allemployees variable
      this.allemployees = res;
    });
  }
  // Get All Approved leave
  getAllApproveLeave() {

    // Get Method for All Approved Leave
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter={"where":{"status":"Approved"}}').subscribe((res: any[]) => {
      // Asign Results to approvedleave variable
      this.approvedleave = res;
    });
  }
  // Get All Rejected leave
  getAllRejectedLeave() {

    // Get Method for All Rejected Leave
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter={"where":{"status":"Rejected"}}').subscribe((res: any[]) => {
      // Asign Results to rejectedleave variable
      this.rejectedleave = res;
    });
  }
  // Get All Pending leave
  getAllPendingLeave() {

    // Get Method for All Pending Leave
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter={"where":{"status":"Pending"}}').subscribe((res: any[]) => {
      // Asign Results to approvedleave variable
      this.Pendingleaves = res;
    });
  }
  // Get All  leaves
  getAllLeave() {

    // Get Method for All  Leaves
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds').subscribe((res: any[]) => {
      // Asign Results to allLeaves variable
      this.allLeaves = res;
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
}


