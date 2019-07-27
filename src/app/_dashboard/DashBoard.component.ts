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

import * as Chartist from 'chartist';
import { isNullOrUndefined } from 'util';

declare const $: any;

@Component({
  selector: 'app-DashBoard',
  templateUrl: './DashBoard.component.html',
  styleUrls: ['./DashBoard.component.css']
})
export class DashBoardComponent implements OnInit {

  membercount 
  appovedclaims
  declinedclaims
  pendingclaims
  user: User

  constructor(private countService: CountService,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.countService.getmemberCount()
      .subscribe(membercount_res => {

        if(!isNullOrUndefined(membercount_res)){
          this.membercount = membercount_res.count
        } else {
          this.membercount = "Undefined"
        }
        
      }, err => {
        console.log(err)
      })

  }



}













