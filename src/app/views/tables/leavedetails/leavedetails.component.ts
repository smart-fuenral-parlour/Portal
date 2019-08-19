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
  buttonDisable: any
  ApprovedpageNo = 1
  limitFilter = 10

  //page number  
  pageNo = 1
  ApprovedPageNo = 1
  RejectedPageNo = 1
  PendingPageNo = 1

  // total number of pages on leaves
  totalPageNo = 1
  ApprovedTotalPageNo = 1
  RejectedTotalPageNo = 1
  PendingTotalPageNo = 1

  buttonActiveClass = ''
  activeTab = 0

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


    //getting total number of pages of all leave requests
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where=%7B%22email%22%3A%20%22' + this.email + '%22%7D').subscribe((res: any) => {


      if (res.count > 0) {

        if (res.count % this.limitFilter > 0 && res.count % this.limitFilter < 5) {
          this.totalPageNo = parseInt(((res.count / this.limitFilter) + 1).toFixed(0));
        } else {
          this.totalPageNo = parseInt((res.count / this.limitFilter).toFixed(0));
        }

        if (this.totalPageNo <= 1) {

          // disables next and prev buttons if total number of page is 1
          this.totalPageNo = 1
          this.buttonDisable = document.querySelector('#fast_forward')
          this.buttonDisable.disabled = true
          this.buttonDisable = document.querySelector('#fast_rewind')
          this.buttonDisable.disabled = true
          this.buttonDisable = document.querySelector('#first_page')
          this.buttonDisable.disabled = true
          this.buttonDisable = document.querySelector('#last_page')
          this.buttonDisable.disabled = true

        }


      } else {

        // disable next and prev buttons if number of leaves are 0
        this.totalPageNo = 1;
        this.buttonDisable = document.querySelector('#fast_forward')
        this.buttonDisable.disabled = true
        this.buttonDisable = document.querySelector('#fast_rewind')
        this.buttonDisable.disabled = true
        this.buttonDisable = document.querySelector('#first_page')
        this.buttonDisable.disabled = true
        this.buttonDisable = document.querySelector('#last_page')
        this.buttonDisable.disabled = true

      }

    });



    //getting total number of pages of approved leave
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where=%7B%22and%22%3A%5B%7B%22email%22%3A%20%22' + this.email + '%22%7D%2C%7B%22status%22%3A%20%22Approved%22%7D%5D%20%7D').subscribe((res: any) => {


      if (res.count > 0) {

        if (res.count % this.limitFilter > 0 && res.count % this.limitFilter < 5) {

          this.ApprovedTotalPageNo = parseInt(((res.count / this.limitFilter) + 1).toFixed(0));
        } else {

          this.ApprovedTotalPageNo = parseInt((res.count / this.limitFilter).toFixed(0));
        }

        if (this.ApprovedTotalPageNo <= 1) {

          // disables next and prev buttons if total number of page is 1
          this.ApprovedTotalPageNo = 1
          this.buttonDisable = document.querySelector('#approved_fast_forward')
          this.buttonDisable.disabled = true
          this.buttonDisable = document.querySelector('#approved_fast_rewind')
          this.buttonDisable.disabled = true
          this.buttonDisable = document.querySelector('#approved_first_page')
          this.buttonDisable.disabled = true
          this.buttonDisable = document.querySelector('#approved_last_page')
          this.buttonDisable.disabled = true

        }


      } else {

        // disable next and prev buttons if number of approved leaves are 0
        this.ApprovedTotalPageNo = 1;
        this.buttonDisable = document.querySelector('#approved_fast_forward')
        this.buttonDisable.disabled = true
        this.buttonDisable = document.querySelector('#approved_fast_rewind')
        this.buttonDisable.disabled = true
        this.buttonDisable = document.querySelector('#approved_first_page')
        this.buttonDisable.disabled = true
        this.buttonDisable = document.querySelector('#approved_last_page')
        this.buttonDisable.disabled = true
      }

    });



    //getting total number of pages for pending leaves
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where=%7B%22and%22%3A%5B%7B%22email%22%3A%20%22' + this.email + '%22%7D%2C%7B%22status%22%3A%20%22Pending%22%7D%5D%20%7D').subscribe((res: any) => {


      if (res.count > 0) {


        if (res.count % this.limitFilter > 0 && res.count % this.limitFilter < 5) {

          this.PendingTotalPageNo = parseInt(((res.count / this.limitFilter) + 1).toFixed(0));
        } else {

          this.PendingTotalPageNo = parseInt((res.count / this.limitFilter).toFixed(0));
        }

        if (this.PendingTotalPageNo <= 1) {

          // disables next and prev buttons if total number of page is 1
          this.PendingTotalPageNo = 1
          this.buttonDisable = document.querySelector('#pending_first_page')
          this.buttonDisable.disabled = true
          this.buttonDisable = document.querySelector('#pending_fast_rewind')
          this.buttonDisable.disabled = true
          this.buttonDisable = document.querySelector('#pending_fast_forward')
          this.buttonDisable.disabled = true
          this.buttonDisable = document.querySelector('#pending_last_page')
          this.buttonDisable.disabled = true

        }


      } else {

        // disable next and prev buttons if number of approved leaves are 0
        this.PendingTotalPageNo = 1;
        this.buttonDisable = document.querySelector('#pending_first_page')
        this.buttonDisable.disabled = true
        this.buttonDisable = document.querySelector('#pending_fast_rewind')
        this.buttonDisable.disabled = true
        this.buttonDisable = document.querySelector('#pending_fast_forward')
        this.buttonDisable.disabled = true
        this.buttonDisable = document.querySelector('#pending_last_page')
        this.buttonDisable.disabled = true
      }

    });


    //getting total number of pages for rejected leaves
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where=%7B%22and%22%3A%5B%7B%22email%22%3A%20%22' + this.email + '%22%7D%2C%7B%22status%22%3A%20%22Rejected%22%7D%5D%20%7D').subscribe((res: any) => {


      if (res.count > 0) {


        if (res.count % this.limitFilter > 0 && res.count % this.limitFilter < 5) {

          this.RejectedTotalPageNo = parseInt(((res.count / this.limitFilter) + 1).toFixed(0));
        } else {

          this.RejectedTotalPageNo = parseInt((res.count / this.limitFilter).toFixed(0));
        }

        if (this.RejectedTotalPageNo <= 1) {

          // disables next and prev buttons if total number of page is 1
          this.RejectedTotalPageNo = 1
          this.buttonDisable = document.querySelector('#rejected_first_page')
          this.buttonDisable.disabled = true
          this.buttonDisable = document.querySelector('#rejected_fast_rewind')
          this.buttonDisable.disabled = true
          this.buttonDisable = document.querySelector('#rejected_fast_forward')
          this.buttonDisable.disabled = true
          this.buttonDisable = document.querySelector('#rejected_last_page')
          this.buttonDisable.disabled = true

        }


      } else {

        // disable next and prev buttons if number of approved leaves are 0
        this.RejectedTotalPageNo = 1;
        this.buttonDisable = document.querySelector('#rejected_first_page')
        this.buttonDisable.disabled = true
        this.buttonDisable = document.querySelector('#rejected_fast_rewind')
        this.buttonDisable.disabled = true
        this.buttonDisable = document.querySelector('#rejected_fast_forward')
        this.buttonDisable.disabled = true
        this.buttonDisable = document.querySelector('#rejected_last_page')
        this.buttonDisable.disabled = true
      }

    });



    /**
     * total leave request 
     * https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where=%7B%22email%22%3A%20%22tmollootimile%40skhomotech.co.za%22%7D
     * 
     * total leave approved
     * https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where=%7B%22and%22%3A%5B%7B%22email%22%3A%20%22tmollootimile%40skhomotech.co.za%22%7D%2C%7B%22status%22%3A%20%22Approved%22%7D%5D%20%7D
         this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Approved&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
     * 
     * 
     * total leave Rejected
     * https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where=%7B%22and%22%3A%5B%7B%22email%22%3A%20%22tmollootimile%40skhomotech.co.za%22%7D%2C%7B%22status%22%3A%20%22Rejected%22%7D%5D%20%7D
        this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Rejected&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
     * 
     *  
     * total leave Pending
     * https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where=%7B%22and%22%3A%5B%7B%22email%22%3A%20%22tmollootimile%40skhomotech.co.za%22%7D%2C%7B%22status%22%3A%20%22Pending%22%7D%5D%20%7D
        this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Pending&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
     * 
     * 
     */
  }

  // Get current  users leave request details
  getLeave() {
    // Get current  user email
    const emails = this.adalSvc.userInfo.userName;

    // Get Method for current user leave request details
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
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
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Approved&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
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
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Rejected&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
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
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Pending&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
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
    this.getLeaveSkipForward += this.limitFilter;
    const emails = this.adalSvc.userInfo.userName;
    // Get Method for current user leave request details
    // tslint:disable-next-line:max-line-length

    this.buttonDisable = document.querySelector('#fast_forward')
    this.buttonDisable.disabled = true

    console.log('Active Tab Index:' + this.activeTab)
    if (this.activeTab == 1) {
      // changed to pending tab
      this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Approved&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
        // Asign Results to leavedetails variable
        this.buttonDisable.disabled = false

        if (res.length > 0) {
          this.ApprovedPageNo++
          this.approvedleave = res;
        } else {

          this.getLeaveSkipForward -= this.limitFilter;
        }


      });

    } else
      if (this.activeTab == 2) {
        // changed to pending tab
        this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Pending&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
          // Asign Results to leavedetails variable
          this.buttonDisable.disabled = false

          if (res.length > 0) {
            this.PendingPageNo++
            this.Pendingleaves = res;
          } else {

            this.getLeaveSkipForward -= this.limitFilter;
          }


        });

      } else
        if (this.activeTab == 3) {
          // changed to pending tab
          this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Rejected&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
            // Asign Results to leavedetails variable
            this.buttonDisable.disabled = false

            if (res.length > 0) {
              this.RejectedPageNo++
              this.rejectedleave = res;
            } else {

              this.getLeaveSkipForward -= this.limitFilter;
            }


          });

        } else {

          this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
            // Asign Results to leavedetails variable
            this.buttonDisable.disabled = false

            if (res.length > 0) {

              this.pageNo++
              this.LeaveDetails = res;

            } else {

              this.getLeaveSkipForward -= 2;

            }


          });

        }

  }

  getPrevousAlert() {
    //this.buttonActiveClass = 'btn btn-light'
    //skip count for query
    this.getLeaveSkipForward -= this.limitFilter;
    if (this.getLeaveSkipForward < 0) {
      this.getLeaveSkipForward = 0
    }
    this.buttonDisable = document.querySelector('#fast_rewind')
    this.buttonDisable.disabled = true

    const emails = this.adalSvc.userInfo.userName;
    // Get Method for current user leave request details
    // tslint:disable-next-line:max-line-length

    if (this.activeTab == 1) {
      // changed to pending tab

      this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Approved&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
        // Asign Results to leavedetails variable
        this.approvedleave = res;
        this.buttonDisable.disabled = false

        if (this.ApprovedPageNo > 1) {
          this.ApprovedPageNo--
        }

      });

    } else
      if (this.activeTab == 2) {
        // changed to pending tab

        this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Pending&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
          // Asign Results to leavedetails variable
          this.Pendingleaves = res;
          this.buttonDisable.disabled = false

          if (this.PendingPageNo > 1) {
            this.PendingPageNo--
          }

        });

      } else
        if (this.activeTab == 3) {
          // changed to pending tab

          this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Rejected&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
            // Asign Results to leavedetails variable
            this.rejectedleave = res;
            this.buttonDisable.disabled = false

            if (this.RejectedPageNo > 1) {
              this.RejectedPageNo--
            }

          });

        } else {


          this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
            // Asign Results to leavedetails variable
            this.LeaveDetails = res;
            this.buttonDisable.disabled = false

            if (this.pageNo > 1) {
              this.pageNo--
            }

          });

        }


  }

  getFirstAlert() {
    //skip count for query
    this.getLeaveSkipForward = 0;


    const emails = this.adalSvc.userInfo.userName;
    // Get Method for current user leave request details
    // tslint:disable-next-line:max-line-length

    
    if (this.activeTab == 1) {
      // changed to pending tab

      this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Approved&filter[skip]=0&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
        // Asign Results to leavedetails variable
        this.approvedleave = res;
        this.buttonDisable.disabled = false

        this.ApprovedPageNo = 1


      });

    } else
      if (this.activeTab == 2) {
        // changed to pending tab

        this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Pending&filter[skip]=0&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
          // Asign Results to leavedetails variable
          this.Pendingleaves = res;
          this.buttonDisable.disabled = false

          this.PendingPageNo = 1


        });

      } else
        if (this.activeTab == 3) {
          // changed to pending tab

          this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Rejected&filter[skip]=0&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
            // Asign Results to leavedetails variable
            this.rejectedleave = res;
            this.buttonDisable.disabled = false


            this.RejectedPageNo = 1


          });

        } else {


          this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + emails + '&filter[limit]=' + this.limitFilter + '&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
            // Asign Results to leavedetails variable
            this.LeaveDetails = res;
            this.buttonDisable.disabled = false


            this.pageNo = 1

          });

        }


  }

  getLastAlert() {
    console.log('goto last page')
  }

  changeTab(tab: any) {

    this.activeTab = tab
    this.getLeaveSkipForward = 0

    if(tab == 1){
      console.log('Approved Leaves page')
    } else 
    if(tab == 2){
      console.log('Pending Leaves page')
    } else
    if(tab == 3){
      console.log('Rejected Leaves page')
    } else
    if(tab == 4){
      console.log('Leave Balance')
    } else{
      console.log('Leaves Details page')
    } 


/*
    if(this.pageNo > 1){
      
    
      if (tab== 1) {
        // changed to pending tab
  
        this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + this.email + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Approved&filter[skip]=0&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
          // Asign Results to leavedetails variable
          this.approvedleave = res;  
          this.pageNo = 1
  
  
        });
  
      } else
        if (tab == 2) {
          // changed to pending tab
  
          this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + this.email + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Pending&filter[skip]=0&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
            // Asign Results to leavedetails variable
            this.Pendingleaves = res;
            this.pageNo = 1  
  
          });
  
        } else
          if (tab == 3) {
            // changed to pending tab
  
            this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + this.email + '&filter[limit]=' + this.limitFilter + '&filter[where][status]=Rejected&filter[skip]=0&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
              // Asign Results to leavedetails variable
              this.rejectedleave = res;
              this.pageNo = 1  
  
            });
  
          } else {
  
  
            this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds?filter[where][email]=' + this.email + '&filter[limit]=' + this.limitFilter + '&filter[skip]=' + this.getLeaveSkipForward + '&filter[order]=startdate%20DESC').subscribe((res: any[]) => {
              // Asign Results to leavedetails variable
              this.LeaveDetails = res;
              this.pageNo = 1
  
            });
  
          }
  
  

    }
    */

    console.log(tab)
  }

}

