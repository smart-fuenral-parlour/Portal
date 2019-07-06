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
var apiUrl = "http://greenlinks1.dedicated.co.za:3002/api/member";
var MemberService = /** @class */ (function () {
    function MemberService(http) {
        this.http = http;
    }
    MemberService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    };
    MemberService.prototype.getMembers = function () {
        return this.http.get(apiUrl)
            .pipe(tap(function (heroes) { return console.log('fetched members'); }), catchError(this.handleError('getMembers', [])));
    };
    MemberService.prototype.getMember = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.get(url).pipe(tap(function (_) { return console.log("fetched member id=" + id); }), catchError(this.handleError("getMember id=" + id)));
    };
    MemberService.prototype.createMember = function (member) {
        return this.http.post(apiUrl, member, httpOptions).pipe(tap(function (member) { return console.log("added member w/" + member); }), catchError(this.handleError('addMember')));
    };
    MemberService.prototype.updateMember = function (id, member) {
        var url = apiUrl + "/" + id;
        return this.http.put(url, member, httpOptions).pipe(tap(function (_) { return console.log("updated member" + member); }), catchError(this.handleError('updateMember')));
    };
    MemberService.prototype.deleteMember = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.delete(url, httpOptions).pipe(tap(function (_) { return console.log("deleted member"); }), catchError(this.handleError('deleteMember')));
    };
    MemberService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], MemberService);
    return MemberService;
}());
export { MemberService };
//# sourceMappingURL=member.service.js.map