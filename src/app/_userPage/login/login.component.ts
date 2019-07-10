import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import swal from 'sweetalert2';
import { Moment } from 'moment'
import * as moment from 'moment';
import { AppComponent } from 'src/app/app.component'


declare var $: any;
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { UserService } from 'src/app/services/user/user.service'

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { User, LoginUser } from 'src/app/services/user/user'


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { isNullOrUndefined } from 'util';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit, OnDestroy {

    test = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    pattern = "https?://.+";

    loginuser: LoginUser
    user: User
    login: FormGroup;
    type: FormGroup;
    //////////////////////////////////////////////////////////////////////////////////////////////////
    emptyPassword = false
    emptyUsername = false
    isIncorrect = false
    response


    constructor(private app: AppComponent,
        private element: ElementRef,
        private _service: ServiceService,
        private userService: UserService,
        private router: Router,
        private formBuilder: FormBuilder) {

        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {

        // the dynamic animation of the form appear on show
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);


        this.login = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            username: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            password: ['', Validators.required]
        });
    }

    changeEmpty() {
        this.isIncorrect = false;
        this.emptyUsername = false
        this.emptyPassword = false
    }

    logins(password, username) {

        this.app.loaderClass = 'load-wrapper-spinner'
        console.log(password)
        console.log(username)



        // TESTING USERNAME IS EMPTY FIELDS 
        if (isNullOrUndefined(username) || username == '') {
            this.emptyUsername = true
            this.isIncorrect = false
        } else {
            this.emptyUsername = false
            this.isIncorrect = false
        }

        // TESTING PASSWORD IS EMPTY FIELDS
        if (isNullOrUndefined(password) || password == '') {
            this.emptyPassword = true
            this.isIncorrect = false
        } else {
            this.emptyPassword = false
            this.isIncorrect = false
        }

        // 
        if (!this.emptyUsername && !this.emptyPassword) {


            this.isIncorrect = false
            this.app.loading = true

            console.log({ 'name': username, 'password': password })

            this.userService.loginUser({ 'name': username, 'password': password })
                .subscribe(loginuser_res => {

                    this.loginuser = loginuser_res
                    this.user = this.loginuser.response[0]

                    if (this.loginuser.status == 200) {

                        this.isIncorrect = false
                        this.app.loading = false
                        this.app.loaderClass = 'load-wrapper'
                        console.log('correct')

                        localStorage.clear()
                        sessionStorage.clear()

                        localStorage.setItem('user', JSON.stringify(this.user));
                        this.router.navigate(['/dashboard']);

                    } else
                        if (this.loginuser.status == 500) {
                            console.log('incorrect')
                            this.isIncorrect = true
                            this.isIncorrect = true
                            this.app.loading = false
                            this.app.loaderClass = 'load-wrapper'
                        } else {
                            
                            console.log('% ERROR %')
                            this.isIncorrect = true
                            this.app.loading = false
                            this.app.loaderClass = 'load-wrapper'
                        }

                }, err => {
                    console.log(err)
                })


        }


    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    }


}

