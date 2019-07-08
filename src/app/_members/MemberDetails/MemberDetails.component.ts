import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms'

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

import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import { isNullOrUndefined, isNull } from 'util';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Subscriber } from 'rxjs';
import { AppComponent } from 'src/app/app.component'

declare var $: any;


@Component({
  selector: 'app-MemberDetails',
  templateUrl: './MemberDetails.component.html',
  styleUrls: ['./MemberDetails.component.css']
})
export class MemberDetailsComponent implements OnInit {

  addForm: FormGroup;
  i: number
  singleMember;
  rows: FormArray;
  itemForm: FormGroup;
  society = false;
  beneficiaries;
  selectedrow;

  idmember
  createddate
  policystatus
  lifestatus
  balances
  user
  claims

  editTextBox = false;

  selectedClaim
  createdby
  lifecolor
  policycolor
  noBeneficiary = false

  Beneficiaryname;
  Beneficiarysurname;
  Beneficiaryidumber;
  /*
    ;
    ;
    ;
  
  
  
    creator
    payments
    claims
    Nopayment = false;
  
  
    payment_toNULL = false; claim_toNULL = false
    payment_fromNULL = false; claim_fromNULL = false
    paymentTable = false; claimTable = false
  
    fromDate
    toDate
    
  */
  iduser


