import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

///////////////////  SERCVICE CALLS  /////////////////////////////
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import { MemberService } from 'src/app/services/member/member.service'

////////////////// MODEL/CLASS CALLSS ////////////////////////////
import { Member } from 'src/app/services/member/member'

/////////////////////////////////////////////////////////////////

import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { JsonPipe } from '@angular/common';

declare const $: any;
@Component({
  selector: 'app-EditMember',
  templateUrl: './EditMember.component.html',
  styleUrls: ['./EditMember.component.css']
})
export class EditMemberComponent implements OnInit {


  setmember = new Member
  getmember: Member


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

    this.app.loading = true

    this.getmember = JSON.parse(localStorage.getItem('editmember'))
    console.log(this.getmember.idmember)

    if (JSON.parse(localStorage.getItem('editmember')) != null) {

      this.app.loading = false

    }



  }


  updateMember() {


    console.log(this.setmember)

    swal({
      title: 'Update info of: ',
      text: this.getmember.name + ' ' + this.getmember.surname,
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


        this.memberService.updateMember(this.getmember.idmember, this.setmember)
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
