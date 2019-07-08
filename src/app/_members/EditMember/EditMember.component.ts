import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
///////////////////  SERCVICE CALLS  /////////////////////////////
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import { MemberService } from 'src/app/services/member/member.service'

/////////////////////////////////////////////////////////////////
import swal from 'sweetalert2';
import { Moment } from 'moment'
import * as moment from 'moment';
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';

declare const $: any;
@Component({
  selector: 'app-EditMember',
  templateUrl: './EditMember.component.html',
  styleUrls: ['./EditMember.component.css']
})
export class EditMemberComponent implements OnInit {


  /*
    testAll;
    
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
    myLifeStatus
    idlifestatus
    idpolicytype
    creator
    /////////SOCIETY////////////  
    society: boolean = false;
    societies
    ///////////////////////////
    lifestatus
    selectedLifeStatus
    policyType
    selectedPolicyType
  */
  iduser
  idmember
  selectedGender: string;
  selectedProvince: string
  member


  constructor(private app: AppComponent,
    private service: ServiceService,
    private memberService: MemberService,
    private router: Router) {

  }

  Provinces = [
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

  Genders = [
    { value: 'Male', name: 'Male', abrv: 'M' },
    { value: 'Female', name: 'Female', abrv: 'F' }
  ]

  ngOnInit() {




    if (localStorage.getItem('iduser') != null) {
      this.iduser = JSON.parse(localStorage.getItem('iduser'))
      console.log(this.iduser)
    }


    if (localStorage.getItem('idmember') != null) {
      this.idmember = JSON.parse(localStorage.getItem('idmember'));
      this.app.loading = true


      this.memberService.getMember(this.idmember)
        .subscribe(member_res => {
          this.member = member_res[0]


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


  updateMemberupdateMember(name, surname, identitynumber, gender, email, contactnumber, housenumber, streetname, suburb, province) {


    let member_new  // new updated member object

    // new updated member details
    let Name
    let Surname
    let Identitynumber
    let Gender
    let Email
    let Contactnumber
    let Housenumber
    let Streetname
    let Suburb
    let Province

    // NAME /////////////////
    if (isNullOrUndefined(name) || name == "") {
      Name = this.member.name
    } else {
      Name = name
    }


    // SURNAME /////////////////
    if (isNullOrUndefined(surname) || surname == "") {
      Surname = this.member.surname
    } else {
      Surname = surname
    }

    // IDNUMBER ///////////////// 
    if (isNullOrUndefined(identitynumber) || identitynumber == "") {
      Identitynumber = this.member.identitynumber
    } else {
      Identitynumber = identitynumber
    }

    // EMAIL ///////////////// 
    if (isNullOrUndefined(email) || email == "") {
      Email = this.member.email
    } else {
      Email = email
    }

    // GENDER ///////////////// 
    if (isNullOrUndefined(gender) || gender == "") {
      Gender = this.member.gender
    } else {
      Gender = gender
    }

    // PROVINCE ///////////////// 
    if (isNullOrUndefined(province) || province == "") {
      Province = this.member.province
    } else {
      Province = province
    }


    // SUBURB ///////////////// 
    if (isNullOrUndefined(suburb) || suburb == "") {
      Suburb = this.member.suburb
    } else {
      Suburb = suburb
    }

    // HOUSE NUMBER /////////////////
    if (isNullOrUndefined(housenumber) || housenumber == "") {
      housenumber = this.member.housenumber
    } else {
      housenumber = housenumber
    }

    // CONTACT NUMBER ///////////////// 
    if (isNullOrUndefined(contactnumber) || contactnumber == "") {
      Contactnumber = this.member.contactnumber
    } else {
      Contactnumber = contactnumber
    }

    // STREET NAME /////////////////  
    if (isNullOrUndefined(streetname) || streetname == "") {
      Streetname = this.member.streetname
    } else {
      Streetname = streetname
    }


    //{"name":"YEBO","surname":"","idnumber":"","email":"","contactnumber":"","gender":"","housenumber":"","streetname":"","suburb":"","province":"","birthyear":""}



    swal({
      title: 'Update Membership ID:',
      text: this.member.membershipnumber,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Save update',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.app.loading = true

        member_new = {
          'name': Name,
          'surname': Surname,
          'identitynumber': Identitynumber,
          'email': Email,
          'contactnumber': Contactnumber,
          'gender': Gender,
          'housenumber': Housenumber,
          'streetname': Streetname,
          'suburb': Suburb,
          'province': Province,
          'iduser': this.iduser
        }

        this.memberService.updateMember(this.idmember, member_new)
          .subscribe(member_updates => {
            console.log(member_updates)

          }, err => {
            console.log(err)
          })


        swal(
          {
            title: 'Member Updated',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false

          }).then((result) => { if (sessionStorage.getItem('fromMemberDetails') == 'true') { this.router.navigate(['/members/viewmemberdetails']) } else { this.router.navigate(['/members/searchmember']) } })
      }
    })

  }

}
