var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import { AppComponent } from 'src/app/app.component';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
var MyErrorStateMatcher = /** @class */ (function () {
    function MyErrorStateMatcher() {
    }
    MyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        var isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    };
    return MyErrorStateMatcher;
}());
export { MyErrorStateMatcher };
var LoginComponent = /** @class */ (function () {
    function LoginComponent(app, element, _service, router, formBuilder) {
        this.app = app;
        this.element = element;
        this._service = _service;
        this.router = router;
        this.formBuilder = formBuilder;
        this.test = new Date();
        this.validEmailRegister = false;
        this.validConfirmPasswordRegister = false;
        this.validPasswordRegister = false;
        this.validEmailLogin = false;
        this.validPasswordLogin = false;
        this.validTextType = false;
        this.validEmailType = false;
        this.validNumberType = false;
        this.validUrlType = false;
        this.pattern = "https?://.+";
        this.validSourceType = false;
        this.validDestinationType = false;
        this.matcher = new MyErrorStateMatcher();
        //////////////////////////////////////////////////////////////////////////////////////////////////
        this.emptyPASS = false;
        this.emptyNAME = false;
        this.isIncorrect = false;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // the dynamic animation of the form appear on show
        var navbar = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        var card = document.getElementsByClassName('card')[0];
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
        this.type = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            text: [null, Validators.required],
            username: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            number: [null, Validators.required],
            url: [null, Validators.required],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        }, {
            validator: PasswordValidation.MatchPassword // your validation method
        });
    };
    LoginComponent.prototype.changeEmpty = function () {
        //this.isIncorrect = false;
        this.emptyNAME = false;
        this.emptyPASS = false;
    };
    LoginComponent.prototype.logins = function () {
        var _this = this;
        this.password = document.querySelector('#password');
        this.username = document.querySelector('#username');
        this.app.loaderClass = 'load-wrapper-spinner';
        // TESTING EMPTY FIELDS
        if (!this.username.value) {
            this.emptyNAME = true;
            this.isIncorrect = false;
        }
        else {
            this.emptyNAME = false;
            this.isIncorrect = false;
        }
        if (!this.password.value) {
            this.emptyPASS = true;
            this.isIncorrect = false;
        }
        else {
            this.emptyPASS = false;
            this.isIncorrect = false;
        }
        //this.router.navigate(['/dashboard']);  
        if (!this.emptyNAME && !this.emptyPASS) {
            this.isIncorrect = false;
            this.app.loading = true;
            this._service.loginUser({ 'username': this.username.value, 'password': this.password.value })
                .subscribe(function (res) {
                _this.response = res;
                if (_this.response.length > 0) {
                    //localStorage.setItem('name', JSON.stringify(this.response.response[0].name+' '+this.response.response[0].surname));
                    // localStorage.setItem('role', JSON.stringify(this.response.response[0].role));     
                    // NEW API CODE              
                    localStorage.setItem('iduser', JSON.stringify(_this.response[0].iduser));
                    _this.app.loading = false;
                    _this.app.loaderClass = 'load-wrapper';
                    _this.router.navigate(['/dashboard']);
                }
                else {
                    console.log('Incorrect!');
                    _this.app.loading = false;
                    _this.isIncorrect = true;
                    _this.app.loaderClass = 'load-wrapper';
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login-cmp',
            templateUrl: './login.component.html',
        }),
        __metadata("design:paramtypes", [AppComponent, ElementRef, ServiceService, Router, FormBuilder])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map