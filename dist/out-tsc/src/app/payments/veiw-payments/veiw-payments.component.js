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
import { isNullOrUndefined } from 'util';
;
var VeiwPaymentsComponent = /** @class */ (function () {
    function VeiwPaymentsComponent(_service, _router) {
        this._service = _service;
        this._router = _router;
        this.searchText = 'ID Number';
        this.isEmpty = false;
        this.searchResult = false;
        this.notFound = false;
        this.invalidID = false;
        this.Types = [
            { id: 1, value: 'Membership Number', viewValue: 'Membership Number' },
            { id: 2, value: 'ID Number', viewValue: 'ID Number' },
            { id: 3, value: 'Surname', viewValue: 'Surname' }
        ];
    }
    VeiwPaymentsComponent.prototype.ngOnInit = function () {
        sessionStorage.clear();
    };
    VeiwPaymentsComponent.prototype.click = function (index, id) {
    };
    //Search member
    VeiwPaymentsComponent.prototype.searchMember = function () {
        var _this = this;
        this.isEmpty = false;
        this.searchResult = false;
        this.notFound = false;
        this.searchInput = document.querySelector('#searchBox');
        console.log(this.selectedSearchType);
        console.log(this.searchInput.value);
        if (this.searchInput.value == '' || isNullOrUndefined(this.searchInput.value)) {
            this.searchResult = false;
            this.notFound = false;
            this.isEmpty = true;
        }
        else {
            this.isEmpty = false;
            this.searchResult = false;
            this.notFound = false;
            if (this.selectedSearchType == 'Membership Number') {
                this._service.searchMemberByMembershipNumber(this.searchInput.value)
                    .subscribe(function (res) {
                    _this.response = res;
                    console.log(_this.members);
                    if (_this.response.response.length > 0) {
                        console.log('Search By Membership Number');
                        _this.notFound = false;
                        _this.searchResult = true;
                    }
                    else {
                        console.log('NO MEMBERS FOUND');
                        _this.searchResult = false;
                        _this.notFound = true;
                    }
                }, function (err) {
                    console.log(err);
                    console.log(_this.response.error);
                });
            }
            else if (this.selectedSearchType == 'Surname') {
                this._service.searchMemberBySurname(this.searchInput.value)
                    .subscribe(function (res) {
                    _this.response = res;
                    if (_this.response.response.length > 0) {
                        console.log('Search By Surname');
                        _this.notFound = false;
                        _this.searchResult = true;
                    }
                    else {
                        console.log('NO MEMBERS FOUND');
                        _this.searchResult = false;
                        _this.notFound = true;
                    }
                }, function (err) { return console.log(err); });
            }
            else if (this.searchInput.value.length == 13 || this.selectedSearchType == 'ID Number') {
                this._service.searchMemberByIdNumber(this.searchInput.value)
                    .subscribe(function (res) {
                    _this.response = res;
                    console.log(_this.members);
                    if (_this.response.response.length > 0) {
                        console.log('Search By ID Number');
                        _this.notFound = false;
                        _this.searchResult = true;
                    }
                    else {
                        console.log('NO MEMBERS FOUND');
                        _this.searchResult = false;
                        _this.notFound = true;
                    }
                }, function (err) { return console.log(err); });
            }
            else {
                this.invalidID = true;
            }
        }
    };
    VeiwPaymentsComponent.prototype.selectSearchType = function () {
        this.searchText = this.selectedSearchType;
    };
    VeiwPaymentsComponent.prototype.changeEmpty = function () {
        this.isEmpty = false;
        this.invalidID = false;
    };
    // Edit a member
    VeiwPaymentsComponent.prototype.editMember = function (index, id) {
        this.selectedrow = index;
        console.log('Member ID: ' + id);
        localStorage.setItem('id', JSON.stringify(id));
        this._router.navigate(['/members/editmember']);
    };
    // View member details
    VeiwPaymentsComponent.prototype.viewMember = function (index, id) {
        this.selectedrow = index;
        console.log('Member ID: ' + id);
        localStorage.setItem('id', JSON.stringify(id));
        this._router.navigate(['/members/viewmemberdetails']);
    };
    // Delete a member
    VeiwPaymentsComponent.prototype.deleteMember = function (index, id) {
        var _this = this;
        this.selectedrow = index;
        console.log('Member ID: ' + id);
        swal({
            title: 'Delete This Member',
            text: "Are you sure?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            cancelButtonText: 'No, Do not Delete',
            confirmButtonText: 'Yes, Delete',
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                _this._service.removeMember(id)
                    .subscribe(function (res) {
                    console.log(res);
                }, function (err) { return console.log(err); });
                swal({
                    title: 'Member Deleted',
                    //text: 'Member Deleted',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                }).then(function (result) { return window.location.reload(); });
            }
        });
    };
    VeiwPaymentsComponent = __decorate([
        Component({
            selector: 'app-veiw-payments',
            templateUrl: './veiw-payments.component.html',
            styleUrls: ['./veiw-payments.component.css']
        }),
        __metadata("design:paramtypes", [ServiceService, Router])
    ], VeiwPaymentsComponent);
    return VeiwPaymentsComponent;
}());
export { VeiwPaymentsComponent };
//# sourceMappingURL=veiw-payments.component.js.map