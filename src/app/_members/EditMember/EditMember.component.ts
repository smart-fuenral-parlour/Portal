import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import { isNullOrUndefined, isNull } from 'util';
import swal from 'sweetalert2';
import { Moment } from 'moment'
import * as moment from 'moment';
import { AppComponent } from 'src/app/app.component';

declare const $: any;
@Component({
  selector: 'app-EditMember',
  templateUrl: './EditMember.component.html',
  styleUrls: ['./EditMember.component.css']
})
export class EditMemberComponent implements OnInit {

  ID;
  singleMember;
  response;

  testAll;
  membershipID;
  JSONData = {};
  fname; newNAME
  lname; newSURNAME
  email; newEMAIL
  idnumber; newIDNUMBER
  contact; newCONTACT
  street; newSTREET
  province; newPROVINCE
  house; newHOUSE
  suburb; newSUBURB
  gender; newGENDER
  creator
  /////////SOCIETY////////////  
  society: boolean = false;
  societies
  ///////////////////////////
  selectedGender: string;
  selectedProvince: string

  constructor(private app: AppComponent, private _service: ServiceService, private _router: Router) {
    if (!isNullOrUndefined(sessionStorage.getItem('greenlinks'))) {
      this.society = true
    }
    // GETTING NAME OF THE CREATOR
    if (!isNullOrUndefined(localStorage.getItem('name'))) {
      this.creator = JSON.parse(localStorage.getItem('name'))
    } else {
      this.creator = 'System'
    }
  }

  myProvinces = [
    { value: 'Gauteng', name: 'Gauteng', abrv: 'GP' },
    { value: 'Limpopo', name: 'Limpopo', abrv: 'L' },
    { value: 'Mpumalanga', name: 'Mpumalanga', abrv: 'MP' },
    { value: 'Free State', name: 'Free State', abrv: 'FS' },
    { value: 'North West', name: 'North West', abrv: 'NW' },
    { value: 'Northern Cape', name: 'Northern Cape', abrv: 'NC' },
    { value: 'Eastern Cape', name: 'Eastern Cape', abrv: 'EC' },
    { value: 'Western Cape', name: 'Western Cape', abrv: 'WC' },
    { value: 'Kwazulu Natal', name: 'Kwazulu Natal', abrv: 'KZN' },
  ];

  myGenders = [
    { value: 'Male', name: 'Male', abrv: 'M' },
    { value: 'Female', name: 'Female', abrv: 'F' }
  ]

  ngOnInit() {
    /* SOCIETIES
        this._service.getSociety()
          .subscribe(res => {
            this.response = res
            this.societies = this.response.response
            console.log(this.societies)
          },
            err => console.log(err)
          )
    */



    if (localStorage.getItem('id') != null) {
      this.ID = JSON.parse(localStorage.getItem('id'));
      this.app.loading = true
      this._service.getSingleMember(this.ID)
        .subscribe(res => {
          this.response = res
          this.singleMember = this.response.response
          this.gender = this.singleMember[0].gender
          this.province = this.singleMember[0].province
          this.membershipID = this.singleMember[0].membershipnumber
          this.app.loading = false
        },

          err => {

            this.app.loading = false
            console.log(err)
          })
    } else {
      return null;
    }
  }


  updateMember() {

    this.fname = document.querySelector('#name');
    this.lname = document.querySelector('#surname');
    this.email = document.querySelector('#email');
    this.suburb = document.querySelector('#suburb');
    this.street = document.querySelector('#street');
    this.idnumber = document.querySelector('#idnumber');
    //this.province = document.querySelector('#province');
    this.house = document.querySelector('#house');
    this.contact = document.querySelector('#contact');
    // this.gender = document.querySelector('#gender');

    // NAME /////////////////
    if (isNullOrUndefined(this.fname.value) || this.fname.value == "") {
      this.newNAME = this.fname.placeholder
    } else {
      this.newNAME = this.fname.value
    }


    // SURNAME /////////////////
    if (isNullOrUndefined(this.lname.value) || this.lname.value == "") {
      this.newSURNAME = this.lname.placeholder
    } else {
      this.newSURNAME = this.lname.value
    }

    // IDNUMBER /////////////////
    if (isNullOrUndefined(this.idnumber.value) || this.idnumber.value == "") {
      this.newIDNUMBER = this.idnumber.placeholder
    } else {
      this.newIDNUMBER = this.idnumber.value
    }

    // EMAIL /////////////////
    if (isNullOrUndefined(this.email.value) || this.email.value == "") {
      this.newEMAIL = this.email.placeholder
    } else {
      this.newEMAIL = this.email.value
    }

    // GENDER /////////////////
    if (isNullOrUndefined(this.selectedGender) || this.selectedGender == "") {
      this.newGENDER = this.gender
    } else {
      this.newGENDER = this.selectedGender
    }


    // PROVINCE /////////////////
    if (isNullOrUndefined(this.selectedProvince) || this.selectedProvince == "") {
      this.newPROVINCE = this.province
    } else {
      this.newPROVINCE = this.selectedProvince
    }


    // SUBURB /////////////////
    if (isNullOrUndefined(this.suburb.value) || this.suburb.value == "") {
      this.newSUBURB = this.suburb.placeholder
    } else {
      this.newSUBURB = this.suburb.value
    }

    // HOUSE NUMBER /////////////////
    if (isNullOrUndefined(this.house.value) || this.house.value == "") {
      this.newHOUSE = this.house.placeholder
    } else {
      this.newHOUSE = this.house.value
    }

    // CONTACT NUMBER /////////////////
    if (isNullOrUndefined(this.contact.value) || this.contact.value == "") {
      this.newCONTACT = this.contact.placeholder
    } else {
      this.newCONTACT = this.contact.value
    }

    // STREET NAME /////////////////
    if (isNullOrUndefined(this.street.value) || this.street.value == "") {
      this.newSTREET = this.street.placeholder
    } else {
      this.newSTREET = this.street.value
    }

    this.JSONData = {
      'name': this.newNAME,
      'surname': this.newSURNAME,
      'idnumber': this.newIDNUMBER,
      'email': this.newEMAIL,
      'contactnumber': this.newCONTACT,
      'gender': this.newGENDER,
      'housenumber': this.newHOUSE,
      'streetname': this.newSTREET,
      'suburb': this.newSUBURB,
      'province': this.newPROVINCE,
      'createdby': this.creator
    }

    //{"name":"YEBO","surname":"","idnumber":"","email":"","contactnumber":"","gender":"","housenumber":"","streetname":"","suburb":"","province":"","birthyear":""}
    console.log(this.JSONData)
    console.log(this.ID)


    swal({
      title: 'Update Membership ID:',
      text: this.membershipID,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Save update',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {

        this._service.updateMember(this.membershipID, this.JSONData)
          .subscribe(res => {
            console.log(res)
            this.testAll = res
            if (this.testAll.code != 200) {
              console.log(this.testAll.error)
            }
            console.log('Member Updated')
            //  window.location.reload()
          }, err => console.log(err))

        swal(
          {
            title: 'Member Updated',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false

          }).then((result) => { if (sessionStorage.getItem('fromMemberDetails') == 'true') { this._router.navigate(['/members/viewmemberdetails']) } else { this._router.navigate(['/members/searchmember']) } })
      }
    })

  }

}
