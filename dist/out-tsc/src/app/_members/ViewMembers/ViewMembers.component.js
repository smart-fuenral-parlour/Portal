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
import { AppComponent } from 'src/app/app.component';
import { MemberService } from 'src/app/services/member/member.service';
var ViewMembersComponent = /** @class */ (function () {
    function ViewMembersComponent(memberSerice, _service, _router, app) {
        this.memberSerice = memberSerice;
        this._service = _service;
        this._router = _router;
        this.app = app;
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
    ViewMembersComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('iduser') != '') {
            this.iduser = JSON.parse(localStorage.getItem('iduser'));
            console.log(this.iduser);
        }
        this.app.loading = false;
        sessionStorage.clear();
    };
    //Search member
    ViewMembersComponent.prototype.searchMember = function (searchInput, selectedSearchType) {
        var _this = this;
        this.isEmpty = false;
        this.searchResult = false;
        this.notFound = false;
        console.log(searchInput);
        if (searchInput == '' || isNullOrUndefined(searchInput)) {
            this.searchResult = false;
            this.notFound = false;
            this.isEmpty = true;
        }
        else {
            this.isEmpty = false;
            this.searchResult = false;
            this.notFound = false;
            if (selectedSearchType == 'Membership Number') {
                this.app.loading = true;
                this.memberSerice.getMember(searchInput)
                    //this._service.searchMemberByMembershipNumber(searchInput)
                    .subscribe(function (member_res) {
                    _this.response = member_res;
                    if (_this.response.length > 0) {
                        console.log('Search By Membership Number');
                        var x_1 = 0;
                        for (var i = 0; i < _this.response.length; i++) {
                            _this._service.getLifestatus(_this.response[i].idlifestatus)
                                .subscribe(function (lifestatus_res) {
                                _this.members.push({
                                    'idmember': _this.response[x_1].idmember,
                                    'membershipnumber': _this.response[x_1].membershipnumber,
                                    'name': _this.response[x_1].name,
                                    'surname': _this.response[x_1].surname,
                                    'createddate': _this.response[x_1].createddate,
                                    'identitynumber': _this.response[x_1].identitynumber,
                                    'lifestatus': lifestatus_res[0].name
                                });
                                x_1++;
                            }, function (err) {
                                console.log(err);
                            });
                        }
                        _this.app.loading = false;
                        _this.notFound = false;
                        _this.searchResult = true;
                    }
                    else {
                        console.log('NO MEMBERS FOUND');
                        _this.app.loading = false;
                        _this.searchResult = false;
                        _this.notFound = true;
                    }
                }, function (err) {
                    console.log(err);
                });
            }
            else if (selectedSearchType == 'Surname') {
                this.app.loading = true;
                this._service.searchMemberBySurname(searchInput)
                    .subscribe(function (res) {
                    _this.response = res;
                    if (_this.response.length > 0) {
                        console.log('Search By Surname');
                        _this.members = [];
                        var x_2 = 0;
                        for (var i = 0; i < _this.response.length; i++) {
                            _this._service.getLifestatus(_this.response[i].idlifestatus)
                                .subscribe(function (lifeS) {
                                _this.members.push({
                                    'idmember': _this.response[x_2].idmember,
                                    'membershipnumber': _this.response[x_2].membershipnumber,
                                    'name': _this.response[x_2].name,
                                    'surname': _this.response[x_2].surname,
                                    'createddate': _this.response[x_2].createddate,
                                    'identitynumber': _this.response[x_2].identitynumber,
                                    'lifestatus': lifeS[0].name
                                });
                                x_2++;
                            }, function (err) {
                                console.log(err);
                            });
                        }
                        _this.app.loading = false;
                        _this.notFound = false;
                        _this.searchResult = true;
                    }
                    else {
                        console.log('NO MEMBERS FOUND');
                        _this.app.loading = false;
                        _this.searchResult = false;
                        _this.notFound = true;
                    }
                }, function (err) {
                    console.log(err);
                });
            }
            else if (searchInput.length == 13 || selectedSearchType == 'ID Number') {
                this.app.loading = true;
                this._service.searchMemberByIdNumber(searchInput)
                    .subscribe(function (res) {
                    _this.response = res;
                    if (_this.response.length > 0) {
                        console.log('Search By ID Number');
                        _this.members = [];
                        var x = 0;
                        for (var i = 0; i < _this.response.length; i++) {
                            _this.members.push({
                                'idmember': _this.response[x].idmember,
                                'membershipnumber': _this.response[x].membershipnumber,
                                'name': _this.response[i].name,
                                'surname': _this.response[i].surname,
                                'createddate': _this.response[i].createddate,
                                'identitynumber': _this.response[i].identitynumber
                            });
                            _this._service.getLifestatus(_this.response[i].idlifestatus)
                                .subscribe(function (lifeS) {
                                console.log(lifeS);
                                /*
                              this.members.push({
                                'idmember': this.response[x].idmember,
                                'membershipnumber': this.response[x].membershipnumber,
                                'name': this.response[x].name,
                                'surname': this.response[x].surname,
                                'createddate': this.response[x].createddate,
                                'identitynumber': this.response[x].identitynumber,
                                'lifestatus': lifeS[0].name
                              })
                              x++
                                 */
                            }, function (err) {
                                console.log();
                            });
                        }
                        _this.app.loading = false;
                        _this.notFound = false;
                        _this.searchResult = true;
                    }
                    else {
                        console.log('NO MEMBERS FOUND');
                        _this.app.loading = false;
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
    ViewMembersComponent.prototype.selectSearchType = function (selectedSearchType) {
        this.searchText = selectedSearchType;
        console.log(this.searchText);
    };
    ViewMembersComponent.prototype.changeEmpty = function () {
        this.isEmpty = false;
        this.invalidID = false;
    };
    // Edit a member
    ViewMembersComponent.prototype.editMember = function (index, idmember) {
        this.selectedrow = index;
        // localStorage.setItem('idmember', JSON.stringify(idmember));
        sessionStorage.clear();
        //this._router.navigate(['/members/editmember']);
    };
    // View full member details
    ViewMembersComponent.prototype.viewMember = function (index, idmember) {
        this.selectedrow = index;
        localStorage.setItem('idmember', JSON.stringify(idmember));
        this._router.navigate(['/members/viewmemberdetails']);
    };
    // Delete a member
    ViewMembersComponent.prototype.deleteMember = function (index, idmember) {
        var _this = this;
        this.selectedrow = index;
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
                _this._service.removeMember(idmember)
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
    ViewMembersComponent = __decorate([
        Component({
            selector: 'app-ViewMembers',
            templateUrl: './ViewMembers.component.html',
            styleUrls: ['./ViewMembers.component.css']
        }),
        __metadata("design:paramtypes", [MemberService, ServiceService, Router, AppComponent])
    ], ViewMembersComponent);
    return ViewMembersComponent;
}());
export { ViewMembersComponent };
//# sourceMappingURL=ViewMembers.component.js.map