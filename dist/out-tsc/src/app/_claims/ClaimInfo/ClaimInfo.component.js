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
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
var ClaimInfoComponent = /** @class */ (function () {
    function ClaimInfoComponent(app, _service) {
        this.app = app;
        this._service = _service;
    }
    ClaimInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (localStorage.getItem('idclaim') != null) {
            this.idclaim = JSON.parse(localStorage.getItem('idclaim'));
        }
        console.log('ID:' + parseInt(this.idclaim));
        this._service.getSingleClaimInfo(this.idclaim)
            .subscribe(function (res) {
            console.log(res);
            _this.claims = res;
            console.log(_this.claims);
            if (_this.claims.length > 0) {
                _this.name = _this.claims[0].deceasedname;
                _this.surname = _this.claims[0].deceasedsurname;
                _this.date = _this.claims[0].createddate;
                _this.type = _this.claims[0].placeofdeath;
                _this.noClaims = false;
            }
            else {
                _this.noClaims = true;
            }
            /*
            
                    */
        }, function (err) {
            console.log(err);
        });
        this.app.loading = false;
    };
    ClaimInfoComponent.prototype.approveClaim = function () {
    };
    ClaimInfoComponent = __decorate([
        Component({
            selector: 'app-ClaimInfo',
            templateUrl: './ClaimInfo.component.html',
            styleUrls: ['./ClaimInfo.component.css']
        }),
        __metadata("design:paramtypes", [AppComponent, ServiceService])
    ], ClaimInfoComponent);
    return ClaimInfoComponent;
}());
export { ClaimInfoComponent };
//# sourceMappingURL=ClaimInfo.component.js.map