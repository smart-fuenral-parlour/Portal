import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component'

@Component({
  selector: 'app-ViewPayments',
  templateUrl: './ViewPayments.component.html',
  styleUrls: ['./ViewPayments.component.css']
})
export class ViewPaymentsComponent implements OnInit {

  toNULL = false
  fromNULL = false
  table = false

  fromDate
  toDate
  selectedClaim

  constructor(private app: AppComponent) { }

  ngOnInit() {
    this.app.loading = false
    this.toDate = document.querySelector('#toDate')
    this.fromDate = document.querySelector('#fromDate')


  }

  fromEnable() {
    this.fromNULL = false
  }

  toEnable() {
    this.toNULL = false
  }

  searchClaim() {


    if (this.toDate.value == '') {
      this.toNULL = true
    }

    if (this.fromDate.value == '') {
      this.fromNULL = true
    }

    if (!this.fromNULL && !this.toNULL) {
      this.table = true
    } else {
      this.table = false
    }

  }


}
