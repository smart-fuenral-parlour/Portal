import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component'
import swal from 'sweetalert2';
import { Router } from '@angular/router'
declare var $: any;

////////////////////////////// SERVICE CALLS //////////////////////////////////////////////////////////
import { MemberService } from 'src/app/services/member/member.service'
import { ClaimService } from 'src/app/services/claim/claim.service'
import { UserService } from 'src/app/services/user/user.service'

/////////////////////////////////////////  SERVICE CALLS   ///////////////////////////////////////////////////////////////////
import { Claim } from 'src/app/services/claim/claim'
import { Claimstatus } from 'src/app/services/claimstatus/claimstatus'
import { User } from 'src/app/services/user/user'
import { isNullOrUndefined } from 'util';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


@Component({
  selector: 'app-ClaimInfo',
  templateUrl: './ClaimInfo.component.html',
  styleUrls: ['./ClaimInfo.component.css']
})
export class ClaimInfoComponent implements OnInit {

  getclaim: Claim

  user: User

  setclaim = new Claim
  noClaims = false

  constructor(private app: AppComponent,
    private claimService: ClaimService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getclaim = JSON.parse(localStorage.getItem('claiminfo'));
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.getclaim)
  }

  approveClaim() {

    this.setclaim.idclaimstatus = 2;
    this.setclaim.createdby = (this.user.name + " " + this.user.surname)
    this.setclaim.reason = ('Claim Approved')

    
    this.app.loading = true
    this.claimService.updateClaim(this.getclaim.id, this.setclaim)
      .subscribe(approveclaim_res => {

        console.log(approveclaim_res)
        this.app.loading = false

        swal({
          title: 'Claim Approved',
          type: 'success',
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false

        }).then((result) => {

          if (result.value) {

            this.router.navigate(['/claims/viewallclaims'])
          }
        }) // console.log('done: ' + result.value))  document.location.reload()



      }, err => {
        this.app.loading = false
        console.log(err)

      })
  }


  declineClaim() {

    swal({
      title: "Decline claim No. " + this.getclaim.claimnumber +
        ", please provide a reason below",
      html: '<div class="form-group">' +
        '<input id="reason" type="text" class="form-control" />' +
        '</div>',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      type: 'warning',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Send claim back'
    }).then((result) => {
      if (result.value) {

        if( $('#reason').val() == '' || isNullOrUndefined($('#reason').val())) {

          swal({
            title: "Unsuccesful",
            text: "Please provide reason for declining the claim",
            type: 'error',
            timer: 5000,
            showConfirmButton: true
          }).catch(swal.noop)

        } else {
          this.setclaim.idclaimstatus = 3
          this.setclaim.createdby = (this.user.name + " " + this.user.surname)
          this.setclaim.reason = $('#reason').val()
  
          //this.user.iduser = $('#reason').val()
  
          this.app.loading = true
          this.claimService.updateClaim(this.getclaim.id, this.setclaim)
            .subscribe(update_res => {
              this.app.loading = false
  
              console.log(update_res)
  
              swal({
  
                title: 'Claim declined and sent back',
                type: 'success',
                confirmButtonClass: "btn btn-success",
                buttonsStyling: false
  
              }).then((result) => {
  
                this.router.navigate(['/claims/viewallclaims'])
                console.log('saved!')
  
              }) // this.router.navigate(['/claims/viewallclaims']))
  
  
            }, err => {
              console.log(err)
              this.app.loading = false
            })
  
        }
        
      }
    })


  }



}
