import { Role } from './../../services/role/role';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { RoleService } from '../../services/role/role.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';





declare const $: any;
@Component({
  selector: 'app-EditUser',
  templateUrl: './EditUser.component.html',
  styleUrls: ['./EditUser.component.css']
})
export class EditUserComponent implements OnInit {

  placeholder:User;
  user = new User;
currentRole
 roles:Role[]
 selectedrole = new Role

  constructor(private app: AppComponent, private _role: RoleService,private _user: UserService, private _router: Router) {}
  

  ngOnInit() {

 //user from edit page
this.placeholder = JSON.parse(localStorage.getItem('selectedUser'));

this._role.getRole(this.placeholder.idrole)
            .subscribe(res => {
                this.currentRole=res[0].name;
            }, err => {
              console.log(err);
            });         


            this._role.getRoles()
            .subscribe(res => {
                this.roles=res;
            }, err => {
              console.log(err);
            });



  }

  updateUser() {

    this.user.iduser= this.placeholder.iduser
    

    swal({
      title: "Update "+this.placeholder.name+"'s Details",
      text: "Are you sure you want to update "+this.placeholder.name+"'s details?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Save update',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this._user.updateUser(this.user.iduser,this.user)
      .subscribe(res => {
         console.log(res)

         this._router.navigate(['/user/viewuser'])
        }, (err) => {
          console.log(err);
         
        });



        swal(
          {
            title: 'User Updated',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false

          }).then((result) => { this._router.navigate(['/user/viewuser']) })
      }
    })

   
  }

}
