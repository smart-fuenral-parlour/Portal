import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AppComponent } from 'src/app/app.component'
import { Router } from '@angular/router'
import * as moment from 'moment';

//////////////////////////////////////   SERVICE CALLS   //////////////////////////////////////////////////////////
import { ClaimService } from 'src/app/services/claim/claim.service'
import { BeneficiaryService } from 'src/app/services/beneficiary/beneficiary.service'


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

  invalidIdnumber = false
  selected = false

  constructor(private app: AppComponent,
    private router: Router,
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
        this.app.loading = false

        if (beneficiaries_res.length > 0) {
          this.beneficiaries = beneficiaries_res
        }

      }, err => {
        console.log(err)
        this.app.loading = false
      })

  }

  createClaim() {

    let newDate = new Date
    this.invalidIdnumber = false

    if (isNullOrUndefined(this.setclaim.informantidentitynumber) || isNullOrUndefined(this.setclaim.informantname) || isNullOrUndefined(this.setclaim.informantsurname) || isNullOrUndefined(this.setclaim.placeofdeath) || isNullOrUndefined(this.setclaim.deathofdeath) || isNullOrUndefined(this.setclaim.proposedburialdate)) {

      swal({
        title: "Form Incomplete",
        text: "Please complete form before submitting claim",
        type: 'error',
        timer: 5000,
        showConfirmButton: true
      }).catch(swal.noop)

    } else
      if (this.setclaim.informantidentitynumber == '' || this.setclaim.informantname == '' || this.setclaim.informantsurname == '' || this.setclaim.placeofdeath == '') {

        swal({
          title: "Form Incomplete",
          text: "Please complete form before submitting claim",
          type: 'error',
          timer: 5000,
          showConfirmButton: true
        }).catch(swal.noop)

      } else {

        if (this.setclaim.informantidentitynumber.length == 13) {

          swal({
            title: 'Submit Claim for ' + this.member.name,
            //text: 'Please note that the claim will be in a pending state, up until the approver approves the claim',
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
              this.app.loading = true

              this.setclaim.idclaimstatus = 2
              this.setclaim.id = 0
              // ('CN' + (newDate).getMilliseconds().toString().slice(0, 3) + (this.setclaim.deceasedidnumber).toString().slice(6, 9))
              this.setclaim.claimnumber = ('CN' + Math.floor(1000 + Math.random() * 9000) + (this.setclaim.deceasedidnumber).toString().slice(6, 9) + (newDate).getSeconds().toString().slice(0, 1))
              this.setclaim.createddate = moment.parseZone(newDate).utc().format()
              this.setclaim.createdby = (this.user.name + " " + this.user.surname)
              this.setclaim.deathcertificate = 'file.pdf'
              this.setclaim.idmember = this.member.id
              this.setclaim.deathofdeath = moment.parseZone(this.setclaim.deathofdeath).utc().format()
              this.setclaim.proposedburialdate = moment.parseZone(this.setclaim.proposedburialdate).utc().format()


              this.claimService.createClaim(this.setclaim)
                .subscribe(claim_res => {
                  console.log(claim_res)
                  this.app.loading = false


                  swal(
                    {
                      title: 'Claim Submitted',
                      type: 'success',
                      confirmButtonClass: "btn btn-success",
                      buttonsStyling: false

                    }).then((result) => {
                      this.router.navigate(['/dashboard'])
                    })
                }, err => {
                  console.log(err)
                  this.app.loading = false
                })


            }
          })

        } else {
          this.invalidIdnumber = true
        }
      }


  }

  selectDeceased() {

    this.app.loading = true
    this.claimService.checkDeceasedIdnumber(this.setclaim.deceasedidnumber)
      .subscribe(claim_res => {
        this.app.loading = false
        console.log(claim_res)

        if (claim_res.count == 0) {
          this.selected = true
        } else {

          swal({
            title: "Cannot Proceed",
            text: "Unfortunately the selected member is already deceased, please select another one",
            type: 'warning',
            timer: 7500,
            showConfirmButton: true
          }).catch(swal.noop)

        }

      }, err => {
        console.log(err)
        this.app.loading = false
      })

  }


}
