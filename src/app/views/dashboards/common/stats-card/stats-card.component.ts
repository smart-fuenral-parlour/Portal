import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit {
  public email: any;
  public fullnames: any;
  public ImageUpload: string | undefined;
  public currentUser: any;
  public siteurl = window.location.origin;
  public allleave: any;
  public pending: any;
  public rejected: any;
  public approved: any;
  private approvecount: any = [];
  private rejectedcount: any = [];
  private pendingcount: any = [];
  private allleavestatuscount: any = [];
  constructor(private httpClient: HttpClient, private adalSvc: AdalService) {
    // Display
  this.getCountOfApprovedLeaves();
  this.getCountOfRejectedLeaves();
  this.getCountOfPendingLeaves();
  this.getCountOfALLLeaves();

  console.log('results', this.getCountOfApprovedLeaves());
  }

  ngOnInit() {
    // Get current   user Details
    this.fullnames = this.adalSvc.userInfo.profile.name;
    this.email = this.adalSvc.userInfo.userName;
  }
  // Get number of approved leaves for current user
  getCountOfApprovedLeaves() {
    // Get current  user email
    const emails = this.adalSvc.userInfo.userName;
    // Get Method for number of approved leaves
    if (emails === 'support@skhomotech.co.za') {
      // tslint:disable-next-line:max-line-length
      this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where={"status":"Approved"}').subscribe((res: any[]) => {
        // Asign Results to approvecount variable
        this.approvecount = res;
        this.approved = this.approvecount.count;
      });
        } else {
              // tslint:disable-next-line:max-line-length
          this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where={"email":"' + emails + '","status":"Approved"}').subscribe((res: any[]) => {
            // Asign Results to approvecount variable
            this.approvecount = res;
            this.approved = this.approvecount.count;
          });

        }

  }
  // Get number of Rejected leaves for current user
  getCountOfRejectedLeaves() {
    // Get current  user email
    const emails = this.adalSvc.userInfo.userName;
    // Get Method for number of Rejected leaves
    if (emails === 'support@skhomotech.co.za') {
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where={"status":"Rejected"}').subscribe((res: any[]) => {
      // Asign Results to rejectedcount variable
      this.rejectedcount = res;
      this.rejected = this.rejectedcount.count;
    });
  } else {
      // tslint:disable-next-line:max-line-length
      this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where={"email":"' + emails + '","status":"Rejected"}').subscribe((res: any[]) => {
        // Asign Results to rejectedcount variable
        this.rejectedcount = res;
        this.rejected = this.rejectedcount.count;
      });
  }
  }

  // Get number of Pending leaves for current user
  getCountOfPendingLeaves() {
    // Get current  user email
    const emails = this.adalSvc.userInfo.userName;
    // Get Method for number of Pending leaves
    if (emails === 'support@skhomotech.co.za') {
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where={"status":"Pending"}').subscribe((res: any[]) => {
      // Asign Results to pendingcount variable
      this.pendingcount = res;
      this.pending = this.pendingcount.count;
    });
  } else {
        // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where={"email":"' + emails + '","status":"Pending"}').subscribe((res: any[]) => {
      // Asign Results to pendingcount variable
      this.pendingcount = res;
      this.pending = this.pendingcount.count;
    });
  }
  }
  // Get All leaves count for current user
  getCountOfALLLeaves() {
    // Get current  user email
    const emails = this.adalSvc.userInfo.userName;
    // Get Method for number of All leaves
    if (emails === 'support@skhomotech.co.za') {
    // tslint:disable-next-line:max-line-length
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count').subscribe((res: any[]) => {
      // Asign Results to allleavestatuscount variable
      this.allleavestatuscount = res;
      this.allleave = this.allleavestatuscount.count;
    });
  } else {
        // tslint:disable-next-line:max-line-length
        this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaveRequesteds/count?where={"email":"' + emails + '"}').subscribe((res: any[]) => {
          // Asign Results to allleavestatuscount variable
          this.allleavestatuscount = res;
          this.allleave = this.allleavestatuscount.count;
        });
  }
  }
}
