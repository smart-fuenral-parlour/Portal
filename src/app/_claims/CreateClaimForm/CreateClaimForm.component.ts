import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AppComponent } from 'src/app/app.component'
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import { Router } from '@angular/router'

//////////////////////////////////////   SERVICE CALLS   //////////////////////////////////////////////////////////
import { MemberService } from 'src/app/services/member/member.service'
import { PolicydetailsService } from 'src/app/services/policydetails/policydetails.service'
import { ClaimService } from 'src/app/services/claim/claim.service'
import { PayouttypeService } from 'src/app/services/payouttype/payouttype.service'
import { BeneficiaryService } from 'src/app/services/beneficiary/beneficiary.service'
import { ClaimstatusService } from 'src/app/services/claimstatus/claimstatus.service'
import { ClaimtypeService } from 'src/app/services/claimtype/claimtype.service'


////////////////////////////////////////    MODEL CLASS CALLs   //////////////////////////////////////////////////
import { Member } from 'src/app/services/member/member'
import { Policydetails } from 'src/app/services/policydetails/policydetails'
import { Claim } from 'src/app/services/claim/claim'
import { User } from 'src/app/services/user/user'
import { Payouttype } from 'src/app/services/payouttype/payouttype'
import { Beneficiary } from 'src/app/services/beneficiary/beneficiary'
import { Claimstatus } from 'src/app/services/claimstatus/claimstatus'
import { Claimtype } from 'src/app/services/claimtype/claimtype'

//////////////////////////////////////////////////////////////////////////////////////////////////////////

import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';




@Component({
  selector: 'app-CreateClaimForm',
  templateUrl: './CreateClaimForm.component.html',
  styleUrls: ['./CreateClaimForm.component.css']
})
export class CreateClaimFormComponent implements OnInit {

  member: Member
  policydetails: Policydetails
  claim = new Claim
  user: User
  beneficiaries: Beneficiary[]
  payouttypes: Payouttype[]
  claimstatuses: Claimstatus[]
  claimtypes: Claimtype[]
  selectedDeceased
  selected = false

  constructor(private app: AppComponent,
    private memberService: MemberService,
    private router: Router,
    private claimstatusService: ClaimstatusService,
    private claimtypeService: ClaimtypeService,
    private policydetailsService: PolicydetailsService,
    private payouttypeService: PayouttypeService,
    private beneficiaryService: BeneficiaryService,
    private claimService: ClaimService,
    private formBuilder: FormBuilder
  ) { }


  genders = [
    { value: 'Male', name: 'Male', abrv: 'M' },
    { value: 'Female', name: 'Female', abrv: 'F' }
  ]


  ngOnInit() {
    this.app.loading = true

    this.member = JSON.parse(localStorage.getItem('editmember'))
    this.user = JSON.parse(localStorage.getItem('user'))

    console.log(this.member)

    this.beneficiaryService.getBeneficiarybyidmember(this.member.idmember)
      .subscribe(beneficiary_res => {

        this.beneficiaries = beneficiary_res


      }, err => {
        console.log(err)
      })

    this.policydetailsService.getPolicydetailbyidmember(this.member.idmember)
      .subscribe(policydetails_res => {

        this.policydetails = policydetails_res
        console.log(this.policydetails)

        this.payouttypeService.getPayouttypes()
          .subscribe(payouttype_res => {

            this.payouttypes = payouttype_res
            console.log(this.payouttypes)

            this.claimtypeService.getClaimtypes()
              .subscribe(claimtype_res => {
                this.claimtypes = claimtype_res


              }, err => {
                console.log(err)
              })


          }, err => {
            console.log(err)
          })

      }, err => {
        console.log(err)
      })

  }

  createClaim() {

    //this.claim.iduser = this.user.iduser
    this.claim.idclaimstatus = 1
    this.claim.idmember = this.member.idmember
    this.claim.idpolicydetails = this.policydetails.idpolicydetails

    console.log(this.claim)
    swal({
      title: "Finilize claim",
      text: "{CLAIM DETAILS HERE}",
      showConfirmButton: true
  }).catch(swal.noop)

  }

  selectDeceased() {
    console.log(this.selectedDeceased)

    if (this.selectedDeceased == '' || isNullOrUndefined(this.selectedDeceased)) {
      this.selected = false
    } else {
      console.log(this.selectedDeceased)
      this.selected = true
    }


  }


}
