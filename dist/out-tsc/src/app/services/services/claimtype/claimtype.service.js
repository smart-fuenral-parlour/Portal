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
var apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/claimtype";
var ClaimtypeService = /** @class */ (function () {
    function ClaimtypeService(http) {
        this.http = http;
    }
    ClaimtypeService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    };
    ClaimtypeService.prototype.getClaimtype = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.get(url).pipe(tap(function (_) { return console.log("fetched claimtype id=" + id); }), catchError(this.handleError("getClaimtype id=" + id)));
    };
    ClaimtypeService.prototype.createClaimtype = function (claimtype) {
        return this.http.post(apiUrl, claimtype, httpOptions).pipe(tap(function (claimtype) { return console.log("added claimtype w/" + claimtype); }), catchError(this.handleError('addClaimtype')));
    };
    ClaimtypeService.prototype.updateClaimtype = function (id, claimtype) {
        var url = apiUrl + "/" + id;
        return this.http.put(url, claimtype, httpOptions).pipe(tap(function (_) { return console.log("updated claimtype" + claimtype); }), catchError(this.handleError('updateClaimtype')));
    };
    ClaimtypeService.prototype.deleteClaimtype = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.delete(url, httpOptions).pipe(tap(function (_) { return console.log("deleted claimtype"); }), catchError(this.handleError('deleteClaimtype')));
    };
    ClaimtypeService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ClaimtypeService);
    return ClaimtypeService;
}());
export { ClaimtypeService };
//# sourceMappingURL=claimtype.service.js.map