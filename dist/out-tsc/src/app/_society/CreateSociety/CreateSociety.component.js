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
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import { AppComponent } from 'src/app/app.component';
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
var CreateSocietyComponent = /** @class */ (function () {
    function CreateSocietyComponent(app, formBuilder, _servive, _routet) {
        this.app = app;
        this.formBuilder = formBuilder;
        this._servive = _servive;
        this._routet = _routet;
        // province drop downkzn
        this.provinces = [
            { value: 'gauteng-0', viewValue: 'Gauteng', abrv: 'GP' },
            { value: 'limpopo-1', viewValue: 'Limpopo', abrv: 'L' },
            { value: 'mpumalanga-2', viewValue: 'Mpumalanga', abrv: 'MP' },
            { value: 'free-state-3', viewValue: 'Free State', abrv: 'FS' },
            { value: 'north-west-4', viewValue: 'North West', abrv: 'NW' },
            { value: 'northern-cape-5', viewValue: 'Northern Cape', abrv: 'NC' },
            { value: 'eastern-cape-6', viewValue: 'Eastern Cape', abrv: 'EC' },
            { value: 'western-cape-7', viewValue: 'Western Cape', abrv: 'WC' },
            { value: 'kwazulu-natal-8', viewValue: 'Kwazulu Natal', abrv: 'KZN' },
        ];
        this.genders = [
            { value: 'male-0', name: 'Male', abrv: 'M' },
            { value: 'female-1', name: 'Female', abrv: 'F' }
        ];
        this.emailFormControl = new FormControl('', [
            Validators.required,
            Validators.email,
        ]);
        this.matcher = new MyErrorStateMatcher();
    }
    CreateSocietyComponent.prototype.isFieldValid = function (form, field) {
        return !form.get(field).valid && form.get(field).touched;
    };
    CreateSocietyComponent.prototype.displayFieldCss = function (form, field) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    };
    Object.defineProperty(CreateSocietyComponent.prototype, "Beneficiary", {
        ///////////////////////////////////////////////////////////////////////////////////////
        get: function () {
            return this.type.get('beneficiary');
        },
        enumerable: true,
        configurable: true
    });
    CreateSocietyComponent.prototype.addBeneficiary = function () {
        this.Beneficiary.push(this.formBuilder.control(['']));
    };
    CreateSocietyComponent.prototype.removeBeneficiary = function (index) {
        this.type.controls.beneficiary["controls"].splice(index, 1);
    };
    ///////////////////////////////////////////////////////////////////////////////////////
    CreateSocietyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.app.loading = false;
        this._servive.getSociety()
            .subscribe(function (res) {
            _this.response = res;
            _this.societies = _this.response.response;
            console.log(_this.societies);
        }, function (err) { return console.log(err); });
        // this.setArrayInputs(this.arrayInputs)
        this.type = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            beneficiaryName: [null, Validators.required],
            beneficiarySurname: [null, Validators.required],
            beneficiaryID: [null, Validators.required],
            beneficiary: this.formBuilder.array([ //this.formBuilder.group({ })
            ]),
            societyname: [null, Validators.required],
            contact: [null, Validators.required],
            gender: [null, Validators.required],
            province: [null, Validators.required],
            society: [null, Validators.required],
            member: [null, Validators.required],
            housenumber: [null, Validators.required],
            streetname: [null, Validators.required],
            suburb: [null, Validators.required],
            phone: [null, Validators.required],
            agree: [null, Validators.required],
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        });
        // Code for the Validator
        var $validator = $('.card-wizard form').validate({
            rules: {
                societyname: {
                    //    required: true,
                    minlength: 2
                },
                gender: {
                    required: true,
                    minlength: 2
                },
                province: {
                    required: true,
                    minlength: 2
                },
                agree: {
                    required: true
                },
                contact: {
                    //     required: true,
                    minlength: 10,
                    maxlength: 10
                },
                streetname: {
                    ///    required: true,
                    minlength: 2
                },
                suburb: {
                    //   required: true,
                    minlength: 2
                },
                housenumber: {
                    //    required: true,
                    minlength: 1
                },
                phone: {
                    // required: true,
                    minlength: 10,
                    maxlength: 10
                },
                member: {
                    //     required: true,
                    minlength: 3
                },
                email: {
                    // required: true,
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
            $(wizard).find('[type="radio"]').removeAttr('checked');
            $(this).find('[type="radio"]').attr('checked', 'true');
        });
        $('[data-toggle="wizard-checkbox"]').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('[type="checkbox"]').removeAttr('checked');
            }
            else {
                $(this).addClass('active');
                $(this).find('[type="checkbox"]').attr('checked', 'true');
            }
        });
        $('.set-full-height').css('height', 'auto');
    };
    CreateSocietyComponent.prototype.ngOnChanges = function (changes) {
        var input = $(this);
        if (input[0].files && input[0].files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
            };
            reader.readAsDataURL(input[0].files[0]);
        }
    };
    CreateSocietyComponent.prototype.ngAfterViewInit = function () {
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
    CreateSocietyComponent = __decorate([
        Component({
            selector: 'app-CreateSociety',
            templateUrl: './CreateSociety.component.html',
            styleUrls: ['./CreateSociety.component.css']
        }),
        __metadata("design:paramtypes", [AppComponent, FormBuilder, ServiceService, Router])
    ], CreateSocietyComponent);
    return CreateSocietyComponent;
}());
export { CreateSocietyComponent };
//# sourceMappingURL=CreateSociety.component.js.map