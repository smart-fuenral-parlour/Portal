import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { TablesService } from '../tables.service';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';
declare var $: any;
@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.scss'],
  providers: [TablesService]
})
export class ApplyleaveComponent implements OnInit {

  email: any;
  fullnames: any;
  public ImageUpload: string | undefined;
  public currentUser: any;
  public siteurl = window.location.origin;

  public formModel: any = {};
  constructor(private _addService: TablesService, private httpClient: HttpClient, private adalSvc: AdalService) {
    this.getLeave();
  }

  ngOnInit() {
    this.fullnames = this.adalSvc.userInfo.profile.name;
    this.email = this.adalSvc.userInfo.userName;
  }
  StartNintexflow() {
    const emails = this.email;
    const startdate = $('#startdate').val();
    const enddate = $('#enddate').val();
    const leaveType = $('#leavetype').val();
    const numberofdaystaken = 6;
    const reason = $('#reason').val();

    const values = Object.assign({
      'startData': {
        'se_enddate': enddate,
        'se_startdate': startdate,
        'se_email': emails,
        'se_reason': reason,
        'se_daystaken': numberofdaystaken,
        'se_typeofleave': leaveType
      }
    });
    // store leave application data to database
    this.SaveLeaveDetailsDb();
    this._addService.StartNinteLeaveDetailsx(values)
      .subscribe((res: any[]) => {
        console.log('res', res);
        swal('Leave Application Form has been stored submitted successfully');
        this.clearFormData();
      });
  }
  SaveLeaveDetailsDb() {
    if (this.ImageUpload === undefined || this.ImageUpload === '') {
      this.ImageUpload = '/assets/img/image_placeholder.jpg';
    }

    const emails = this.email;
    const fullnames = this.fullnames;
    const startdate = $('#startdate').val();
    const enddate = $('#enddate').val();
    const leaveType = $('#leavetype').val();
    const numberofdaystaken = this.calcLeaveDays();
    const reason = $('#reason').val();


    const values = Object.assign({
      'email': emails,
      'fullnames': fullnames,
      'startdate': startdate,
      'enddate': enddate,
      'reason': reason,
      'leaveType': leaveType,
      'nodaystaken': numberofdaystaken,
      'status': 'Pending',
      'document': this.ImageUpload
    });
    this._addService.postLeaveToDb(values)
      .subscribe((res: any[]) => {
        console.log('res', res);
        this.clearFormData();
      });


  }
  getLeave() {
    this.httpClient.get('https://sktleaveapi.herokuapp.com/api/leaves/').subscribe((res: any[]) => {
      console.log('res', res);
    });
  }
  clearFormData() {
    $('input[type="text"]').val('');
    $('input[type="number"]').val('');
    $('input[type="date"]').val('');
    $('#startdate').val('');
    $('#enddate').val('');
    $('#leavetype').val('');
    $('#reason').val('');

  }

  calcLeaveDays() {

    let d1 = $('#startdate').val();
    let d2 = $('#enddate').val();


    var date1 = new Date(d1);
    var date2 = new Date(d2);

    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    var diff = date2_ms - date1_ms;

    $('#calculated').text(diff / (1000 * 60 * 60 * 24));
    console.log('date', $('#calculated').text(diff / (1000 * 60 * 60 * 24)));

  }
}