  constructor(private fb: FormBuilder,
    private service: ServiceService,
    private memberService: MemberService,
    private policystatusService: PolicystatusService,
    private lifestatusService: LifestatusService,
    private claimService: ClaimService,
    private userService: UserService,
    private policydetailsService: PolicydetailsService,
    private balanceService: BalanceService,
    private beneficiaryService: BeneficiaryService,
    private router: Router,
    private app: AppComponent) {


    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });

    this.rows = this.fb.array([]);

  }

  ngOnInit() {

    this.app.loading = true
    // test if member is from a society FOR VERSION 6.75
    if (!isNullOrUndefined(sessionStorage.getItem('greenlinks'))) {
      this.society = true
    }

    if (localStorage.getItem('iduser') != null) {
      this.iduser = localStorage.getItem('iduser')
    }

    if (localStorage.getItem('idmember') != null) {
      let idmember = JSON.parse(localStorage.getItem('idmember'));



      //this.service.getSingleMember()
      this.memberService.getMember(idmember)
        .subscribe(member_res => {

          this.singleMember = member_res[0]
          this.idmember = this.singleMember.idmember
          //  this.membershipnumber = this.singleMember.membershipnumber
          this.createddate = this.singleMember.createddate
          this.noBeneficiary = false



          this.beneficiaryService.getBeneficiary(this.idmember)
            .subscribe(beneficiaries_res => {
              this.beneficiaries = beneficiaries_res
              console.log(beneficiaries_res)

              if (this.beneficiaries.length == 0) {
                this.noBeneficiary = true
              } else {
                this.noBeneficiary = false
              }

              this.app.loading = false
              this.createdby = 'Thabang Mabambi'




              this.policydetailsService.getPolicydetailbyidmember(this.idmember)
                .subscribe(policydetails_res => {


                  this.policystatusService.getPolicystatus(policydetails_res[0].idpolicystatus)
                    .subscribe(policystatus_res => {

                      this.policystatus = policystatus_res[0].name


                      this.lifestatusService.getLifestatus(member_res[0].idlifestatus)
                        .subscribe(lifestatus_res => {

                          this.lifestatus = lifestatus_res[0].name


                          this.userService.getUser(member_res[0].iduser)
                            .subscribe(user_res => {

                              this.user = user_res[0]

                              this.balanceService.getBalancebyidpolicydetails(policydetails_res[0].idpolicydetails)
                                .subscribe(balance_res => {

                                  this.balances = balance_res

                                  this.claimService.getClaimbyidmember(member_res[0].idmember)
                                    .subscribe(claim_res => {

                                      this.claims = claim_res

                                    }, err => {
                                      console.log(err)
                                    })


                                }, err => {
                                  console.log(err)
                                })



                            }, err => {
                              console.log(err)
                            })

                        }, err => {
                          console.log(err)
                        })



                    }, err => {
                      console.log(err)
                    })


                }, err => {
                  console.log(err)
                })


            }, err => {

              this.app.loading = false
              console.log(err)
            })


          if (this.policystatus = 'Active') {
            this.policycolor = 'text-success'
          } else {
            this.policycolor = 'text-danger'
          }

          if (this.lifestatus = 'Alive') {
            this.lifecolor = 'text-success'
          } else {
            this.lifecolor = 'text-danger'
          }


        }, err => {
          this.app.loading = false
          console.log(err)
        })
    } else {
      return null;
    }

  }

  deleteBeneficiary(index, id, NAME, SURNAME) {

    swal({
      title: 'Delete ' + NAME + ' ' + SURNAME,
      text: "As a Beneficiary",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      cancelButtonText: 'No, Do not Delete',
      confirmButtonText: 'Yes, Delete',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {


        this.service.removeBeneficiary(id)
          .subscribe(res => {

            console.log(res)

          }, err => {
            console.log(err)
          })
        swal(
          {
            title: 'Deleted',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false

          }).then((result) => window.location.reload())
      }
    })
  }

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      name: null,
      descriptions: null,
      qty: null
    });
  }

  // Edit a member
  editMember() {
    // this.selectedrow = index;
    localStorage.setItem('idmember', JSON.stringify(this.idmember));
    sessionStorage.setItem('fromMemberDetails', JSON.stringify(true));
    this.router.navigate(['/members/editmember']);
  }


  editbeneficiary(index, id, NAME, SURNAME, IDNUMBER) {



    swal({
      title: 'Edit Beneficiary',
      html:
        '<div class="row">' +

        '<div class="col-10">' +

        ' <div class="row">' +
        ' <label class=" col-4 col-form-label">Name: </label>' +
        '<div class="col-8">' +
        '<mat-form-field class="example-full-width">' +
        '<input matInput type="text" id="Name" placeholder="' + NAME + '" class="form-control" />' +
        '</mat-form-field>' +
        '</div>' +
        '</div>' +

        '<div class="row">' +
        ' <label class=" col-4 col-form-label">Surname: </label>' +
        '<div class="col-8">' +
        '<mat-form-field class="example-full-width">' +
        '<input matInput type="text" id="Surname" placeholder="' + SURNAME + '" class="form-control" />' +
        '</mat-form-field>' +
        '</div>' +
        '</div>' +

        '<div class="row">' +
        ' <label class=" col-4 col-form-label">ID number: </label>' +
        '<div class="col-8">' +
        '<input matInput type="number" name="idnumber" minLength id="IDNumber" placeholder="' + IDNUMBER + '" class="form-control" />' +
        '</div>' +
        '</div>' +

        '</div>',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.app.loading = true

        // NEW BENEFICIARY NAME
        if ($('#Name').val() == '' || isNullOrUndefined($('#Name').val())) {
          this.Beneficiaryname = NAME
        } else {
          this.Beneficiaryname = $('#Name').val()
        }

        // NEW BENEFICIARY SURNAME
        if ($('#Surname').val() == '' || isNullOrUndefined($('#Surname').val())) {
          this.Beneficiarysurname = SURNAME
        } else {
          this.Beneficiarysurname = $('#Surname').val()
        }

        // NEW BENEFICIARY ID NUMBER
        if ($('#IDNumber').val() == '' || isNullOrUndefined($('#IDNumber').val())) {
          this.Beneficiaryidumber = IDNUMBER
        } else {
          this.Beneficiaryidumber = $('#IDNumber').val()
        }



        this.service.updateBeneficiary(id, { 'idmember': this.idmember, 'name': this.Beneficiaryname, 'surname': this.Beneficiarysurname, 'identitynumber': this.Beneficiaryidumber })
          .subscribe(res => {
            this.app.loading = false
            console.log(res)


            swal(
              {
                title: 'Updates Succesfully Saved',
                type: 'success',
                confirmButtonClass: "btn btn-success",
                buttonsStyling: false

              }).then((result) => window.location.reload())
          }, err => {

            this.app.loading = false
            console.log(err)
          })



      }
    })


  }

  createBeneficiary() {


    let nameEmp = 'hidden'

    swal({
      title: 'Create Beneficiary',
      html:
        '<div class="row">' +

        '<div class="col-10">' +

        ' <div class="row">' +
        ' <label class=" col-4 col-form-label">Name: </label>' +
        '<div class="col-8">' +
        '<mat-form-field class="example-full-width">' +
        '<input matInput type="text" id="Name"   class="form-control" />' +
        ' <p  style="color:red; font-size:13px" hidden >' +
        'Name field empty' +
        '</p>' +
        '</mat-form-field>' +
        '</div>' +
        '</div>' +

        '<div class="row">' +
        ' <label class=" col-4 col-form-label">Surname: </label>' +
        '<div class="col-8">' +
        '<mat-form-field class="example-full-width">' +
        '<input matInput type="text" id="Surname"   class="form-control" />' +
        '</mat-form-field>' +
        '</div>' +
        '</div>' +

        '<div class="row">' +
        ' <label class=" col-4 col-form-label">ID number: </label>' +
        '<div class="col-8">' +
        '<input matInput type="number" name="idnumber" minLength id="IDNumber"  class="form-control" />' +
        '</div>' +
        '</div>' +

        '</div>',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {


        this.service.createMemberBeneficiary({ 'idmember': this.idmember, 'createddate': this.createddate, 'idlifestatus': 1, 'identitynumber': $('#IDNumber').val(), 'name': $('#Name').val(), 'surname': $('#Surname').val() })
          .subscribe(res => {
            console.log(res)

          }, err => {
            console.log(err)
          })


        swal(
          {
            title: 'Updates Succesfully Saved',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false

          }).then((result) => window.location.reload())

      }
    })
  }


  /*
    fromEnable() {
  
      if (this.claim_fromNULL) {
        this.claim_fromNULL = false
      }
  
      if (this.payment_fromNULL) {
        this.payment_fromNULL = false
      }
  
    }
  
    toEnable() {
  
      if (this.claim_toNULL) {
        this.claim_toNULL = false
      }
  
      if (this.payment_toNULL) {
        this.payment_toNULL = false
      }
  
    }
  
    searchClaim() {
  
  
      this.toDate = document.querySelector('#ClaimtoDate')
      this.fromDate = document.querySelector('#ClaimfromDate')
  
      if (this.toDate.value == '') {
        this.claim_toNULL = true
      }
  
      if (this.fromDate.value == '') {
        this.claim_fromNULL = true
      }
  
      if (!this.claim_fromNULL && !this.claim_toNULL) {
        this.claimTable = true
      } else {
        this.claimTable = false
      }
  
    }
  
  
    searchPayments() {
  
      this.toDate = document.querySelector('#PaymenttoDate')
      this.fromDate = document.querySelector('#PaymentfromDate')
  
      if (this.toDate.value == '') {
        this.payment_toNULL = true
      }
  
      if (this.fromDate.value == '') {
        this.payment_fromNULL = true
      }
  
      if (!this.payment_fromNULL && !this.payment_toNULL) {
        this.paymentTable = true
      } else {
        this.paymentTable = false
      }
  
    }
  
  */
  // View member details
  claimInfo(index, idclaim) {

    localStorage.setItem('idclaim', JSON.stringify(idclaim));
    this.router.navigate(['/claims/claiminfo']);
  }




}
