import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component'
import swal from 'sweetalert2';
import { Router } from '@angular/router'
declare var $: any;

////////////////////////////// SERVICE CALLS //////////////////////////////////////////////////////////
import { MemberService } from 'src/app/services/member/member.service'
import { PolicystatusService } from 'src/app/services/policystatus/policystatus.service'
import { ClaimService } from 'src/app/services/claim/claim.service'
import { BeneficiaryService } from 'src/app/services/beneficiary/beneficiary.service'
import { BalanceService } from 'src/app/services/balance/balance.service'
import { PolicydetailsService } from 'src/app/services/policydetails/policydetails.service'
import { LifestatusService } from 'src/app/services/lifestatus/lifestatus.service'
import { UserService } from 'src/app/services/user/user.service'
import { ClaimauditService } from 'src/app/services/claimaudit/claimaudit.service'

/////////////////////////////////////////  SERVICE CALLS   ///////////////////////////////////////////////////////////////////
import { Claim } from 'src/app/services/claim/claim'
import { Claimstatus } from 'src/app/services/claimstatus/claimstatus'
import { Claimaudit } from 'src/app/services/claimaudit/claimaudit'
import { User } from 'src/app/services/user/user'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here

@Component({
  selector: 'app-ClaimInfo',
  templateUrl: './ClaimInfo.component.html',
  styleUrls: ['./ClaimInfo.component.css']
})
export class ClaimInfoComponent implements OnInit {

  getclaim: Claim

  user: User

  setclaim = new Claim
  setclaimaudit = new Claimaudit

  noClaims = false
  constructor(private app: AppComponent,
    private claimService: ClaimService,
    private claimauditService: ClaimauditService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getclaim = JSON.parse(localStorage.getItem('claiminfo'));
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.getclaim)
  }

  approveClaim() {
    this.setclaim.idclaimstatus = 2
    this.setclaimaudit.reason = '<CLAIM APPROVED>'
    this.setclaimaudit.iduser = 1//this.user.iduser
    this.setclaimaudit.idclaimstatus = this.setclaim.idclaimstatus
    this.setclaimaudit.idclaim = this.getclaim.idclaim

    this.claimService.updateClaim(this.getclaim.idclaim, this.setclaim)
      .subscribe(update_res => {
        console.log(update_res)


        this.claimauditService.createClaimaudit(this.setclaimaudit)
          .subscribe(create_res => {
            console.log(create_res)

            this.router.navigate(['/claims/viewallclaims'])

            console.log(this.setclaim)
            console.log(this.setclaimaudit)

          }, err => {
            console.log(err)
          })


      }, err => {
        console.log()
      })

    console.log(this.setclaim)
    console.log(this.setclaimaudit)
    //this.claimService.updateClaim(this.getclaim.idclaim, this.setclaim)
  }

  declineClaim() {

    swal({
      title: "Decline claim No. " + this.getclaim.idclaim +
        ", please provide a reason below",
      html: '<div class="form-group">' +
        '<input id="reason" type="text" class="form-control" />' +
        '</div>',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      type: 'warning',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Send claim back'
    }).then((result) => {
      if (result.value) {

        this.setclaim.idclaimstatus = 3
        this.setclaimaudit.reason = $('#reason').val()
        this.setclaimaudit.iduser = 1//this.user.iduser
        this.setclaimaudit.idclaimstatus = this.setclaim.idclaimstatus
        this.setclaimaudit.idclaim = this.getclaim.idclaim

        this.claimService.updateClaim(this.getclaim.idclaim, this.setclaim)
          .subscribe(update_res => {
            console.log(update_res)
            this.router.navigate(['/claims/viewallclaims'])
          }, err => {
            console.log()
          })

        console.log(this.setclaim)
        console.log(this.setclaimaudit)

        swal({

          title: 'Claim declined and sent back',
          type: 'success',
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false

        }).then((result) => console.log('saved!')) // this.router.navigate(['/claims/viewallclaims']))
      }
    })


  }



}
