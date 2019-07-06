var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var ServiceService = /** @class */ (function () {
    function ServiceService(_http) {
        this._http = _http;
        this.OldUrl = 'http://greenlinks1.dedicated.co.za:3000/api';
        this.url = 'http://greenlinks1.dedicated.co.za:3002/api';
        this.Header = new HttpHeaders({
            'Content-Type': 'application/json',
            'responseType': 'json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        });
    }
    //////  LOGIN SERVICE  //////////  login
    ServiceService.prototype.loginUser = function (jsonData) {
        return this._http.post(this.url + '/login', jsonData, { headers: this.Header });
    };
    //////////////////////////////////////////////  SOCIETY SERVICE ////////////////////////////////////////// 
    ServiceService.prototype.getSociety = function () {
        //  return this._http.get<Members>('http://greenlinks1.dedicated.co.za:3000/api/society', { headers: this.Header })
        return this._http.get('society');
    };
    ServiceService.prototype.getSingleSocietyr = function (id) {
        // return this._http.get('http://greenlinks1.dedicated.co.za:3000/api/members/'+id, { headers: this.Header })
        return this._http.get('society');
    };
    ServiceService.prototype.removeSociety = function (id) {
        // return this._http.delete('http://greenlinks1.dedicated.co.za:3000/api/members/'+id, { headers: this.Header })
        return this._http.get('society');
    };
    ServiceService.prototype.updateSociety = function (id, data) {
        //  return this._http.put('http://greenlinks1.dedicated.co.za:3000/api/members/'+id, data, { headers: this.Header });
        return this._http.get('society');
    };
    ///////////////////////////////////////////  MEMBERS SERVICE  ///////////////////////////////////////////////
    ServiceService.prototype.getMembers = function () {
        // return this._http.get<Members>('http://greenlinks1.dedicated.co.za:3000/api/members', { headers: this.Header })
        return this._http.get(this.url + '/member', { headers: this.Header });
    };
    ServiceService.prototype.searchMemberBySurname = function (surname) {
        //return this._http.get(' http://greenlinks1.dedicated.co.za:3000/api/serchbysurname/' + surname, { headers: this.Header })
        return this._http.get(this.url + '/getmemberbysurname/' + surname, { headers: this.Header });
    };
    ServiceService.prototype.searchMemberByIdNumber = function (idnumber) {
        // return this._http.get('http://greenlinks1.dedicated.co.za:3000/api/serchbyidnumber/' + idnumber, { headers: this.Header })
        return this._http.get(this.url + '/getmemberbyidentitynumber/' + idnumber, { headers: this.Header });
    };
    ServiceService.prototype.searchMemberByMembershipNumber = function (membership) {
        // return this._http.get('http://greenlinks1.dedicated.co.za:3000/api/serchbymembershipnumber/' + membership, { headers: this.Header })
        return this._http.get(this.url + '/getmemberbymembershipnumber/' + membership, { headers: this.Header });
    };
    ServiceService.prototype.getSingleMember = function (id) {
        //return this._http.get('http://greenlinks1.dedicated.co.za:3000/api/members/' + id, { headers: this.Header })
        return this._http.get(this.url + '/member/' + id, { headers: this.Header });
    };
    ServiceService.prototype.removeMember = function (id) {
        // return this._http.delete('http://greenlinks1.dedicated.co.za:3000/api/members/' + id, { headers: this.Header })
        return this._http.delete(this.url + '/member/' + id, { headers: this.Header });
    };
    ServiceService.prototype.updateMember = function (id, data) {
        // return this._http.put('http://greenlinks1.dedicated.co.za:3000/api/members/' + id, data, { headers: this.Header });
        //return this._http.get(this.member);    2019163142
        return this._http.put(this.url + '/member/' + id, data, { headers: this.Header });
    };
    ServiceService.prototype.createMember = function (data) {
        // return this._http.post<any>('http://greenlinks1.dedicated.co.za:3000/api/members', data, { headers: this.Header });
        return this._http.post(this.url + '/member', data, { headers: this.Header });
    };
    ServiceService.prototype.createMemberBalanceDetails = function (data) {
        return this._http.post(this.url + '/balance', data, { headers: this.Header });
    };
    //////  BENEFICIARY SERVICE  //////////
    ServiceService.prototype.getBeneficiary = function () {
        return this._http.get('http://greenlinks1.dedicated.co.za:3000/api/beneficiaries', { headers: this.Header });
    };
    ServiceService.prototype.createMemberBeneficiary = function (data) {
        return this._http.post(this.url + '/beneficiary', data, { headers: this.Header });
    };
    ServiceService.prototype.getMemberBeneficiary = function (id) {
        return this._http.get(this.url + '/beneficiarybyidmember/' + id, { headers: this.Header });
    };
    ServiceService.prototype.removeBeneficiary = function (id) {
        return this._http.delete(this.url + '/beneficiary/' + id, { headers: this.Header });
    };
    ServiceService.prototype.updateBeneficiary = function (id, data) {
        return this._http.put(this.url + '/beneficiary/' + id, data, { headers: this.Header });
    };
    /////////////////  SIMPLE GET REQUEST   ////////////////////////////////////
    ServiceService.prototype.getUsers = function () {
        return this._http.get(this.url + '/user', { headers: this.Header });
    };
    ServiceService.prototype.getUser = function (id) {
        return this._http.get(this.url + '/user/' + id, { headers: this.Header });
    };
    ServiceService.prototype.getMemberPayments = function (id) {
        return this._http.get(this.url + '/paymentbymembershipnumber/' + id, { headers: this.Header });
    };
    ServiceService.prototype.getLifestatus = function (id) {
        return this._http.get(this.url + '/lifestatus/' + id, { headers: this.Header });
    };
    ///////////////// GET ALL REQUESTS  ////////////////////////////////
    ServiceService.prototype.getAllLifestatus = function () {
        return this._http.get(this.url + '/lifestatus', { headers: this.Header });
    };
    ServiceService.prototype.getAllPolicyType = function () {
        return this._http.get(this.url + '/policytype', { headers: this.Header });
    };
    ServiceService.prototype.getAllClaimStatus = function () {
        return this._http.get(this.url + '/claimstatus', { headers: this.Header });
    };
    ServiceService.prototype.getAllClaimType = function () {
        return this._http.get(this.url + '/claimtype', { headers: this.Header });
    };
    ServiceService.prototype.getAllPayOutType = function () {
        return this._http.get(this.url + '/payouttype', { headers: this.Header });
    };
    ServiceService.prototype.getAllPolicyStatus = function () {
        return this._http.get(this.url + '/policystatus', { headers: this.Header });
    };
    /////////////////  CLAIMS API  ////////////////////////////////
    ServiceService.prototype.createClaim = function (data) {
        return this._http.post(this.url + '/claim', data, { headers: this.Header });
    };
    ServiceService.prototype.getMemberClaim = function (id) {
        return this._http.get(this.url + '/getclaimbyidmember/' + id, { headers: this.Header });
    };
    ServiceService.prototype.getSingleClaimInfo = function (id) {
        return this._http.get(this.url + '/claim/' + id, { headers: this.Header });
    };
    /////////////////  POLICY API  //////////////////////////////// idclaim
    ServiceService.prototype.getPolicyTypeDetails = function (idpolicytype) {
        return this._http.get(this.url + '/policytype/' + idpolicytype, { headers: this.Header });
    };
    ServiceService.prototype.createMemberPolicyDetails = function (data) {
        return this._http.post(this.url + '/policydetails', data, { headers: this.Header });
    };
    ServiceService.prototype.getMemberPolicyDetails = function (id) {
        return this._http.get(this.url + '/getpolicydetailsbyidmember/' + id, { headers: this.Header });
    };
    ServiceService.prototype.getMemberPolicyStatus = function (id) {
        return this._http.get(this.url + '/getpolicydetailsbyidmember/' + id, { headers: this.Header });
    };
    ServiceService.prototype.getPolicyType = function (age) {
        return this._http.get(this.url + '/getpolicytypebyage/' + age, { headers: this.Header });
    };
    ServiceService.prototype.uploadFileDocument = function (file) {
        return this._http.post(this.url + '/upload', file, { headers: this.Header });
    };
    ServiceService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ServiceService);
    return ServiceService;
}());
export { ServiceService };
//# sourceMappingURL=service.service.js.map