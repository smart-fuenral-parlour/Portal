import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms'
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import { isNullOrUndefined, isNull } from 'util';
import { isDefined } from '@angular/compiler/src/util';
import { Key } from 'protractor';
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
  getID; i: number
  singleMember;
  rows: FormArray;
  itemForm: FormGroup;
  response;
  society = false;
  beneficiaries;
  selectedrow;
  firstName; lastName;
  idnumber; email;
  housenumber; streetname
  suburb; province
  contact; membershipNumber
  policystatus; policycolor;
  createdby; noBeneficiary = false
  BenefitName; BenefitSurname = []; BenefitIdNumber;
  memberId
  editTextBox = false;
  date
  gender
  lifestatus; lifecolor
  creator
  payments
  claims
  Nopayment = false;


  payment_toNULL = false; claim_toNULL = false
  payment_fromNULL = false; claim_fromNULL = false
  paymentTable = false; claimTable = false

  fromDate
  toDate
  selectedClaim

  iduser

  constructor(private fb: FormBuilder, private _service: ServiceService, private _router: Router, private app: AppComponent) {


    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });

    this.rows = this.fb.array([]);




  }

  ngOnInit() {

    this.app.loading = true
    // test if member is from a society
    if (!isNullOrUndefined(sessionStorage.getItem('greenlinks'))) {
      this.society = true  
    }

    if (localStorage.getItem('iduser') != null) {
      this.iduser = localStorage.getItem('iduser')
    }

    if (localStorage.getItem('idmember') != null) {
      this.getID = JSON.parse(localStorage.getItem('idmember'));



      this._service.getSingleMember(this.getID)
        .subscribe(member1 => {

          this.singleMember = member1
          this.firstName = this.singleMember[0].name
          this.lastName = this.singleMember[0].surname
          this.idnumber = this.singleMember[0].identitynumber
          this.email = this.singleMember[0].email
          this.housenumber = this.singleMember[0].housenumber
          this.streetname = this.singleMember[0].streetname
          this.suburb = this.singleMember[0].suburb
          this.province = this.singleMember[0].province
          this.contact = this.singleMember[0].contactnumber
          this.membershipNumber = this.singleMember[0].membershipnumber
          this.memberId = this.singleMember[0].idmember
      /**/this.policystatus = 'Active'//this.singleMember[0].policystatus
          this.date = this.singleMember[0].createddate
      /***/this.createdby = 'SYSTEM' //this.singleMember[0].createdby
          this.gender = this.singleMember[0].gender
          this.noBeneficiary = false


          this._service.getMemberBeneficiary(this.memberId)
            .subscribe(ben => {
              this.beneficiaries = ben
              console.log(ben)


              if (this.beneficiaries.length == 0) {
                this.noBeneficiary = true
              } else {
                this.noBeneficiary = false
              }

              this.app.loading = false
              console.log(this.memberId)

              this._service.getUser(this.iduser)
                .subscribe(res => {
                  this.createdby = res[0]
                  console.log(this.createdby)
                  console.log(this.createdby.name)
                }, err => {

                })

              /**
               * idmember
               */


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
    this.selectedrow = index;

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
        this._service.removeBeneficiary(id)
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
    localStorage.setItem('idmember', JSON.stringify(this.memberId));
    sessionStorage.setItem('fromMemberDetails', JSON.stringify(true));
    this._router.navigate(['/members/editmember']);
  }


  editbeneficiary(index, id, NAME, SURNAME, IDNUMBER) {
    this.selectedrow = index;



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
          this.BenefitName = NAME
        } else {
          this.BenefitName = $('#Name').val()
        }

        // NEW BENEFICIARY SURNAME
        if ($('#Surname').val() == '' || isNullOrUndefined($('#Surname').val())) {
          this.BenefitSurname = SURNAME
        } else {
          this.BenefitSurname = $('#Surname').val()
        }

        // NEW BENEFICIARY ID NUMBER
        if ($('#IDNumber').val() == '' || isNullOrUndefined($('#IDNumber').val())) {
          this.BenefitIdNumber = IDNUMBER
        } else {
          this.BenefitIdNumber = $('#IDNumber').val()
        }



        this._service.updateBeneficiary(id, { 'idmember': this.memberId, 'name': this.BenefitName, 'surname': this.BenefitSurname, 'identitynumber': this.BenefitIdNumber })
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
    let surnameEmp
    let idnumberEmp

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


        this._service.createMemberBeneficiary({ 'idmember': this.memberId, 'createddate': this.date, 'idlifestatus': 1, 'identitynumber': $('#IDNumber').val(), 'name': $('#Name').val(), 'surname': $('#Surname').val() })
          .subscribe(ben => {
            console.log(ben)

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

  // View member details
  claimInfo(index, idclaim) {
    this.selectedClaim = index;
    
    localStorage.setItem('idclaim', JSON.stringify(idclaim));
    this._router.navigate(['/claims/claiminfo']);
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


}


/*

        // NEW BENEFICIARY NAME
        if ($('#Name').val() == '' || isNullOrUndefined($('#Name').val())) {
          this.BenefitName = NAME
        } else {
          this.BenefitName = $('#Name').val()
        }

        // NEW BENEFICIARY SURNAME
        if ($('#Surname').val() == '' || isNullOrUndefined($('#Surname').val())) {
          this.BenefitSurname = SURNAME
        } else {
          this.BenefitSurname = $('#Surname').val()
        }

        // NEW BENEFICIARY ID NUMBER
        if ($('#IDNumber').val() == '' || isNullOrUndefined($('#IDNumber').val())) {
          this.BenefitIdNumber = IDNUMBER
        } else {
          this.BenefitIdNumber = $('#IDNumber').val()
        }
PAYMENTS
            "idlastPaid": 114,
            "date": "2019-5-31 16:25:30",   Jan 27, 2015
            "amount": "0",
            "membershipnumber": "2019162530"


January 29, 2015 at 16:58


"response": [
        {
            "idBeneficiaries": 77,
            "membershipnumber": "2019163142",
            "name": "Thato",
            "surname": "iuurtfy",
            "idnumber": "123123123123123",
            "date": "2019-5-31 16:31:42"
        }
    ]

.



*/
