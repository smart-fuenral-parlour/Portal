import { Component, OnInit } from '@angular/core';
import { TableData } from 'src/app/md/md-table/md-table.component';
import { LegendItem, ChartType } from 'src/app/md/md-chart/md-chart.component';
import { AppComponent } from 'src/app/app.component'

////////////////////////////////////  SERVICE CALLS ////////////////////////////////////////////////////
import { UserService } from 'src/app/services/user/user.service'
import { CountService } from './../services/count/count.service';

////////////////////////////////////  MODULE CLASS CALLS ////////////////////////////////////////////////////
import { User } from 'src/app/services/user/user'
import { Count } from './../services/count/count';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { isNullOrUndefined } from 'util';

declare const $: any;

@Component({
  selector: 'app-DashBoard',
  templateUrl: './DashBoard.component.html',
  styleUrls: ['./DashBoard.component.css']
})
export class DashBoardComponent implements OnInit {

  membercount = 0
  approvedclaims = 0
  declinedclaims = 0
  pendingclaims = 0
  user: User

  constructor(private countService: CountService,
    private app: AppComponent,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.app.loading = true
    this.countService.getmemberCount()
      .subscribe(membercount_res => {

        if (!isNullOrUndefined(membercount_res) || membercount_res.count > 0) {
          this.membercount = membercount_res.count
        } else {
          this.membercount = 0
        }
        this.app.loading = false

      }, err => {
        console.log(err)
        this.app.loading = false
      })


    this.countService.getapprovedclaimsCount()
      .subscribe(approved_res => {

        if (!isNullOrUndefined(approved_res) || approved_res.count > 0) {
          this.approvedclaims = approved_res.count
        } else {
          this.approvedclaims = 0
        }

      }, err => {
        console.log(err)
        this.app.loading = false
      })

  }



}













