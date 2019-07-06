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
import { AppComponent } from 'src/app/app.component';
var ViewPaymentsComponent = /** @class */ (function () {
    function ViewPaymentsComponent(app) {
        this.app = app;
        this.toNULL = false;
        this.fromNULL = false;
        this.table = false;
    }
    ViewPaymentsComponent.prototype.ngOnInit = function () {
        this.app.loading = false;
        this.toDate = document.querySelector('#toDate');
        this.fromDate = document.querySelector('#fromDate');
    };
    ViewPaymentsComponent.prototype.fromEnable = function () {
        this.fromNULL = false;
    };
    ViewPaymentsComponent.prototype.toEnable = function () {
        this.toNULL = false;
    };
    ViewPaymentsComponent.prototype.searchClaim = function () {
        if (this.toDate.value == '') {
            this.toNULL = true;
        }
        if (this.fromDate.value == '') {
            this.fromNULL = true;
        }
        if (!this.fromNULL && !this.toNULL) {
            this.table = true;
        }
        else {
            this.table = false;
        }
    };
    ViewPaymentsComponent = __decorate([
        Component({
            selector: 'app-ViewPayments',
            templateUrl: './ViewPayments.component.html',
            styleUrls: ['./ViewPayments.component.css']
        }),
        __metadata("design:paramtypes", [AppComponent])
    ], ViewPaymentsComponent);
    return ViewPaymentsComponent;
}());
export { ViewPaymentsComponent };
//# sourceMappingURL=ViewPayments.component.js.map