import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component'
import { isNullOrUndefined } from 'util';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import { Router } from '@angular/router'


@Component({
  selector: 'app-CreateClaimForm',
  templateUrl: './CreateClaimForm.component.html',
  styleUrls: ['./CreateClaimForm.component.css']
})
export class CreateClaimFormComponent implements OnInit {

  idMember
  dropdownPolicyType
  dropdownClaimType
  dropdownPayOutType

  selectedPayOutType
  selectedClaimType

  claimType
  payoutType

  policyDetails
  idNumber
  name
  surname
  deathDate
  burialDate
  PlaceOfDeath

  jsonDATA = []

  /*"idclaimtype": "1",
    "idpolicydetails": "1",
    "deceasedidentitynumber": "asdsad",
    "placeofdeath":"asdasd",
    "dateofdeath": "sdsad",
    "deathcertificate": "asdsad",
    "proposedburialdate": "asdsad",
    "idpayouttype":"1",
    "createddate": "20-06-2019",
    "idclaimstatus": "1",
    "deceasedname": "mom",
    "deceasedsurname": "1111"*/


  constructor(private app: AppComponent, private _service: ServiceService) { }

  ngOnInit() {


    // GET DROP DOWN
    this._service.getAllClaimType()
      .subscribe(claimT => {
        this.dropdownClaimType = claimT

        this._service.getAllPayOutType()
          .subscribe(payout => {
            this.dropdownPayOutType = payout
          }, err => console.log(err))

      }, err => { console.log(err) })

    if (localStorage.getItem('id') != '') {
      this.idMember = JSON.parse(localStorage.getItem('id'))
      console.log(this.idMember)
    }

    this.app.loading = false
  }

  createClaim() {

    this.name = document.querySelector('#name')
    this.surname = document.querySelector('#surname')
    this.idNumber = document.querySelector('#idnumber')
    this.PlaceOfDeath = document.querySelector('#pod')
    this.deathDate = document.querySelector('#dod')
    this.burialDate = document.querySelector('#burialdate')


    this.jsonDATA.push({
      'idclaimtype': this.selectedClaimType,
      'idpolicydetails': '1',
      'deceasedidentitynumber': this.idNumber.value,
      'placeofdeath': this.PlaceOfDeath.value,
      'dateofdeath': this.deathDate.value,
      'deathcertificate': 'doc.pdf',
      'proposedburialdate': this.burialDate.value,
      'idpayouttype': this.selectedPayOutType,
      'idclaimstatus': '1', // set to trail/pending/draft by default id=1
      'deceasedname': this.name.value,
      'iduser': '1',
      'idmember': this.idMember,
      'deceasedsurname': this.surname.value
    })

    console.log(this.jsonDATA)
    this._service.createClaim(this.jsonDATA)
      .subscribe(res => {
        console.log(res);

      }, err => {
        console.log(err)
      })

  }

}
