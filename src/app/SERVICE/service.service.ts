import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, XUser } from './Users';
import { Members } from './members'
import { Society } from './society'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  OldUrl = 'http://greenlinks1.dedicated.co.za:3000/api'
  url = 'http://greenlinks1.dedicated.co.za:3002/api';

  constructor(private _http: HttpClient) { }

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });



  //////  LOGIN SERVICE  //////////  login
  loginUser(jsonData) {
    return this._http.post(this.url + '/login', jsonData, { headers: this.Header });
  }


  //////////////////////////////////////////////  SOCIETY SERVICE ////////////////////////////////////////// 
  getSociety() {
    //  return this._http.get<Members>('http://greenlinks1.dedicated.co.za:3000/api/society', { headers: this.Header })
    return this._http.get<Society>('society');
  }

  getSingleSocietyr(id) {
    // return this._http.get('http://greenlinks1.dedicated.co.za:3000/api/members/'+id, { headers: this.Header })
    return this._http.get('society');
  }

  removeSociety(id) {
    // return this._http.delete('http://greenlinks1.dedicated.co.za:3000/api/members/'+id, { headers: this.Header })
    return this._http.get('society');
  }

  updateSociety(id, data) {
    //  return this._http.put('http://greenlinks1.dedicated.co.za:3000/api/members/'+id, data, { headers: this.Header });
    return this._http.get('society');
  }  

  ///////////////////////////////////////////  MEMBERS SERVICE  ///////////////////////////////////////////////
  getMembers() {
    // return this._http.get<Members>('http://greenlinks1.dedicated.co.za:3000/api/members', { headers: this.Header })
    return this._http.get<Members>(this.url + '/member', { headers: this.Header })

  }

  searchMemberBySurname(surname) {//
    //return this._http.get(' http://greenlinks1.dedicated.co.za:3000/api/serchbysurname/' + surname, { headers: this.Header })
    return this._http.get(this.url + '/getmemberbysurname/' + surname, { headers: this.Header })
  }

  searchMemberByIdNumber(idnumber) {
    // return this._http.get('http://greenlinks1.dedicated.co.za:3000/api/serchbyidnumber/' + idnumber, { headers: this.Header })
    return this._http.get(this.url + '/getmemberbyidentitynumber/' + idnumber, { headers: this.Header })
  }

  searchMemberByMembershipNumber(membership) {
    // return this._http.get('http://greenlinks1.dedicated.co.za:3000/api/serchbymembershipnumber/' + membership, { headers: this.Header })
    return this._http.get(this.url + '/getmemberbymembershipnumber/' + membership, { headers: this.Header })
  }

  getSingleMember(id) {
    //return this._http.get('http://greenlinks1.dedicated.co.za:3000/api/members/' + id, { headers: this.Header })
    return this._http.get(this.url + '/member/' + id, { headers: this.Header })
  }

  removeMember(id) {
    // return this._http.delete('http://greenlinks1.dedicated.co.za:3000/api/members/' + id, { headers: this.Header })
    return this._http.delete(this.url + '/member/' + id, { headers: this.Header })

  }

  updateMember(id, data) {
    // return this._http.put('http://greenlinks1.dedicated.co.za:3000/api/members/' + id, data, { headers: this.Header });
    //return this._http.get(this.member);    2019163142
    return this._http.put(this.url + '/member/' + id, data, { headers: this.Header })
  }

  createMember(data) {
    // return this._http.post<any>('http://greenlinks1.dedicated.co.za:3000/api/members', data, { headers: this.Header });
    return this._http.post<any>(this.url + '/member', data, { headers: this.Header });
  }

  createMemberBalanceDetails(data) {
    return this._http.post<any>(this.url + '/balance', data, { headers: this.Header });
  }




  //////  BENEFICIARY SERVICE  //////////
  getBeneficiary() {
    return this._http.get<Members>('http://greenlinks1.dedicated.co.za:3000/api/beneficiaries', { headers: this.Header })
  }

  createMemberBeneficiary(data) {    
    return this._http.post<any>(this.url + '/beneficiary', data, { headers: this.Header });
  }

  getMemberBeneficiary(id) {
    return this._http.get(this.url + '/beneficiarybyidmember/' + id, { headers: this.Header })
  }

  removeBeneficiary(id) {
     return this._http.delete(this.url + '/beneficiary/' + id, { headers: this.Header })

  }

  updateBeneficiary(id, data) {//beneficiaries
    return this._http.put(this.url + '/beneficiary/' + id, data, { headers: this.Header });
  }




  /////////////////  SIMPLE GET REQUEST   ////////////////////////////////////
  
  getUsers()  {
    return this._http.get(this.url + '/user', { headers: this.Header })
  }
    
  getUser(id)  {
    return this._http.get(this.url + '/user/' + id, { headers: this.Header })
  }
  
  getMemberPayments(id) {
    return this._http.get(this.url + '/paymentbymembershipnumber/' + id, { headers: this.Header })
  }

  getLifestatus(id) {
    return this._http.get( this.url + '/lifestatus/' + id, { headers: this.Header })
  }



  ///////////////// GET ALL REQUESTS  ////////////////////////////////

  getAllLifestatus() {
    return this._http.get(this.url + '/lifestatus', { headers: this.Header })
  }

  getAllPolicyType() {
    return this._http.get(this.url + '/policytype', { headers: this.Header })
  }

  getAllClaimStatus() {
    return this._http.get(this.url + '/claimstatus', { headers: this.Header })
  }

  getAllClaimType() {
    return this._http.get(this.url + '/claimtype', { headers: this.Header })
  }

  getAllPayOutType() {
    return this._http.get(this.url + '/payouttype', { headers: this.Header })
  }

  getAllPolicyStatus() {
    return this._http.get(this.url + '/policystatus', { headers: this.Header })
  }

  

  /////////////////  CLAIMS API  ////////////////////////////////

  createClaim(data) {
     return this._http.post<any>(this.url + '/claim', data, { headers: this.Header });
  }

  getMemberClaim(id) {
    return this._http.get(this.url + '/getclaimbyidmember/' + id, { headers: this.Header })
  }

  getSingleClaim(id) {
    return this._http.get(this.url + '/claim/' + id, { headers: this.Header })
  }

  

  /////////////////  POLICY API  ////////////////////////////////

  getPolicyTypeDetails(idpolicytype)  {
    return this._http.get(this.url + '/policytype/' + idpolicytype, { headers: this.Header })
  }

  createMemberPolicyDetails(data) {
    return this._http.post<any>(this.url + '/policydetails', data, { headers: this.Header });
 }

}
