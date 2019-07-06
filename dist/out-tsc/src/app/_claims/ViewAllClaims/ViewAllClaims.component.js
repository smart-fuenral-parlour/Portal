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
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';
var ViewAllClaimsComponent = /** @class */ (function () {
    function ViewAllClaimsComponent(app, _router) {
        this.app = app;
        this._router = _router;
        this.toNULL = false;
        this.fromNULL = false;
        this.isEmpty = false;
        this.invalidID = false;
        this.table = false;
        this.notFound = false;
        this.Types = [
            { id: 1, value: 'Approved', viewValue: 'Approved' },
            { id: 2, value: 'Declined', viewValue: 'Declined' },
            { id: 3, value: 'Pending', viewValue: 'Pending' }
        ];
    }
    ViewAllClaimsComponent.prototype.ngOnInit = function () {
        this.app.loading = false;
        this.toDate = document.querySelector('#toDate');
        this.fromDate = document.querySelector('#fromDate');
    };
    ViewAllClaimsComponent.prototype.fromEnable = function () {
        this.fromNULL = false;
    };
    ViewAllClaimsComponent.prototype.toEnable = function () {
        this.toNULL = false;
    };
    ViewAllClaimsComponent.prototype.searchClaim = function () {
        console.log(this.selectedClaimType);
        console.log(isNullOrUndefined(this.selectedClaimType));
        this.selectedClaimTypeText = this.selectedClaimType;
        if (isNullOrUndefined(this.selectedClaimType)) {
            this.table = false;
            this.notFound = false;
            this.isEmpty = true;
        }
        else {
            this.notFound = false;
            this.isEmpty = false;
            this.table = true;
        }
    };
    // View member details
    ViewAllClaimsComponent.prototype.claimInfo = function (index) {
        this.selectedClaim = index;
        // console.log('Member ID: ' + id);
        localStorage.setItem('idclaim', JSON.stringify(5));
        this._router.navigate(['/claims/claiminfo']);
    };
    ViewAllClaimsComponent.prototype.changeEmpty = function () {
        this.isEmpty = false;
        this.invalidID = false;
    };
    ViewAllClaimsComponent = __decorate([
        Component({
            selector: 'app-ViewAllClaims',
            templateUrl: './ViewAllClaims.component.html',
            styleUrls: ['./ViewAllClaims.component.css']
        }),
        __metadata("design:paramtypes", [AppComponent, Router])
    ], ViewAllClaimsComponent);
    return ViewAllClaimsComponent;
}());
export { ViewAllClaimsComponent };
//# sourceMappingURL=ViewAllClaims.component.js.map