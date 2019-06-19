import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import swal from 'sweetalert2';
import { Moment } from 'moment'
import * as moment from 'moment';
import { AppComponent } from 'src/app/app.component'


declare var $: any;
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';

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

    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    validEmailRegister: boolean = false;
    validConfirmPasswordRegister: boolean = false;
    validPasswordRegister: boolean = false;
  
    validEmailLogin: boolean = false;
    validPasswordLogin: boolean = false;
  
    validTextType: boolean = false;
    validEmailType: boolean = false;
    validNumberType: boolean = false;
    validUrlType: boolean = false;
    pattern = "https?://.+";
    validSourceType: boolean = false;
    validDestinationType: boolean = false;
  
    matcher = new MyErrorStateMatcher();
    register : FormGroup;
    login : FormGroup;
    type : FormGroup;
    //////////////////////////////////////////////////////////////////////////////////////////////////
    jsonLOGIN ; emptyPASS = false; emptyNAME = false
    username; password; isIncorrect = false; response


    constructor(private app: AppComponent, private element: ElementRef, private _service: ServiceService, private router: Router, private formBuilder: FormBuilder) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {

        // the dynamic animation of the form appear on show
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);

               
        this.login = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            username: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            password: ['', Validators.required]
         });
         
            this.type = this.formBuilder.group({
              // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
              text: [null, Validators.required],
              username: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
              number: [null, Validators.required],
              url: [null , Validators.required],
              // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
              password: ['', Validators.required],
              confirmPassword: ['', Validators.required],
             }, {
               validator: PasswordValidation.MatchPassword // your validation method
           });
    }
     
    changeEmpty() {
        //this.isIncorrect = false;
        this.emptyNAME = false
        this.emptyPASS = false
    }

    logins() {
        this.password = document.querySelector('#password')
        this.username = document.querySelector('#username')
        this.app.loaderClass = 'load-wrapper-spinner'


        
        // TESTING EMPTY FIELDS
        if( !this.username.value ) {
            this.emptyNAME = true
            this.isIncorrect = false
        } else {
            this.emptyNAME = false
            this.isIncorrect = false
        }

        if( !this.password.value ) {
            this.emptyPASS = true
            this.isIncorrect = false
        } else {
            this.emptyPASS = false
            this.isIncorrect = false
        }

//this.router.navigate(['/dashboard']);  
        if ( !this.emptyNAME && !this.emptyPASS) {

            this.isIncorrect = false
            this.app.loading = true
            
            this._service.loginUser({'name': this.username.value,'password': this.password.value})
            .subscribe( res => {
               this.response = res

               if( this.response.status == 200 ) {

                this.jsonLOGIN = this.response.response
                   console.log('name: '+this.response.response[0].name+' '+this.response.response[0].surname)  
                   
                   localStorage.setItem('name', JSON.stringify(this.response.response[0].name+' '+this.response.response[0].surname));
                   localStorage.setItem('role', JSON.stringify(this.response.response[0].role));
                   this.app.loading = false
                   this.router.navigate(['/dashboard']);
                   this.app.loaderClass = 'load-wrapper' 
/**
 * 
                   localStorage.setItem('name', JSON.stringify(id));
                // GETTING NAME OF THE CREATOR
            if(!isNullOrUndefined( localStorage.getItem('name') )){
                this.creator = JSON.parse(localStorage.getItem('name'))
            } else {
                this.creator = 'System'
            }
        
 */
               } else {

                   console.log('Incorrect!')
                   this.app.loading = false    
                   this.isIncorrect = true
                   this.app.loaderClass = 'load-wrapper'               
               }
            },
            err => {
                console.log(err)
               
            })

            
        }

       
    }

    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }


}

