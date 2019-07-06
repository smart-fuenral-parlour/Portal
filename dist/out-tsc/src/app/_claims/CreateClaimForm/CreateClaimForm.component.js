var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
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
var CreateClaimFormComponent = /** @class */ (function () {
    function CreateClaimFormComponent(app, _service, _router, formBuilder) {
        this.app = app;
        this._service = _service;
        this._router = _router;
        this.formBuilder = formBuilder;
        this.jsonDATA = [];
        this.JSONpolicyDetail = [];
        /*"idclaimtype": "1",
          "idpolicydetails": "1",
          "deceasedidentitynumber": "asdsad",
          "placeofdeath":"asdasd",
          "dateofdeath": "sdsad",
          "deathcertificate": "asdsad",
          "proposedburialdate": "asdsad",
          "idpayouttype":"1",
          "createddate": "20-06-2019",
          "idclaimstatus": "1",
          "deceasedname": "mom",
          "deceasedsurname": "1111"*/
        this.cities = [
            { value: 'paris-0', viewValue: 'Paris' },
            { value: 'miami-1', viewValue: 'Miami' },
            { value: 'bucharest-2', viewValue: 'Bucharest' },
            { value: 'new-york-3', viewValue: 'New York' },
            { value: 'london-4', viewValue: 'London' },
            { value: 'barcelona-5', viewValue: 'Barcelona' },
            { value: 'moscow-6', viewValue: 'Moscow' },
        ];
        this.emailFormControl = new FormControl('', [
            Validators.required,
            Validators.email,
        ]);
        this.matcher = new MyErrorStateMatcher();
    }
    CreateClaimFormComponent.prototype.isFieldValid = function (form, field) {
        // return !form.get(field).valid && form.get(field).touched;
    };
    CreateClaimFormComponent.prototype.displayFieldCss = function (form, field) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    };
    CreateClaimFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        // GET ID MEMBER FROM STORAGE
        if (localStorage.getItem('idmember') != null) {
            this.idMember = JSON.parse(localStorage.getItem('idmember'));
            //  console.log(this.idMember)
        }
        // GET ID USER FROM STORAGE
        if (localStorage.getItem('iduser') != null) {
            this.iduser = localStorage.getItem('iduser');
            // console.log(this.iduser)
        }
        // GET DROP DOWN
        this._service.getAllClaimType()
            .subscribe(function (claimT) {
            _this.dropdownClaimType = claimT;
            _this._service.getAllPayOutType()
                .subscribe(function (payout) {
                _this.dropdownPayOutType = payout;
            }, function (err) { return console.log(err); });
        }, function (err) { console.log(err); });
        this.app.loading = false;
    };
    CreateClaimFormComponent.prototype.createClaim = function () {
        this.name = document.querySelector('#name');
        this.surname = document.querySelector('#surname');
        this.idNumber = document.querySelector('#idnumber');
        this.PlaceOfDeath = document.querySelector('#pod');
        this.deathDate = document.querySelector('#dod');
        this.burialDate = document.querySelector('#burialdate');
        this.jsonDATA.push({
            'idclaimtype': this.selectedClaimType,
            'idpolicydetails': '1',
            'deceasedidentitynumber': this.idNumber.value,
            'placeofdeath': this.PlaceOfDeath.value,
            'dateofdeath': this.deathDate.value,
            'deathcertificate': 'doc.pdf',
            'proposedburialdate': this.burialDate.value,
            'idpayouttype': this.selectedPayOutType,
            'idclaimstatus': '1',
            'deceasedname': this.name.value,
            'iduser': this.iduser,
            'idmember': this.idMember,
            'deceasedsurname': this.surname.value
        });
        console.log(this.jsonDATA[0]);
        this._service.createClaim(this.jsonDATA[0])
            .subscribe(function (res) {
            console.log(res);
            document.location.reload();
        }, function (err) {
            console.log(err);
        });
        //-0--0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
        this.claimForm = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        });
        // Code for the Validator
        var $validator = $('.card-wizard form').validate({
            rules: {
                firstname: {
                    required: true,
                    minlength: 3
                },
                lastname: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    minlength: 3,
                }
            },
            highlight: function (element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
            },
            success: function (element) {
                $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
            },
            errorPlacement: function (error, element) {
                $(element).append(error);
            }
        });
        // Wizard Initialization
        $('.card-wizard').bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn-next',
            'previousSelector': '.btn-previous',
            onNext: function (tab, navigation, index) {
                var $valid = $('.card-wizard form').valid();
                if (!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            },
            onInit: function (tab, navigation, index) {
                // check number of tabs and fill the entire row
                var $total = navigation.find('li').length;
                var $wizard = navigation.closest('.card-wizard');
                var $first_li = navigation.find('li:first-child a').html();
                var $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
                $('.card-wizard .wizard-navigation').append($moving_div);
                $total = $wizard.find('.nav li').length;
                var $li_width = 100 / $total;
                var total_steps = $wizard.find('.nav li').length;
                var move_distance = $wizard.width() / total_steps;
                var index_temp = index;
                var vertical_level = 0;
                var mobile_device = $(document).width() < 600 && $total > 3;
                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }
                $wizard.find('.nav li').css('width', $li_width + '%');
                var step_width = move_distance;
                move_distance = move_distance * index_temp;
                var $current = index + 1;
                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                }
                else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }
                if (mobile_device) {
                    var x = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }
                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
                });
                $('.moving-tab').css('transition', 'transform 0s');
            },
            onTabClick: function (tab, navigation, index) {
                var $valid = $('.card-wizard form').valid();
                if (!$valid) {
                    return false;
                }
                else {
                    return true;
                }
            },
            onTabShow: function (tab, navigation, index) {
                var $total = navigation.find('li').length;
                var $current = index + 1;
                var $wizard = navigation.closest('.card-wizard');
                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $($wizard).find('.btn-next').hide();
                    $($wizard).find('.btn-finish').show();
                }
                else {
                    $($wizard).find('.btn-next').show();
                    $($wizard).find('.btn-finish').hide();
                }
                var button_text = navigation.find('li:nth-child(' + $current + ') a').html();
                setTimeout(function () {
                    $('.moving-tab').text(button_text);
                }, 150);
                var checkbox = $('.footer-checkbox');
                if (index !== 0) {
                    $(checkbox).css({
                        'opacity': '0',
                        'visibility': 'hidden',
                        'position': 'absolute'
                    });
                }
                else {
                    $(checkbox).css({
                        'opacity': '1',
                        'visibility': 'visible'
                    });
                }
                $total = $wizard.find('.nav li').length;
                var $li_width = 100 / $total;
                var total_steps = $wizard.find('.nav li').length;
                var move_distance = $wizard.width() / total_steps;
                var index_temp = index;
                var vertical_level = 0;
                var mobile_device = $(document).width() < 600 && $total > 3;
                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }
                $wizard.find('.nav li').css('width', $li_width + '%');
                var step_width = move_distance;
                move_distance = move_distance * index_temp;
                $current = index + 1;
                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                }
                else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }
                if (mobile_device) {
                    var x = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }
                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
                });
            }
        });
        // Prepare the preview for profile picture
        $('#wizard-picture').change(function () {
            var input = $(this);
            if (input[0].files && input[0].files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                };
                reader.readAsDataURL(input[0].files[0]);
            }
        });
        $('[data-toggle="wizard-radio"]').click(function () {
            var wizard = $(this).closest('.card-wizard');
            wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
            $(this).addClass('active');
            $(wizard).find('[claimForm="radio"]').removeAttr('checked');
            $(this).find('[claimForm="radio"]').attr('checked', 'true');
        });
        $('[data-toggle="wizard-checkbox"]').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('[claimForm="checkbox"]').removeAttr('checked');
            }
            else {
                $(this).addClass('active');
                $(this).find('[claimForm="checkbox"]').attr('checked', 'true');
            }
        });
        $('.set-full-height').css('height', 'auto');
    };
    CreateClaimFormComponent.prototype.ngOnChanges = function (changes) {
        var input = $(this);
        if (input[0].files && input[0].files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
            };
            reader.readAsDataURL(input[0].files[0]);
        }
    };
    CreateClaimFormComponent.prototype.ngAfterViewInit = function () {
        $(window).resize(function () {
            $('.card-wizard').each(function () {
                var $wizard = $(this);
                var index = $wizard.bootstrapWizard('currentIndex');
                var $total = $wizard.find('.nav li').length;
                var $li_width = 100 / $total;
                var total_steps = $wizard.find('.nav li').length;
                var move_distance = $wizard.width() / total_steps;
                var index_temp = index;
                var vertical_level = 0;
                var mobile_device = $(document).width() < 600 && $total > 3;
                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }
                $wizard.find('.nav li').css('width', $li_width + '%');
                var step_width = move_distance;
                move_distance = move_distance * index_temp;
                var $current = index + 1;
                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                }
                else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }
                if (mobile_device) {
                    var x = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }
                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
                });
                $('.moving-tab').css({
                    'transition': 'transform 0s'
                });
            });
        });
    };
    CreateClaimFormComponent = __decorate([
        Component({
            selector: 'app-CreateClaimForm',
            templateUrl: './CreateClaimForm.component.html',
            styleUrls: ['./CreateClaimForm.component.css']
        }),
        __metadata("design:paramtypes", [AppComponent, ServiceService, Router, FormBuilder])
    ], CreateClaimFormComponent);
    return CreateClaimFormComponent;
}());
export { CreateClaimFormComponent };
//# sourceMappingURL=CreateClaimForm.component.js.map