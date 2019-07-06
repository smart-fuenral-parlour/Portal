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
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';
var EditMemberComponent = /** @class */ (function () {
    function EditMemberComponent(app, _service, _router) {
        this.app = app;
        this._service = _service;
        this._router = _router;
        this.JSONData = {};
        /////////SOCIETY////////////  
        this.society = false;
        this.myProvinces = [
            { value: 'Gauteng', name: 'Gauteng', abrv: 'GP' },
            { value: 'Limpopo', name: 'Limpopo', abrv: 'L' },
            { value: 'Mpumalanga', name: 'Mpumalanga', abrv: 'MP' },
            { value: 'Free State', name: 'Free State', abrv: 'FS' },
            { value: 'North West', name: 'North West', abrv: 'NW' },
            { value: 'Northern Cape', name: 'Northern Cape', abrv: 'NC' },
            { value: 'Eastern Cape', name: 'Eastern Cape', abrv: 'EC' },
            { value: 'Western Cape', name: 'Western Cape', abrv: 'WC' },
            { value: 'Kwazulu Natal', name: 'Kwazulu Natal', abrv: 'KZN' },
        ];
        this.myGenders = [
            { value: 'Male', name: 'Male', abrv: 'M' },
            { value: 'Female', name: 'Female', abrv: 'F' }
        ];
        if (!isNullOrUndefined(sessionStorage.getItem('greenlinks'))) {
            this.society = true;
        }
        // GETTING NAME OF THE CREATOR
        if (!isNullOrUndefined(localStorage.getItem('name'))) {
            this.creator = JSON.parse(localStorage.getItem('name'));
        }
        else {
            this.creator = 'System';
        }
    }
    EditMemberComponent.prototype.ngOnInit = function () {
        /* SOCIETIES
            this._service.getSociety()
              .subscribe(res => {
                this.response = res
                this.societies = this.response.response
                console.log(this.societies)
              },
                err => console.log(err)
              )
        */
        var _this = this;
        if (localStorage.getItem('iduser') != '') {
            this.iduser = JSON.parse(localStorage.getItem('iduser'));
            console.log(this.iduser);
        }
        this.fname = document.querySelector('#name');
        this.lname = document.querySelector('#surname');
        this.email = document.querySelector('#email');
        this.suburb = document.querySelector('#suburb');
        this.street = document.querySelector('#street');
        this.idnumber = document.querySelector('#idnumber');
        this.house = document.querySelector('#house');
        this.contact = document.querySelector('#contact');
        if (localStorage.getItem('idmember') != null) {
            this.ID = JSON.parse(localStorage.getItem('idmember'));
            this.app.loading = true;
            this._service.getSingleMember(this.ID)
                .subscribe(function (res) {
                _this.response = res;
                _this.gender = _this.response[0].gender;
                _this.myLifeStatus = _this.response[0].name;
                _this.province = _this.response[0].province;
                _this.membershipID = _this.response[0].membershipnumber;
                _this.idmember = _this.response[0].idmember;
                _this.idlifestatus = _this.response[0].idlifestatus;
                _this._service.getAllPolicyType()
                    .subscribe(function (policyT) {
                    _this.policyType = policyT;
                }, function (err) {
                    console.log(err);
                });
                _this.app.loading = false;
            }, function (err) {
                _this.app.loading = false;
                console.log(err);
            });
        }
        else {
            return null;
        }
    };
    EditMemberComponent.prototype.updateMember = function () {
        var _this = this;
        this.fname = document.querySelector('#name');
        this.fname = document.querySelector('#name');
        this.lname = document.querySelector('#surname');
        this.email = document.querySelector('#email');
        this.suburb = document.querySelector('#suburb');
        this.street = document.querySelector('#street');
        this.idnumber = document.querySelector('#idnumber');
        this.house = document.querySelector('#house');
        this.contact = document.querySelector('#contact');
        // NAME /////////////////
        if (isNullOrUndefined(this.fname.value) || this.fname.value == "") {
            this.newNAME = this.fname.placeholder;
        }
        else {
            this.newNAME = this.fname.value;
        }
        // SURNAME /////////////////
        if (isNullOrUndefined(this.lname.value) || this.lname.value == "") {
            this.newSURNAME = this.lname.placeholder;
        }
        else {
            this.newSURNAME = this.lname.value;
        }
        // IDNUMBER ///////////////// 
        if (isNullOrUndefined(this.idnumber.value) || this.idnumber.value == "") {
            this.newIDNUMBER = this.idnumber.placeholder;
        }
        else {
            this.newIDNUMBER = this.idnumber.value;
        }
        // EMAIL ///////////////// 
        if (isNullOrUndefined(this.email.value) || this.email.value == "") {
            this.newEMAIL = this.email.placeholder;
        }
        else {
            this.newEMAIL = this.email.value;
        }
        // GENDER ///////////////// 
        if (isNullOrUndefined(this.selectedGender) || this.selectedGender == "") {
            this.newGENDER = this.gender;
        }
        else {
            this.newGENDER = this.selectedGender;
        }
        // PROVINCE ///////////////// 
        if (isNullOrUndefined(this.selectedProvince) || this.selectedProvince == "") {
            this.newPROVINCE = this.province;
        }
        else {
            this.newPROVINCE = this.selectedProvince;
        }
        // SUBURB ///////////////// 
        if (isNullOrUndefined(this.suburb.value) || this.suburb.value == "") {
            this.newSUBURB = this.suburb.placeholder;
        }
        else {
            this.newSUBURB = this.suburb.value;
        }
        // HOUSE NUMBER /////////////////
        if (isNullOrUndefined(this.house.value) || this.house.value == "") {
            this.newHOUSE = this.house.placeholder;
        }
        else {
            this.newHOUSE = this.house.value;
        }
        // CONTACT NUMBER ///////////////// 
        if (isNullOrUndefined(this.contact.value) || this.contact.value == "") {
            this.newCONTACT = this.contact.placeholder;
        }
        else {
            this.newCONTACT = this.contact.value;
        }
        // STREET NAME /////////////////  
        if (isNullOrUndefined(this.street.value) || this.street.value == "") {
            this.newSTREET = this.street.placeholder;
        }
        else {
            this.newSTREET = this.street.value;
        }
        this.JSONData = {
            'name': this.newNAME,
            'surname': this.newSURNAME,
            'identitynumber': this.newIDNUMBER,
            'email': this.newEMAIL,
            'contactnumber': this.newCONTACT,
            'gender': this.newGENDER,
            'housenumber': this.newHOUSE,
            'streetname': this.newSTREET,
            'suburb': this.newSUBURB,
            'province': this.newPROVINCE,
            'iduser': this.iduser
        };
        //{"name":"YEBO","surname":"","idnumber":"","email":"","contactnumber":"","gender":"","housenumber":"","streetname":"","suburb":"","province":"","birthyear":""}
        swal({
            title: 'Update Membership ID:',
            text: this.membershipID,
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Save update',
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                if (localStorage.getItem('idmember') != null) {
                    _this.ID = JSON.parse(localStorage.getItem('idmember'));
                    _this.app.loading = true;
                    _this._service.updateMember(_this.ID, _this.JSONData)
                        .subscribe(function (res) {
                        _this.response = res;
                        if (_this.response.length > 0) {
                            console.log(_this.response);
                        }
                        console.log('Member Updated');
                        //  window.location.reload()
                    }, function (err) { console.log(err); });
                }
                else {
                    console.log('NO USER ID');
                }
                swal({
                    title: 'Member Updated',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                }).then(function (result) { if (sessionStorage.getItem('fromMemberDetails') == 'true') {
                    _this._router.navigate(['/members/viewmemberdetails']);
                }
                else {
                    _this._router.navigate(['/members/searchmember']);
                } });
            }
        });
    };
    EditMemberComponent = __decorate([
        Component({
            selector: 'app-EditMember',
            templateUrl: './EditMember.component.html',
            styleUrls: ['./EditMember.component.css']
        }),
        __metadata("design:paramtypes", [AppComponent, ServiceService, Router])
    ], EditMemberComponent);
    return EditMemberComponent;
}());
export { EditMemberComponent };
//# sourceMappingURL=EditMember.component.js.map