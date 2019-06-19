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

  constructor() { }

  ngOnInit() {

  }

  load() {
    window.addEventListener('load',function() {
      const loader = document.querySelector('.loader')
      console.log(loader)
      loader.className += ' hidden';
    })
  }

}
