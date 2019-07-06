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
var apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/policytype";
var getpolicytypebyageUrl = "http://greenlinks1.dedicated.co.za:3002/api/getpolicytypebyage";
var PolicytypeService = /** @class */ (function () {
    function PolicytypeService(http) {
        this.http = http;
    }
    PolicytypeService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    };
    PolicytypeService.prototype.getPolicytypes = function () {
        return this.http.get(apiUrl)
            .pipe(tap(function (heroes) { return console.log('fetched policytypes'); }), catchError(this.handleError('getPolicytypes', [])));
    };
    PolicytypeService.prototype.getPolicytype = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.get(url).pipe(tap(function (_) { return console.log("fetched policytype id=" + id); }), catchError(this.handleError("getPolicytype id=" + id)));
    };
    PolicytypeService.prototype.getPolicytypebyage = function (id) {
        var url = getpolicytypebyageUrl + "/" + id;
        return this.http.get(getpolicytypebyageUrl).pipe(tap(function (_) { return console.log("fetched policytype id=" + id); }), catchError(this.handleError("getPolicytype id=" + id)));
    };
    PolicytypeService.prototype.createPolicytype = function (policytype) {
        return this.http.post(apiUrl, policytype, httpOptions).pipe(tap(function (policytype) { return console.log("added policytype w/" + policytype); }), catchError(this.handleError('addPolicytype')));
    };
    PolicytypeService.prototype.updatePolicytype = function (id, policytype) {
        var url = apiUrl + "/" + id;
        return this.http.put(url, policytype, httpOptions).pipe(tap(function (_) { return console.log("updated policytype" + policytype); }), catchError(this.handleError('updatePolicytype')));
    };
    PolicytypeService.prototype.deletePolicytype = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.delete(url, httpOptions).pipe(tap(function (_) { return console.log("deleted policytype"); }), catchError(this.handleError('deletePolicytype')));
    };
    PolicytypeService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], PolicytypeService);
    return PolicytypeService;
}());
export { PolicytypeService };
//# sourceMappingURL=policytype.service.js.map