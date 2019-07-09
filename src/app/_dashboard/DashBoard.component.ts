import { CountService } from './../services/count/count.service';
import { Count } from './../services/count/count';
import { Component, OnInit } from '@angular/core';
import { TableData } from 'src/app/md/md-table/md-table.component';
import { LegendItem, ChartType } from 'src/app/md/md-chart/md-chart.component';
import { AppComponent } from 'src/app/app.component'



import * as Chartist from 'chartist';

declare const $: any;

@Component({
  selector: 'app-DashBoard',
  templateUrl: './DashBoard.component.html',
  styleUrls: ['./DashBoard.component.css']
})
export class DashBoardComponent implements OnInit {

  membercount;
  appovedclaims
  declinedclaims
  pendingclaims

  constructor(private _count: CountService) { }

  ngOnInit() {

   

    this._count.getapprovedclaimsCount()
    .subscribe(res => {
        this.appovedclaims = res[0].countvalue;
    }, err => {
      console.log(err);
    });

    this._count.getdeclinedclaimsCount()
    .subscribe(res => {
        this.declinedclaims = res[0].countvalue;
    }, err => {
      console.log(err);
    });

    this._count.getmemberCount()
    .subscribe(res => {
        this.membercount = res[0].countvalue;
    }, err => {
      console.log(err);
    });

    this._count.getpendingclaimsCount()
    .subscribe(res => {
        this.pendingclaims = res[0].countvalue;
    }, err => {
      console.log(err);
    });

}



}








  




