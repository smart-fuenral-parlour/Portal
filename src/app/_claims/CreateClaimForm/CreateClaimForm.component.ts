import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AppComponent } from 'src/app/app.component'
import { Router } from '@angular/router'
import * as moment from 'moment';

//////////////////////////////////////   SERVICE CALLS   //////////////////////////////////////////////////////////
import { MemberService } from 'src/app/services/member/member.service'
import { ClaimService } from 'src/app/services/claim/claim.service'
import { PayouttypeService } from 'src/app/services/payouttype/payouttype.service'
import { BeneficiaryService } from 'src/app/services/beneficiary/beneficiary.service'
import { ClaimstatusService } from 'src/app/services/claimstatus/claimstatus.service'
import { ClaimtypeService } from 'src/app/services/claimtype/claimtype.service'


////////////////////////////////////////    MODEL CLASS CALLs   //////////////////////////////////////////////////
import { Member } from 'src/app/services/member/member'
import { Claim } from 'src/app/services/claim/claim'
import { User } from 'src/app/services/user/user'
import { Payouttype } from 'src/app/services/payouttype/payouttype'
import { Beneficiary } from 'src/app/services/beneficiary/beneficiary'
import { Claimstatus } from 'src/app/services/claimstatus/claimstatus'
import { Claimtype } from 'src/app/services/claimtype/claimtype'

//////////////////////////////////////////////////////////////////////////////////////////////////////////

import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import swal from 'sweetalert2';
import { subscribeOn } from 'rxjs/operators';




@Component({
  selector: 'app-CreateClaimForm',
  templateUrl: './CreateClaimForm.component.html',
  styleUrls: ['./CreateClaimForm.component.css']
})
export class CreateClaimFormComponent implements OnInit {

  member: Member
  setclaim = new Claim
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
    private payouttypeService: PayouttypeService,
    private beneficiaryService: BeneficiaryService,
    private claimService: ClaimService,
    private formBuilder: FormBuilder
  ) { }


  Genders = [
    { value: 'Male', abrv: 'M' },
    { value: 'Female', abrv: 'F' }
  ]


  ngOnInit() {
    this.app.loading = true

    this.member = JSON.parse(localStorage.getItem('member'))
    this.user = JSON.parse(localStorage.getItem('user'))

    console.log(this.member)


    this.beneficiaryService.getBeneficiarybyidmember(this.member.id)
      .subscribe(beneficiaries_res => {

        if (beneficiaries_res.length > 0) {

          this.beneficiaries = beneficiaries_res

        }

      }, err => {
        console.log(err)
      })

  }

  createClaim() {

    let newDate = new Date

    swal({
      title: 'Submit Claim for ' + this.member.name,
      text: 'Please note that the claim will be in a pending state, up until the approver approves the claim',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Submit',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {

        this.setclaim.idclaimstatus = 1
        this.setclaim.id = 0
        this.setclaim.claimnumber = ('CN' + (newDate).getMilliseconds().toString().slice(0, 3) + (this.setclaim.deceasedidnumber).toString().slice(6, 9))
        this.setclaim.createddate = moment.parseZone(newDate).utc().format()
        this.setclaim.createdby = (this.user.name + " " + this.user.surname)
        this.setclaim.deathcertificate = 'file.pdf'
        this.setclaim.deathofdeath = moment.parseZone(this.setclaim.deathofdeath).utc().format()
        this.setclaim.proposedburialdate = moment.parseZone(this.setclaim.proposedburialdate).utc().format()


        this.claimService.createClaim(this.setclaim)
          .subscribe(claim_res => {
            console.log(claim_res)
          }, err => {
            console.log(err)
          })

        swal(
          {
            title: 'Claim Submitted',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false

          }).then((result) => {
            this.router.navigate(['/dashboard'])
          })

      }
    })



  }

  testit() {

  }

  selectDeceased() {
    this.selected = true

    /*
        if (this.selectedDeceased == '' || isNullOrUndefined(this.selectedDeceased)) {
          this.selected = false
        } else {
          console.log(this.selectedDeceased)
          this.selected = true
        }
    */

  }


}
