import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AppComponent } from 'src/app/app.component'

////////////////// SERVICE CALLS /////////////////////////////////////
import { MemberService } from 'src/app/services/member/member.service'
import { PolicystatusService } from 'src/app/services/policystatus/policystatus.service'
import { ClaimService } from 'src/app/services/claim/claim.service'
import { BeneficiaryService } from 'src/app/services/beneficiary/beneficiary.service'
import { BalanceService } from 'src/app/services/balance/balance.service'
import { PolicydetailsService } from 'src/app/services/policydetails/policydetails.service'
import { LifestatusService } from 'src/app/services/lifestatus/lifestatus.service'
import { UserService } from 'src/app/services/user/user.service'
///////////////////////////////////////////////////////////////////////

import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-ViewAllClaims',
  templateUrl: './ViewAllClaims.component.html',
  styleUrls: ['./ViewAllClaims.component.css']
})
export class ViewAllClaimsComponent implements OnInit {

  toNULL = false
  fromNULL = false

  fromDate
  toDate
  selectedClaim
  selectedClaimType
  selectedClaimTypeText


  isEmpty = false
  invalidID = false
  table = false
  notFound = false

  constructor(private app: AppComponent, private _router: Router) { }

  Types = [
    { id: 1, value: 'Approved', viewValue: 'Approved' },
    { id: 2, value: 'Declined', viewValue: 'Declined' },
    { id: 3, value: 'Pending', viewValue: 'Pending' }
  ];


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
    console.log(this.selectedClaimType)
    console.log(isNullOrUndefined(this.selectedClaimType))
    this.selectedClaimTypeText = this.selectedClaimType

    if( isNullOrUndefined(this.selectedClaimType) ) {
      this.table = false
      this.notFound = false
      this.isEmpty = true
      
    } else {
      this.notFound = false
      this.isEmpty = false
      this.table = true
      
    }

  }

    // View member details
    claimInfo(index) {
      this.selectedClaim = index;
     // console.log('Member ID: ' + id);
      localStorage.setItem('idclaim', JSON.stringify(5));
      this._router.navigate(['/claims/claiminfo']);
    }


    changeEmpty() {
      this.isEmpty = false
      this.invalidID = false
    }


}
