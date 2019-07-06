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
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component';
var CreateClaimComponent = /** @class */ (function () {
    function CreateClaimComponent(app, _service, _router) {
        this.app = app;
        this._service = _service;
        this._router = _router;
        this.searchText = 'ID Number';
        this.isEmpty = false;
        this.searchResult = false;
        this.notFound = false;
        this.invalidID = false;
        this.Types = [
            { id: 1, value: 'ID Number', viewValue: 'ID Number' },
            { id: 2, value: 'Surname', viewValue: 'Surname' }
        ];
    }
    CreateClaimComponent.prototype.ngOnInit = function () {
        this.app.loading = false;
    };
    //Search member
    CreateClaimComponent.prototype.searchMember = function () {
        var _this = this;
        this.isEmpty = false;
        this.searchResult = false;
        this.notFound = false;
        this.searchInput = document.querySelector('#searchBox');
        console.log('Search By: ' + this.selectedSearchType);
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
                    if (_this.response.length > 0) {
                        console.log('Search By Membership Number');
                        _this.notFound = false;
                        _this.isEmpty = false;
                        _this.searchResult = true;
                    }
                    else {
                        console.log('NO MEMBERS FOUND');
                        _this.searchResult = false;
                        _this.isEmpty = false;
                        _this.notFound = true;
                    }
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                if (this.selectedSearchType == 'Surname') {
                    this._service.searchMemberBySurname(this.searchInput.value)
                        .subscribe(function (res) {
                        _this.response = res;
                        if (_this.response.length > 0) {
                            console.log('Search By Surname');
                            _this.notFound = false;
                            _this.isEmpty = false;
                            _this.searchResult = true;
                        }
                        else {
                            console.log('NO MEMBERS FOUND');
                            _this.searchResult = false;
                            _this.isEmpty = false;
                            _this.notFound = true;
                        }
                    }, function (err) { console.log(err); });
                }
                else {
                    if (this.searchInput.value.length == 13) {
                        this._service.searchMemberByIdNumber(this.searchInput.value)
                            .subscribe(function (res) {
                            _this.response = res;
                            if (_this.response.length > 0) {
                                console.log('Search By ID Number');
                                _this.isEmpty = false;
                                _this.notFound = false;
                                _this.searchResult = true;
                            }
                            else {
                                console.log('NO MEMBERS FOUND');
                                _this.isEmpty = false;
                                _this.searchResult = false;
                                _this.notFound = true;
                            }
                        }, function (err) { return console.log(err); });
                    }
                    else {
                        this.notFound = false;
                        this.searchResult = false;
                        this.isEmpty = false;
                        this.invalidID = true;
                    }
                }
            }
        }
    };
    CreateClaimComponent.prototype.selectSearchType = function () {
        this.searchText = this.selectedSearchType;
    };
    CreateClaimComponent.prototype.changeEmpty = function () {
        this.isEmpty = false;
        this.invalidID = false;
    };
    // Create Claim
    CreateClaimComponent.prototype.createClaim = function (index, idmember) {
        this.selectedrow = index;
        localStorage.setItem('idmember', JSON.stringify(idmember));
        this._router.navigate(['/claims/createclaimformember']);
    };
    CreateClaimComponent = __decorate([
        Component({
            selector: 'app-CreateClaim',
            templateUrl: './CreateClaim.component.html',
            styleUrls: ['./CreateClaim.component.css']
        }),
        __metadata("design:paramtypes", [AppComponent, ServiceService, Router])
    ], CreateClaimComponent);
    return CreateClaimComponent;
}());
export { CreateClaimComponent };
//# sourceMappingURL=CreateClaim.component.js.map