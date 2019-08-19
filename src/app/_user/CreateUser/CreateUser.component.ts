
import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormArray, FormGroup, FormBuilder, FormsModule } from '@angular/forms';
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
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';

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

    roles: Role[];
    errorPassword = false


    constructor(private formBuilder: FormBuilder,
        private roleService: RoleService,
        private userService: UserService,
        private router: Router,
        private app: AppComponent) { }

    ngOnInit() {

        this.app.loading = true

        this.roleService.getRoles()
            .subscribe(role_res => {

                this.app.loading = false
                if (role_res.length > 0) {
                    this.roles = role_res;
                } else {
                    this.roles[0].name = 'User'
                }

            }, err => {
                console.log(err);
                this.roles[0].name = 'User'
                this.app.loading = false
            });

    }

    ///////////////////////////////////////////////////////////////////////////////////////

    errorPasswordDisable() {

        if (this.errorPassword) {
            this.errorPassword = false
        }
    }


    confirmPassword(password: string) {


        if (!isNullOrUndefined(this.user.password) && !isNullOrUndefined(password)) {

            if (password.length == this.user.password.length) {

                if (this.user.password == password) {
                    this.errorPassword = false
                } else {
                    this.errorPassword = true
                }
            }


        }


    }


    createUser(password: string) {


        // checking for empty fields
        if ( isNullOrUndefined(this.user.role) || isNullOrUndefined(this.user.password) || isNullOrUndefined(this.user.surname) || isNullOrUndefined(this.user.name) || isNullOrUndefined(password)) {

            swal({
                title: "Empty fields",
                text: "Please complete form before submitting",
                type: 'error',
                timer: 5000,
                showConfirmButton: true
            }).catch(swal.noop)

        } else
            if (this.user.role == '' || this.user.password == '' || this.user.surname == '' || this.user.name == '' || password == '') {

                swal({
                    title: "Empty fields",
                    text: "Please complete form before submitting",
                    type: 'error',
                    timer: 5000,
                    showConfirmButton: true
                }).catch(swal.noop)

            } else {

                if (this.errorPassword || this.user.password.length != password.length) {

                    swal({
                        title: "Password fields do not match",
                        text: "Please re-enter the same password to submit",
                        type: 'error',
                        timer: 5000,
                        showConfirmButton: true
                    }).catch(swal.noop)

                } else {

                    swal({
                        title: 'Create ' + this.user.name + ' ' + this.user.surname + ' as a user ',
                        text: "Are you sure you want to add " + this.user.name + ' ' + this.user.surname + " as a "+this.user.role+"?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger',
                        cancelButtonText: 'Cancel',
                        confirmButtonText: 'Yes, Save',
                        buttonsStyling: false
                    }).then((result) => {
                        if (result.value) {
                            this.user.idsystemusers = 0;

                            this.app.loading = true
                            this.userService.createUser(
                                this.user)
                                .subscribe(user_res => {

                                    console.log(user_res)
                                    this.app.loading = false

                                    if (user_res.idsystemusers > 0) {
                                        swal({
                                            title: 'User Created',
                                            type: 'success',
                                            confirmButtonClass: "btn btn-success",
                                            buttonsStyling: false

                                        }).then((result) => {
                                            this.router.navigate(['/user/viewuser'])
                                        })
                                    } else {

                                        swal({
                                            title: "Error submitting form",
                                            text: "we apologize for the error, please try again or contact your IT technician  ",
                                            type: 'error',
                                            timer: 5000,
                                            showConfirmButton: true
                                        }).catch(swal.noop).then((result) => {
                                            // this.router.navigate(['/user/viewuser'])
                                            document.location.reload();
                                        })

                                    }

                                }, (err) => {
                                    console.log(err);
                                    this.app.loading = false

                                });

                        }
                    })

                    /* validating duplicated email
                    this.app.loading = true
                    this.userService.checkUserEmail(this.user.email)
                        .subscribe(count_res => {

                            this.app.loading = false
                            if (count_res.count == 0) {


                            } else {
                                swal({
                                    title: "Email already exist",
                                    text: "Please enter another email for this user",
                                    type: 'error',
                                    timer: 5000,
                                    showConfirmButton: true
                                }).catch(swal.noop)
                            }


                        }, err => {
                            console.log(err)
                            this.app.loading = false
                        })
                        */

                }


            }

    }



    ///////////////////////////////////////////////////////////////////////////////////////

}
