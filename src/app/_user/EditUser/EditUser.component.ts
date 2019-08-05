import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';

///////////////////// SERVICE CALLS  ///////////////////////////////////////////
import { UserService } from '../../services/user/user.service';
import { RoleService } from '../../services/role/role.service';

//////////////////// MODEL/ CLASS CALLS ///////////////////////////////////////
import { User } from './../../services/user/user';
import { Role } from './../../services/role/role';
import { isNullOrUndefined } from 'util';

///////////////////////////////////////////////////////////////////////////////



declare const $: any;
@Component({
  selector: 'app-EditUser',
  templateUrl: './EditUser.component.html',
  styleUrls: ['./EditUser.component.css']
})
export class EditUserComponent implements OnInit {

  getuser: User;
  setuser = new User;
  roles: Role[]

  constructor(private app: AppComponent,
    private roleService: RoleService,
    private userService: UserService,
    private router: Router) { }


  ngOnInit() {


    //get user data from view user page
    this.app.loading = true
    this.getuser = JSON.parse(localStorage.getItem('edituser'));

    this.roleService.getRoles()
      .subscribe(roles_res => {
        this.app.loading = false

        if (roles_res.length > 0) {
          this.roles = roles_res
          
        }

      }, err => {
        console.log(err)
        this.app.loading = false
      })

  }

  updateUser() {

    console.log(this.setuser)

    // email duplicate validation
    if (!isNullOrUndefined(this.setuser.email) && this.setuser.email != '') {

      this.app.loading = true
      this.userService.checkUserEmail(this.setuser.email)
        .subscribe(email_res => {
          
          console.log(email_res)
          this.app.loading = false
          if (email_res.count == 0) {

            swal({
              title: "Update " + this.getuser.name + "'s Details",
              text: "Are you sure you want to update " + this.getuser.name + "'s details?",
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
                this.userService.updateUser(this.getuser.idsystemusers, this.setuser)
                  .subscribe(res => {

                    this.app.loading = false
                    console.log(res)

                    swal(
                      {
                        title: 'User Updated',
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false

                      }).then((result) => {
                        this.router.navigate(['/user/viewuser'])
                      })


                  }, (err) => {
                    console.log(err);
                    this.app.loading = false
                  });


              }
            })


          } else {
            swal({
              title: "Email already exist",
              text: "Please enter a different email address",
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
        title: "Update " + this.getuser.name + "'s Details",
        text: "Are you sure you want to update " + this.getuser.name + "'s details?",
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
          this.userService.updateUser(this.getuser.idsystemusers, this.setuser)
            .subscribe(res => {

              console.log(res)
              this.app.loading = false

              swal(
                {
                  title: 'User Updated',
                  type: 'success',
                  confirmButtonClass: "btn btn-success",
                  buttonsStyling: false

                }).then((result) => {
                  this.router.navigate(['/user/viewuser'])
                })


            }, (err) => {
              console.log(err);
              this.app.loading = false

            });


        }
      })
    }


  }

  //returns a value if the variable is an empty string
  removeEmptyString(value) {

    if (value == '') {
      this.setuser.name = this.setuser.name == '' ? this.getuser.name : null
    }

  }

}
