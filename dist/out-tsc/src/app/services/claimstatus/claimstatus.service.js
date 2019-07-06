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
var apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/claimstatus";
var ClaimstatusService = /** @class */ (function () {
    function ClaimstatusService(http) {
        this.http = http;
    }
    ClaimstatusService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    };
    ClaimstatusService.prototype.getClaimstatus = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.get(url).pipe(tap(function (_) { return console.log("fetched claimstatus id=" + id); }), catchError(this.handleError("getClaimstatus id=" + id)));
    };
    ClaimstatusService.prototype.createClaimstatus = function (claimstatus) {
        return this.http.post(apiUrl, claimstatus, httpOptions).pipe(tap(function (claimstatus) { return console.log("added claimstatus w/" + claimstatus); }), catchError(this.handleError('addClaimstatus')));
    };
    ClaimstatusService.prototype.updateClaimstatus = function (id, claimstatus) {
        var url = apiUrl + "/" + id;
        return this.http.put(url, claimstatus, httpOptions).pipe(tap(function (_) { return console.log("updated claimstatus" + claimstatus); }), catchError(this.handleError('updateClaimstatus')));
    };
    ClaimstatusService.prototype.deleteClaimstatus = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.delete(url, httpOptions).pipe(tap(function (_) { return console.log("deleted claimstatus"); }), catchError(this.handleError('deleteClaimstatus')));
    };
    ClaimstatusService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ClaimstatusService);
    return ClaimstatusService;
}());
export { ClaimstatusService };
//# sourceMappingURL=claimstatus.service.js.map