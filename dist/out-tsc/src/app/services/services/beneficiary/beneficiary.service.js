var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
var httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
var apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/beneficiary";
var BeneficiaryService = /** @class */ (function () {
    function BeneficiaryService(http) {
        this.http = http;
    }
    BeneficiaryService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    };
    BeneficiaryService.prototype.getBeneficiary = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.get(url).pipe(tap(function (_) { return console.log("fetched beneficiary id=" + id); }), catchError(this.handleError("getBeneficiary id=" + id)));
    };
    BeneficiaryService.prototype.createBeneficiary = function (beneficiary) {
        return this.http.post(apiUrl, beneficiary, httpOptions).pipe(tap(function (beneficiary) { return console.log("added beneficiary w/" + beneficiary); }), catchError(this.handleError('addBeneficiary')));
    };
    BeneficiaryService.prototype.updateBeneficiary = function (id, beneficiary) {
        var url = apiUrl + "/" + id;
        return this.http.put(url, beneficiary, httpOptions).pipe(tap(function (_) { return console.log("updated beneficiary" + beneficiary); }), catchError(this.handleError('updateBeneficiary')));
    };
    BeneficiaryService.prototype.deleteBeneficiary = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.delete(url, httpOptions).pipe(tap(function (_) { return console.log("deleted beneficiary"); }), catchError(this.handleError('deleteBeneficiary')));
    };
    BeneficiaryService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], BeneficiaryService);
    return BeneficiaryService;
}());
export { BeneficiaryService };
//# sourceMappingURL=beneficiary.service.js.map