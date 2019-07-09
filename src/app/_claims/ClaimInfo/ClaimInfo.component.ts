import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component'

////////////////////////////// SERVICE CALLS //////////////////////////////////////////////////////////
import { MemberService } from 'src/app/services/member/member.service'
import { PolicystatusService } from 'src/app/services/policystatus/policystatus.service'
import { ClaimService } from 'src/app/services/claim/claim.service'
import { BeneficiaryService } from 'src/app/services/beneficiary/beneficiary.service'
import { BalanceService } from 'src/app/services/balance/balance.service'
import { PolicydetailsService } from 'src/app/services/policydetails/policydetails.service'
import { LifestatusService } from 'src/app/services/lifestatus/lifestatus.service'
import { UserService } from 'src/app/services/user/user.service'

/////////////////////////////////////////  SERVICE CALLS   ///////////////////////////////////////////////////////////////////
import { Claim } from 'src/app/services/claim/claim'
import { Claimstatus } from 'src/app/services/claimstatus/claimstatus'

//////////////////////////////////////////  MODEL CLASS CALLS  ///////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here

@Component({
  selector: 'app-ClaimInfo',
  templateUrl: './ClaimInfo.component.html',
  styleUrls: ['./ClaimInfo.component.css']
})
export class ClaimInfoComponent implements OnInit {

  claim: Claim
  setclaim = new Claim

  noClaims = false
  constructor(private app: AppComponent,
    private claimService: ClaimService) { }

  ngOnInit() {

    this.claim = JSON.parse(localStorage.getItem('claiminfo'));

    this.app.loading = false

  }

  approveClaim() {
    this.setclaim.idclaimstatus = 2
  }





}
