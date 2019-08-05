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
import { isNullOrUndefined } from 'util';
import { count } from 'rxjs/operators';

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

    this.getmember = JSON.parse(localStorage.getItem('editmember'))
    console.log(this.getmember.id)

  }


  updateMember() {


    console.log(this.setmember)

    if (!isNullOrUndefined(this.setmember.email) && this.setmember.email != '') {

      // validating duplicated email
      this.app.loading = true
      this.memberService.checkMemberEmail(this.setmember.email)
        .subscribe(count_res => {

          this.app.loading = false
          console.log(count_res)

          if (count_res.count == 0) {

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
                    this.app.loading = false

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
                    this.app.loading = false
                  })

              }
            })

          } else {
            swal({
              title: "Email already exist",
              text: "Please enter another email for this member",
              type: 'error',
              timer: 5000,
              showConfirmButton: true
            }).catch(swal.noop)
          }


        }, err => {
          console.log(err)
          this.app.loading = false
        })
    } else {

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
              this.app.loading = false

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
              this.app.loading = false
            })

        }
      })

    }



  }

  idNumberCheck() {
    console.log('button clicked')

    if (!isNullOrUndefined(this.setmember.identitynumber)) {
      if (this.setmember.identitynumber.length == 13) {

        // checking if id number is unique
        this.memberService.getMemberbyidentitynumber(this.setmember.identitynumber)
          .subscribe(idnumber_res => {

            if (idnumber_res.length > 0) {
              console.log('idnumber already exist')

              swal({
                title: "Member with Id number " + this.setmember.identitynumber + " already exist",
                text: "Please enter another Id number",
                type: 'error',
                timer: 5000,
                showConfirmButton: true
              }).catch(swal.noop)
            }

          }, err => {
            console.log(err)
          })

      }
    }


  }

}
