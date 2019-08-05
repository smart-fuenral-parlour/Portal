import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AppComponent } from 'src/app/app.component'

////////////////// SERVICE CALLS /////////////////////////////////////
import { MemberService } from 'src/app/services/member/member.service'
import { ClaimService } from 'src/app/services/claim/claim.service'
import { ClaimstatusService } from 'src/app/services/claimstatus/claimstatus.service'
import { BeneficiaryService } from 'src/app/services/beneficiary/beneficiary.service'

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

  selectedClaim
  selectedClaimType

  isEmpty = false
  invalidID = false
  table = false
  notFound = false

  claims: Claim[]
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

    this.app.loading = true
    this.claimService.getClaims()
      .subscribe(claim_res => {
        this.app.loading = false

        this.claims = claim_res
        console.log(this.claims)
        this.app.loading = false

        if (this.claims.length > 0) {
          this.notFound = false
          this.table = true
        } else {
          this.table = false
          this.notFound = true

        }

      }, err => {
        console.log(err)
        this.app.loading = false
      })


  }


  searchClaim() {
    console.log(this.selectedClaimType)
    this.app.loading = true
    this.notFound = false
    this.table = false
    this.isEmpty = false

    if (isNullOrUndefined(this.selectedClaimType) || this.selectedClaimType == '') {
      console.log('empty')

      this.notFound = false
      this.table = false
      this.isEmpty = true
      this.app.loading = false

    } else {
      console.log('not empty')
      this.notFound = false
      this.table = false
      this.isEmpty = false
      this.app.loading = false


      if (this.selectedClaimType == -1) {

        console.log('get all')


        this.claimService.getClaims()
          .subscribe(claim_res => {

            this.claims = claim_res
            console.log(this.claims)
            this.app.loading = false

            if (this.claims.length > 0) {
              this.notFound = false
              this.table = true
              this.app.loading = false
            } else {
              this.table = false
              this.app.loading = false
              this.notFound = true

            }

          }, err => {
            console.log(err)
          })

      } else {

        console.log('get by status')

        // get claim by the claim status id
        this.claimService.getClaimbyclaimstatus(this.selectedClaimType)
          .subscribe(claim_res => {



            if (claim_res.length > 0) {

              this.claims = claim_res

              this.app.loading = false
              this.notFound = false
              this.table = true
            } else {

              this.table = false
              this.app.loading = false
              this.notFound = true

            }

          }, err => {
            console.log(err)
          })



      }

    }



  }

  // View claims info
  claimInfo(index) {
    localStorage.setItem('claiminfo', JSON.stringify(this.claims[index]));
    this.router.navigate(['/claims/claiminfo']);
  }


  changeEmpty() {
    this.isEmpty = false
    this.invalidID = false
  }


}
