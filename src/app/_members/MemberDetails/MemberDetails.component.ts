import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms'

////////////////// SERVICE CALLS /////////////////////////////////////
import { MemberService } from 'src/app/services/member/member.service'
import { PolicytypeService } from 'src/app/services/policytype/policytype.service'
import { ClaimService } from 'src/app/services/claim/claim.service'
import { BeneficiaryService } from 'src/app/services/beneficiary/beneficiary.service'
import { UserService } from 'src/app/services/user/user.service'

////////////////// MODEL CLASS CALLS /////////////////////////////////////
import { Member } from 'src/app/services/member/member'
import { Policytype } from 'src/app/services/policytype/policytype'
import { Claim } from 'src/app/services/claim/claim'
import { Beneficiary } from 'src/app/services/beneficiary/beneficiary'
import { User } from 'src/app/services/user/user'

///////////////////////////////////////////////////////////////////////


import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component'

declare var $: any;


@Component({
  selector: 'app-MemberDetails',
  templateUrl: './MemberDetails.component.html',
  styleUrls: ['./MemberDetails.component.css']
})
export class MemberDetailsComponent implements OnInit {

  addForm: FormGroup;
  rows: FormArray;
  society = false;


  policystatus_color
  lifestatus_color


  idmember
  createddate
  balances


  selectedClaim
  createdby

  noClaims = true
  noBeneficiary = true
  noPayment = false
  editTextBox = false;

  Beneficiaryname;
  Beneficiarysurname;
  Beneficiaryidumber;


  /////////////////////
  member: Member
  beneficiaries: Beneficiary[]
  setBeneficiary = new Beneficiary
  claims: Claim[]
  user: User
  Policytype: Policytype
  lifestatus
  policystatus
  //////////////////////////////

  allowBeneficiary = true


  constructor(private fb: FormBuilder,
    private memberService: MemberService,
    private policytypeService: PolicytypeService,
    private claimService: ClaimService,
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

    this.member = JSON.parse(localStorage.getItem('viewdetails'))
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.member)



    // checking policy type
    if( !isNullOrUndefined(this.member.idpolicytype) ){

      this.policytypeService.getPolicytype(this.member.idpolicytype)
      .subscribe(policytype_res => {

        console.log(policytype_res)

        if(!isNullOrUndefined(policytype_res)){
          if(policytype_res.maximumbeneficiaries == '0'){
            this.allowBeneficiary = false
          } else {
            this.allowBeneficiary = true
          }
        }


      }, err => {
        console.log(err)
      })

    } else {      
      this.allowBeneficiary = true
    }
    

    this.beneficiaryService.getBeneficiarybyidmember(this.member.id)
    .subscribe(beneficiary_res => {

      console.log(beneficiary_res)

      if (beneficiary_res.length > 0) {

        this.beneficiaries = beneficiary_res
        this.noBeneficiary = false


      } else {
        this.noBeneficiary = true
      }


      this.claimService.getClaimbyidmember(this.member.id)
        .subscribe(claims_res => {

          this.app.loading = false
          if (claims_res.length > 0) {

            this.claims = claims_res
            this.noClaims = false


          } else {
            this.noClaims = true
          }

        }, err => {
          this.app.loading = false
          console.log(err)

        })


    }, err => {
      console.log(err)
      this.app.loading = false
    })


    console.log(this.user)
    console.log(this.member)


