import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

///////////////////  SERCVICE CALLS  /////////////////////////////
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
    private memberService: MemberService,
    private router: Router) { }

  Provinces = [
    { value: 'Gauteng', abrv: 'GP' },
    { value: 'Limpopo', abrv: 'L' },
    { value: 'Mpumalanga', abrv: 'MP' },
    { value: 'Free State', abrv: 'FS' },
    { value: 'North West', abrv: 'NW' },
    { value: 'Northern Cape', abrv: 'NC' },
    { value: 'Eastern Cape', abrv: 'EC' },
    { value: 'Western Cape', abrv: 'WC' },
    { value: 'Kwazulu Natal', abrv: 'KZN' },
  ];

  Genders = [
    { value: 'Male', abrv: 'M' },
    { value: 'Female', abrv: 'F' }
  ]

  ngOnInit() {

    this.app.loading = true

    this.getmember = JSON.parse(localStorage.getItem('editmember'))
    console.log(this.getmember.id)


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

        //this.getmember.id, this.members[index]
        this.memberService.updateMember(this.getmember.id, this.setmember)
          .subscribe(member_res => {

            console.log(member_res)

            swal(
              {
                title: 'Member Updated',
                type: 'success',
                confirmButtonClass: "btn btn-success",
                buttonsStyling: false

              }).then((result) => {

                if (sessionStorage.getItem('fromMemberDetails') == 'true') {
                //  this.member = JSON.parse(localStorage.getItem('viewdetails'))
                  localStorage.setItem('viewdetails', JSON.stringify(member_res));
                  this.router.navigate(['/members/viewmemberdetails'])
                } else {
                  this.router.navigate(['/members/searchmember'])
                }
              })

          }, err => {
            console.log(err)
          })

      }
    })

  }



}
