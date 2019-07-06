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
var apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/claim";
var ClaimService = /** @class */ (function () {
    function ClaimService(http) {
        this.http = http;
    }
    ClaimService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    };
    ClaimService.prototype.getClaim = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.get(url).pipe(tap(function (_) { return console.log("fetched claim id=" + id); }), catchError(this.handleError("getClaim id=" + id)));
    };
    ClaimService.prototype.createClaim = function (claim) {
        return this.http.post(apiUrl, claim, httpOptions).pipe(tap(function (claim) { return console.log("added claim w/" + claim); }), catchError(this.handleError('addClaim')));
    };
    ClaimService.prototype.updateClaim = function (id, claim) {
        var url = apiUrl + "/" + id;
        return this.http.put(url, claim, httpOptions).pipe(tap(function (_) { return console.log("updated claim" + claim); }), catchError(this.handleError('updateClaim')));
    };
    ClaimService.prototype.deleteClaim = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.delete(url, httpOptions).pipe(tap(function (_) { return console.log("deleted claim"); }), catchError(this.handleError('deleteClaim')));
    };
    ClaimService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ClaimService);
    return ClaimService;
}());
export { ClaimService };
//# sourceMappingURL=claim.service.js.map