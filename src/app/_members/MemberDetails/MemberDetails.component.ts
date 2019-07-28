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

////////////////// MODEL CLASS CALLS /////////////////////////////////////
import { Member } from 'src/app/services/member/member'
import { Policystatus } from 'src/app/services/policystatus/policystatus'
import { Claim } from 'src/app/services/claim/claim'
import { Beneficiary } from 'src/app/services/beneficiary/beneficiary'
import { Balance } from 'src/app/services/balance/balance'
import { Policydetails } from 'src/app/services/policydetails/policydetails'
import { Lifestatus } from 'src/app/services/lifestatus/lifestatus'
import { User } from 'src/app/services/user/user'

///////////////////////////////////////////////////////////////////////

import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import { isNullOrUndefined, isNull } from 'util';
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

  editTextBox = false;

  selectedClaim
  createdby
  noBeneficiary = false

  Beneficiaryname;
  Beneficiarysurname;
  Beneficiaryidumber;


  /////////////////////
  member: Member
  beneficiary: Beneficiary
  claims
  user: User
  lifestatus
  beneficiaries;
  policystatus
  //////////////////////////////


  constructor(private fb: FormBuilder,
    private service: ServiceService,
    private memberService: MemberService,
    private policystatusService: PolicystatusService,
    private lifestatusService: LifestatusService,
    private claimService: ClaimService,
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

    this.member = JSON.parse(localStorage.getItem('viewdetails'))
    this.user = JSON.parse(localStorage.getItem('user'))


    if (!isNullOrUndefined(this.member.idpolicystatus)) {

      if (this.member.idpolicystatus = 2) {
        this.policystatus_color = 'text-success'
      } else
        if (this.member.idpolicystatus = 3) {
          this.policystatus_color = 'text-danger'

        } else {
          this.policystatus_color = 'text-warning'

        }
    }

    if (!isNullOrUndefined(this.member.idlifestatus)) {

      if (this.member.idlifestatus = 1) {
        this.lifestatus_color = 'text-success'
      } else
        if (this.member.idlifestatus = 2) {
          this.lifestatus_color = 'text-danger'

        } else {
          this.lifestatus_color = 'text-warning'

        }

    }

    this.lifestatusService.getLifestatus(this.member.idlifestatus)
      .subscribe(lifestatus_res => {

        this.lifestatus = lifestatus_res.name

        this.policystatusService.getPolicystatus(this.member.idpolicystatus)
          .subscribe(policystatus_res => {

            this.policystatus = policystatus_res.name

          }, err => {
            console.log(err)
          })

      }, err => {
        console.log(err)
      })


    console.log(this.user)
    console.log(this.member)

    if (JSON.parse(localStorage.getItem('viewdetails')) != null) {


    }
    ///  



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

    localStorage.setItem('editmember', JSON.stringify(this.member));
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


  // View member details
  claimInfo(index, idclaim) {

    localStorage.setItem('idclaim', JSON.stringify(idclaim));
    this.router.navigate(['/claims/claiminfo']);
  }




}