    ///  

  }

  deleteBeneficiary(id, name, surname) {

    swal({
      title: 'Delete ' + name + ' ' + surname,
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

        this.beneficiaryService.deleteBeneficiary(id)
          .subscribe(res => {
            console.log(res)

            swal(
              {
                title: 'Deleted',
                type: 'success',
                confirmButtonClass: "btn btn-success",
                buttonsStyling: false

              }).then((result) => window.location.reload())

          }, err => {
            console.log(err)
          })

      }
    })
  }


  createItemFormGroup(): FormGroup {
    return this.fb.group({
      name: null,
      descriptions: null,
      qty: null
    });
  }

  // goto Edit a member
  editMember() {

    localStorage.setItem('editmember', JSON.stringify(this.member));
    sessionStorage.setItem('fromMemberDetails', JSON.stringify(true));
    this.router.navigate(['/members/editmember']);

  }


  editbeneficiary(id, NAME, SURNAME, IDNUMBER) {



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
        '<input matInput type="text" onkeypress="return event.charCode >= 48 && event.charCode <= 57" name="idnumber" minlength="13"  maxlength="13" minLength id="IDNumber" placeholder="' + IDNUMBER + '" class="form-control" />' +
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


        this.setBeneficiary.idlifestatus = 1
        this.setBeneficiary.idmember = this.member.id

        // NEW BENEFICIARY NAME
        if ($('#Name').val() == '' || isNullOrUndefined($('#Name').val())) {
          this.setBeneficiary.name = NAME
        } else {
          this.setBeneficiary.name = $('#Name').val()
        }

        // NEW BENEFICIARY SURNAME  
        if ($('#Surname').val() == '' || isNullOrUndefined($('#Surname').val())) {
          this.setBeneficiary.surname = SURNAME
        } else {
          this.setBeneficiary.surname = $('#Surname').val()
        }

        // NEW BENEFICIARY ID NUMBER
        if ($('#IDNumber').val() == '' || isNullOrUndefined($('#IDNumber').val())) {
          this.setBeneficiary.identitynumber = IDNUMBER
        } else {
          this.setBeneficiary.identitynumber = $('#IDNumber').val()
        }


        this.beneficiaryService.checkBeneficiaryIdnumber(this.setBeneficiary.identitynumber)
          .subscribe(count_res => {

            this.app.loading = false
            console.log(count_res)
            if (count_res.count == 0 || this.setBeneficiary.identitynumber == IDNUMBER) {


              this.app.loading = true
              this.beneficiaryService.updateBeneficiary(id, this.setBeneficiary)
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

            } else {
              swal({
                title: "id number already exist",
                text: "Please try again",
                type: 'error',
                timer: 5000,
                showConfirmButton: true
              }).catch(swal.noop)
            }


          }, err => {
            console.log(err)
            this.app.loading = false
          })


      }
    })


  }

  createBeneficiary() {


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
        '<input matInput type="text" minlength="13"  maxlength="13" name="idnumber" id="IDNumber" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="form-control" />' +
        '</div>' +
        '</div>' +

        '</div>',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {


        // checking for empty fields
        if (isNullOrUndefined($('#Name').val()) || isNullOrUndefined($('#Surname').val()) || isNullOrUndefined($('#IDNumber').val())) {

          swal({
            title: "Unsuccesful",
            text: "Please fill all fields before submitting",
            type: 'error',
            timer: 2000
          }).catch(swal.noop)

        } else
          if ($('#Name').val() == '' || $('#Surname').val() == '' || $('#IDNumber').val() == '') {

            swal({
              title: "Unsuccesful",
              text: "Please fill all fields before submitting",
              type: 'error',
              timer: 2000
            }).catch(swal.noop)

          } else {

            this.setBeneficiary.name = $('#Name').val()
            this.setBeneficiary.surname = $('#Surname').val()
            this.setBeneficiary.identitynumber = $('#IDNumber').val()
            // validating duplicated email  {"identitynumber": "1865234703621"}
            this.app.loading = true
            this.beneficiaryService.checkBeneficiaryIdnumber(this.setBeneficiary.identitynumber)
              .subscribe(count_res => {

                this.app.loading = false
                console.log(count_res)
                if (count_res.count == 0) {



                  this.setBeneficiary.idlifestatus = 1
                  this.setBeneficiary.id = 0
                  this.setBeneficiary.idmember = this.member.id

                  this.app.loading = true
                  this.beneficiaryService.createBeneficiary(this.setBeneficiary)
                    .subscribe(beneficiary_res => {

                      this.app.loading = false
                      console.log(beneficiary_res)

                      swal(
                        {
                          title: 'Updates Succesfully Saved',
                          type: 'success',
                          confirmButtonClass: "btn btn-success",
                          buttonsStyling: false

                        }).then((result) => {
                          window.location.reload()
                        })

                    }, err => {
                      console.log(err)
                      this.app.loading = false
                    })

                } else {
                  swal({
                    title: "Beneficiary already exist",
                    text: "Please enter a new one",
                    type: 'error',
                    timer: 5000,
                    showConfirmButton: true
                  }).catch(swal.noop)
                }


              }, err => {
                console.log(err)
                this.app.loading = false
              })


          }


      }
    })
  }


  // View member details
  claimInfo(index) {
    localStorage.setItem('claiminfo', JSON.stringify(this.claims[index]));
    this.router.navigate(['/claims/claiminfo']);
  }


  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }



}
