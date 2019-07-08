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

declare const $: any;
@Component({
  selector: 'app-EditMember',
  templateUrl: './EditMember.component.html',
  styleUrls: ['./EditMember.component.css']
})
export class EditMemberComponent implements OnInit {


  member = new Member
  setmember = new Member
  //getmember = new Member
  idmember

  constructor(private app: AppComponent,
    private service: ServiceService,
    private memberService: MemberService,
    private router: Router) 
    {

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


    this.idmember = JSON.parse(localStorage.getItem('idmember'));

    this.memberService.getMember(this.idmember)
      .subscribe(member_res => {
        
        this.setmember = member_res[0]
        console.log(this.setmember)   

        this.app.loading = false
      }, err => {
        this.app.loading = false
        console.log(err)
      })



  }


  updateMember() {

    console.log(this.setmember)
    console.log(this.member)

    swal({
      title: 'Update info of: ',
      text: this.member.name + ' ' + this.member.surname,
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


        this.memberService.updateMember(this.idmember, this.member)
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

  test(myname) {
console.log(myname)
  }

}
