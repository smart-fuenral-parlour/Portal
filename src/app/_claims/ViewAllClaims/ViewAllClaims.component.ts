import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AppComponent } from 'src/app/app.component'

////////////////// SERVICE CALLS /////////////////////////////////////
import { MemberService } from 'src/app/services/member/member.service'
import { PolicystatusService } from 'src/app/services/policystatus/policystatus.service'
import { ClaimService } from 'src/app/services/claim/claim.service'
import { ClaimstatusService } from 'src/app/services/claimstatus/claimstatus.service'
import { BeneficiaryService } from 'src/app/services/beneficiary/beneficiary.service'
import { BalanceService } from 'src/app/services/balance/balance.service'
import { PolicydetailsService } from 'src/app/services/policydetails/policydetails.service'
import { LifestatusService } from 'src/app/services/lifestatus/lifestatus.service'
import { UserService } from 'src/app/services/user/user.service'

////////////////// MODEL CLASS CALLS /////////////////////////////////////
import { Claim } from 'src/app/services/claim/claim'
import { Claimstatus } from 'src/app/services/claimstatus/claimstatus'



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

  selectedClaim
  selectedClaimType
  selectedClaimTypeText

  isEmpty = false
  invalidID = false
  table = false
  notFound = false

  claim: Claim
  claimstatuses: Claimstatus[]

  constructor(private app: AppComponent,
    private router: Router,
    private claimService: ClaimService,
    private claimstatusService: ClaimstatusService
  ) { }

  Types = [
    { id: 1, value: 'Approved', viewValue: 'Approved' },
    { id: 2, value: 'Declined', viewValue: 'Declined' },
    { id: 3, value: 'Pending', viewValue: 'Pending' }
  ];


  ngOnInit() {
    this.app.loading = false

    this.claimstatusService.getClaimstatuses()
      .subscribe(claimstatus_res => {
        this.claimstatuses = claimstatus_res
      }, err => {
        console.log(err)
      })


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

    if (isNullOrUndefined(this.selectedClaimType)) {
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

    //this.claims[index]
    localStorage.setItem('claiminfo', JSON.stringify(5));
    this.router.navigate(['/claims/claiminfo']);
  }


  changeEmpty() {
    this.isEmpty = false
    this.invalidID = false
  }


}
