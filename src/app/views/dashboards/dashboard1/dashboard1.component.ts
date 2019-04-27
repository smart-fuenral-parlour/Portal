import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
declare var $: any;
@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component implements OnInit {
  public email: any;
  public fullnames: any;
  public ImageUpload: string | undefined;
  public currentUser: any;
  public siteurl = window.location.origin;

  public map: any = { lat: 51.678418, lng: 7.809007 };
  public chart1Type: string = 'bar';
  public chart2Type: string = 'pie';
  public chart3Type: string = 'line';
  public chart4Type: string = 'radar';
  public chart5Type: string = 'doughnut';


  public chartType = 'line';

  public chartDatasets: Array<any> = [
    {data: [50, 40, 60, 51, 56, 55, 40], label: '#1'},
    {data: [28, 80, 40, 69, 36, 37, 110], label: '#2'},
    {data: [38, 58, 30, 90, 45, 65, 30], label: '#3'}
  ];

  public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  public chartColors: Array<any> = [

  ];

  public dateOptionsSelect: any[];
  public bulkOptionsSelect: any[];
  public showOnlyOptionsSelect: any[];
  public filterOptionsSelect: any[];

  public chartOptions: any = {
    responsive: true,
    legend: {
      labels: {
        fontColor: '#5b5f62',
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#5b5f62',
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: '#5b5f62',
        }
      }]
    }
  };

  constructor(private adalSvc: AdalService) {
      // Get current   user Details
      this.fullnames = this.adalSvc.userInfo.profile.name;
      this.email = this.adalSvc.userInfo.userName;
        // Get Method for number of approved leaves
        if ( this.email === 'support@skhomotech.co.za') {
          // tslint:disable-next-line:no-trailing-whitespace
          
             $('#empdashboard').hide();
            } else {
              $('#empHr').show();
             }
  }
  ngOnInit() {
    // Get current   user Details
    this.fullnames = this.adalSvc.userInfo.profile.name;
    this.email = this.adalSvc.userInfo.userName;
      // Get Method for number of approved leaves
      if ( this.email === 'support@skhomotech.co.za') {
        // tslint:disable-next-line:no-trailing-whitespace
        
           $('#empdashboard').hide();
          } else {
            $('#empHr').show();
           }
    }
  }



