import { User } from './../../services/user/user';

import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormArray, FormGroup, FormBuilder,FormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { RoleService } from '../../services/role/role.service';

import { UserService } from '../../services/user/user.service';
import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component'
import { stringify } from 'querystring';

declare const $: any;





export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


@Component({
    selector: 'app-ViewUser',
    templateUrl: './ViewUser.component.html',
    styleUrls: ['./ViewUser.component.css']
})
export class ViewUserComponent implements OnInit {
    constructor( private formBuilder: FormBuilder, private _role: RoleService,private _user: UserService, private _router: Router, private app: AppComponent) { }
 
//////Initialized variables  

    users:User[];



    
   
////Functions//////////////////////////////////////////

ngOnInit() {


//get all users
    this._user.getUsers()
    .subscribe(res => {
        this.users=res;
        console.log(this.users)
    }, err => {
      console.log(err);
    });

   

}



    EditUser(index)
    {
       

        localStorage.setItem('selectedUser',JSON.stringify(this.users[index]));

        this._router.navigate(['/user/edituser']);
    }
 
    DeleteUser(index)
    {
        
        
      swal({
        title: 'Delete User',
        text: 'Are you sure you want to delete '+this.users[index].name+'?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes, Save',
        buttonsStyling: false
    }).then((result) => {
        if (result.value) {
         
           
            this._user.deleteUser(this.users[index].id)
            .subscribe(res => {
                console.log(res)
                
            }, err => {
              console.log(err);
            });

            swal(
                {
                    title: 'User Deleted',
                    //text: 'User Deleted',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false

                }).then((result) => { this._router.navigate(['/user/viewuser']) })
        }
    })

        
    }


    

 

}
