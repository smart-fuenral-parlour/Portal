var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
var MemberDetailsComponent = /** @class */ (function () {
    function MemberDetailsComponent(fb, _service, _router, app) {
        this.fb = fb;
        this._service = _service;
        this._router = _router;
        this.app = app;
        this.society = false;
        this.noBeneficiary = false;
        this.BenefitSurname = [];
        this.editTextBox = false;
        this.Nopayment = false;
        this.payment_toNULL = false;
        this.claim_toNULL = false;
        this.payment_fromNULL = false;
        this.claim_fromNULL = false;
        this.paymentTable = false;
        this.claimTable = false;
        this.addForm = this.fb.group({
            items: [null, Validators.required],
            items_value: ['no', Validators.required]
        });
        this.rows = this.fb.array([]);
    }
    MemberDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.app.loading = true;
        // test if member is from a society
        if (!isNullOrUndefined(sessionStorage.getItem('greenlinks'))) {
            this.society = true;
        }
        if (localStorage.getItem('iduser') != null) {
            this.iduser = localStorage.getItem('iduser');
        }
        if (localStorage.getItem('idmember') != null) {
            this.getID = JSON.parse(localStorage.getItem('idmember'));
            this._service.getSingleMember(this.getID)
                .subscribe(function (member1) {
                _this.singleMember = member1;
                _this.firstName = _this.singleMember[0].name;
                _this.lastName = _this.singleMember[0].surname;
                _this.idnumber = _this.singleMember[0].identitynumber;
                _this.email = _this.singleMember[0].email;
                _this.housenumber = _this.singleMember[0].housenumber;
                _this.streetname = _this.singleMember[0].streetname;
                _this.suburb = _this.singleMember[0].suburb;
                _this.province = _this.singleMember[0].province;
                _this.contact = _this.singleMember[0].contactnumber;
                _this.membershipNumber = _this.singleMember[0].membershipnumber;
                _this.memberId = _this.singleMember[0].idmember;
                /**/ _this.policystatus = 'Active'; //this.singleMember[0].policystatus
                _this.date = _this.singleMember[0].createddate;
                /***/ _this.createdby = 'SYSTEM'; //this.singleMember[0].createdby
                _this.gender = _this.singleMember[0].gender;
                _this.noBeneficiary = false;
                _this._service.getMemberBeneficiary(_this.memberId)
                    .subscribe(function (ben) {
                    _this.beneficiaries = ben;
                    console.log(ben);
                    if (_this.beneficiaries.length == 0) {
                        _this.noBeneficiary = true;
                    }
                    else {
                        _this.noBeneficiary = false;
                    }
                    _this.app.loading = false;
                    console.log(_this.memberId);
                    _this._service.getUser(_this.iduser)
                        .subscribe(function (res) {
                        _this.createdby = res[0];
                        console.log(_this.createdby);
                        console.log(_this.createdby.name);
                        _this._service.getMemberPayments(_this.membershipNumber)
                            .subscribe(function (pays) {
                            _this.payments = pays;
                            /*
                                                  this._service.getMemberPolicyDetails(this.memberId)
                                                    .subscribe(policyD => {
                            
                                                    }, err => {
                            
                                                    })
                            */
                        }, function (err) {
                            console.log(err);
                        });
                    }, function (err) {
                        console.log(err);
                    });
                    /**
                     * idmember
                     */
                }, function (err) {
                    _this.app.loading = false;
                    console.log(err);
                });
                if (_this.policystatus = 'Active') {
                    _this.policycolor = 'text-success';
                }
                else {
                    _this.policycolor = 'text-danger';
                }
                if (_this.lifestatus = 'Alive') {
                    _this.lifecolor = 'text-success';
                }
                else {
                    _this.lifecolor = 'text-danger';
                }
            }, function (err) {
                _this.app.loading = false;
                console.log(err);
            });
        }
        else {
            return null;
        }
    };
    MemberDetailsComponent.prototype.deleteBeneficiary = function (index, id, NAME, SURNAME) {
        var _this = this;
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
        }).then(function (result) {
            if (result.value) {
                _this._service.removeBeneficiary(id)
                    .subscribe(function (res) {
                    console.log(res);
                }, function (err) {
                    console.log(err);
                });
                swal({
                    title: 'Deleted',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                }).then(function (result) { return window.location.reload(); });
            }
        });
    };
    MemberDetailsComponent.prototype.onAddRow = function () {
        this.rows.push(this.createItemFormGroup());
    };
    MemberDetailsComponent.prototype.onRemoveRow = function (rowIndex) {
        this.rows.removeAt(rowIndex);
    };
    MemberDetailsComponent.prototype.createItemFormGroup = function () {
        return this.fb.group({
            name: null,
            descriptions: null,
            qty: null
        });
    };
    // Edit a member
    MemberDetailsComponent.prototype.editMember = function () {
        // this.selectedrow = index;
        localStorage.setItem('idmember', JSON.stringify(this.memberId));
        sessionStorage.setItem('fromMemberDetails', JSON.stringify(true));
        this._router.navigate(['/members/editmember']);
    };
    MemberDetailsComponent.prototype.editbeneficiary = function (index, id, NAME, SURNAME, IDNUMBER) {
        var _this = this;
        this.selectedrow = index;
        swal({
            title: 'Edit Beneficiary',
            html: '<div class="row">' +
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
        }).then(function (result) {
            if (result.value) {
                _this.app.loading = true;
                // NEW BENEFICIARY NAME
                if ($('#Name').val() == '' || isNullOrUndefined($('#Name').val())) {
                    _this.BenefitName = NAME;
                }
                else {
                    _this.BenefitName = $('#Name').val();
                }
                // NEW BENEFICIARY SURNAME
                if ($('#Surname').val() == '' || isNullOrUndefined($('#Surname').val())) {
                    _this.BenefitSurname = SURNAME;
                }
                else {
                    _this.BenefitSurname = $('#Surname').val();
                }
                // NEW BENEFICIARY ID NUMBER
                if ($('#IDNumber').val() == '' || isNullOrUndefined($('#IDNumber').val())) {
                    _this.BenefitIdNumber = IDNUMBER;
                }
                else {
                    _this.BenefitIdNumber = $('#IDNumber').val();
                }
                _this._service.updateBeneficiary(id, { 'idmember': _this.memberId, 'name': _this.BenefitName, 'surname': _this.BenefitSurname, 'identitynumber': _this.BenefitIdNumber })
                    .subscribe(function (res) {
                    _this.app.loading = false;
                    console.log(res);
                    swal({
                        title: 'Updates Succesfully Saved',
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false
                    }).then(function (result) { return window.location.reload(); });
                }, function (err) {
                    _this.app.loading = false;
                    console.log(err);
                });
            }
        });
    };
    MemberDetailsComponent.prototype.createBeneficiary = function () {
        var _this = this;
        var nameEmp = 'hidden';
        var surnameEmp;
        var idnumberEmp;
        swal({
            title: 'Create Beneficiary',
            html: '<div class="row">' +
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
        }).then(function (result) {
            if (result.value) {
                _this._service.createMemberBeneficiary({ 'idmember': _this.memberId, 'createddate': _this.date, 'idlifestatus': 1, 'identitynumber': $('#IDNumber').val(), 'name': $('#Name').val(), 'surname': $('#Surname').val() })
                    .subscribe(function (ben) {
                    console.log(ben);
                }, function (err) {
                    console.log(err);
                });
                swal({
                    title: 'Updates Succesfully Saved',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                }).then(function (result) { return window.location.reload(); });
            }
        });
    };
    MemberDetailsComponent.prototype.fromEnable = function () {
        if (this.claim_fromNULL) {
            this.claim_fromNULL = false;
        }
        if (this.payment_fromNULL) {
            this.payment_fromNULL = false;
        }
    };
    MemberDetailsComponent.prototype.toEnable = function () {
        if (this.claim_toNULL) {
            this.claim_toNULL = false;
        }
        if (this.payment_toNULL) {
            this.payment_toNULL = false;
        }
    };
    MemberDetailsComponent.prototype.searchClaim = function () {
        this.toDate = document.querySelector('#ClaimtoDate');
        this.fromDate = document.querySelector('#ClaimfromDate');
        if (this.toDate.value == '') {
            this.claim_toNULL = true;
        }
        if (this.fromDate.value == '') {
            this.claim_fromNULL = true;
        }
        if (!this.claim_fromNULL && !this.claim_toNULL) {
            this.claimTable = true;
        }
        else {
            this.claimTable = false;
        }
    };
    // View member details
    MemberDetailsComponent.prototype.claimInfo = function (index, idclaim) {
        this.selectedClaim = index;
        localStorage.setItem('idclaim', JSON.stringify(idclaim));
        this._router.navigate(['/claims/claiminfo']);
    };
    MemberDetailsComponent.prototype.searchPayments = function () {
        this.toDate = document.querySelector('#PaymenttoDate');
        this.fromDate = document.querySelector('#PaymentfromDate');
        if (this.toDate.value == '') {
            this.payment_toNULL = true;
        }
        if (this.fromDate.value == '') {
            this.payment_fromNULL = true;
        }
        if (!this.payment_fromNULL && !this.payment_toNULL) {
            this.paymentTable = true;
        }
        else {
            this.paymentTable = false;
        }
    };
    MemberDetailsComponent = __decorate([
        Component({
            selector: 'app-MemberDetails',
            templateUrl: './MemberDetails.component.html',
            styleUrls: ['./MemberDetails.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, ServiceService, Router, AppComponent])
    ], MemberDetailsComponent);
    return MemberDetailsComponent;
}());
export { MemberDetailsComponent };
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
//# sourceMappingURL=MemberDetails.component.js.map