import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-stats-card2',
  templateUrl: './stats-card2.component.html',
  styleUrls: ['./stats-card2.component.scss']
})
export class StatsCard2Component implements OnInit {

  public email: any;
  public fullnames: any;
  public ImageUpload: string | undefined;
  public currentUser: any;
  public siteurl = window.location.origin;
  public annual: any;
  public medical: any;
  public family: any;
  public maternity: any;
  public study: any;
  public other: any;
  public LeaveBalances: any;
  constructor(private httpClient: HttpClient, private adalSvc: AdalService) {
    // Display
    this.getUserBalance();
      }

  ngOnInit() {
    // Get current   user Details
    this.fullnames = this.adalSvc.userInfo.profile.name;
    this.email = this.adalSvc.userInfo.userName;

  }

  // Get current  user Leave Types Balance
    getUserBalance() {
      // Get current  user email
      const emails = this.adalSvc.userInfo.userName;
      // Get Method for current user  Leave Types Balance
      // tslint:disable-next-line:max-line-length
      this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaves?filter={"where":{"email":"' + emails + '"}}').subscribe((res: any) => {
        // Asign Results to LeaveBalances variable
      this.LeaveBalances = res;
      });
      }
  }

