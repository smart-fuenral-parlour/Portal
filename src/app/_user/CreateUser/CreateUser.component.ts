
import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormArray, FormGroup, FormBuilder,FormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { patchComponentDefWithScope } from '@angular/core/src/render3/jit/module';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role/role.service';
import { Role } from '../../services/role/role';
import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';
import swal from 'sweetalert2';
import { Moment } from 'moment'
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component';

declare const $: any;

interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends Event {
    target: EventTarget;
    getMessage(): string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


@Component({
    selector: 'app-CreateUser',
    templateUrl: './CreateUser.component.html',
    styleUrls: ['./CreateUser.component.css']
})
export class CreateUserComponent implements OnInit {

 
user = new User;
  
    roles:Role[];
    selectedrole= new Role;
 
    constructor( private formBuilder: FormBuilder, private _role: RoleService,private _user: UserService, private _router: Router, private app: AppComponent) { }


    ///////////////////////////////////////////////////////////////////////////////////////

    createUser(){
    
        



      swal({
            title: 'Create '+this.user.name+' as a user ',
            text: "Are you sure you want to create "+this.user.name+" as a user?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Save',
            buttonsStyling: false
        }).then((result) => {
            if (result.value) {
                this.app.loading = true
                
                this._user.createUser(      
                    this.user)
                .subscribe(res => {
                   console.log(res)
                  }, (err) => {
                    console.log(err);
                   
                  });

                swal(
                    {
                        title: 'User Created',
                        //text: 'User Deleted',
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false

                    }).then((result) => { this._router.navigate(['/user/viewuser']) })
            }
        })



    
    
    
    }

 

    ///////////////////////////////////////////////////////////////////////////////////////
    ngOnInit() {
        this.app.loading = false
        

        this._role.getRoles()
        .subscribe(res => {
            this.roles=res;
        }, err => {
          console.log(err);
        });

    }

 

}
