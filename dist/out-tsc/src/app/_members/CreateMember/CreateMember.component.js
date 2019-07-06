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
import swal from 'sweetalert2';
import * as moment from 'moment';
import { AppComponent } from 'src/app/app.component';
// MY SERVICE CALL
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import { MemberService } from 'src/app/services/member/member.service';
import { PolicytypeService } from 'src/app/services/policytype/policytype.service';
import { stringify } from '@angular/compiler/src/util';
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
var CreateMemberComponent = /** @class */ (function () {
    function CreateMemberComponent(formBuilder, _service, _meberService, _policytypeService, _routet, app) {
        this.formBuilder = formBuilder;
        this._service = _service;
        this._meberService = _meberService;
        this._policytypeService = _policytypeService;
        this._routet = _routet;
        this.app = app;
        this.invalid = false;
        this.invalidID = false;
        this.typeSelected = false;
        // province drop downkzn
        this.provinces = [
            { value: 'Gauteng', viewValue: 'Gauteng', abrv: 'GP' },
            { value: 'Limpopo', viewValue: 'Limpopo', abrv: 'L' },
            { value: 'Mpumalanga', viewValue: 'Mpumalanga', abrv: 'MP' },
            { value: 'Free State', viewValue: 'Free State', abrv: 'FS' },
            { value: 'North West', viewValue: 'North West', abrv: 'NW' },
            { value: 'Northern Cape', viewValue: 'Northern Cape', abrv: 'NC' },
            { value: 'Eastern Cape', viewValue: 'Eastern Cape', abrv: 'EC' },
            { value: 'Western Cape', viewValue: 'Western Cape', abrv: 'WC' },
            { value: 'Kwazulu Natal', viewValue: 'Kwazulu Natal', abrv: 'KZN' },
        ];
        this.genders = [
            { value: 'Male', name: 'Male', abrv: 'M' },
            { value: 'Female', name: 'Female', abrv: 'F' }
        ];
        this.emailFormControl = new FormControl('', [
            Validators.required,
            Validators.email
        ]);
        this.matcher = new MyErrorStateMatcher();
    }
    CreateMemberComponent.prototype.isFieldValid = function (form, field) {
        return !form.get(field).valid && form.get(field).touched;
    };
    CreateMemberComponent.prototype.displayFieldCss = function (form, field) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    };
    CreateMemberComponent.prototype.ngOnInit = function () {
        this.app.loading = false;
        // this.setArrayInputs(this.arrayInputs)
        this.type = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            BeneficiaryGroup: this.formBuilder.group({
                beneficiaryArray: this.formBuilder.array([
                    this.formBuilder.control({
                        beneficiaryName: [null, Validators.required],
                        beneficiarySurname: [null, Validators.required],
                        beneficiaryID: [null, Validators.required],
                    })
                ])
            }),
            firstName: [null, Validators.required],
            idnumber: [null, Validators.required],
            selectedPolicyType: [null, Validators.requiredTrue],
            createddate: [null, Validators.required],
            gender: [null, Validators.required],
            selectedProvince: [null, Validators.required],
            province: [null, Validators.required],
            society: [null, Validators.required],
            lastName: [null, Validators.required],
            housenumber: [null, Validators.required],
            streetname: [null, Validators.required],
            suburb: [null, Validators.required],
            phone: [null, Validators.required],
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        });
        // Code for the Validator  beneficiaryName
        var $validator = $('.card-wizard form').validate({
            /*           rules: {
                           firstname: {
                               required: true,
                               minlength: 2
                           },
                           beneficiaryName: {
                               required: true,
                               minlength: 2
                           },
                           beneficiarySurname: {
                               required: true,
                               minlength: 2
                           },
                           beneficiaryID: {
                               required: true,
                               minlength: 13,
                               maxlength: 13
                           },
                          gender: {
                               required: true,
                               minlength: 2
                           },
                           selectedProvince: {
                               required: true,
                               minlength: 2
                           },
                           selectedPolicyType: {
                               required: true,
                               minlength: 2
                           },
                           province: {
                               required: true,
                               minlength: 2
                           },
                           date: {
                               date: true,
                               minlength: 1
                           },
                           idnumber: {
                               required: true,
                               minlength: 13,
                               invalidID: true
                           },
                           streetname: {
                               required: true,
                               minlength: 2
                           },
                           suburb: {
                               required: true,
                               minlength: 2
                           },
                           housenumber: {
                               required: true,
                               minlength: 1
                           },
                           phone: {
                               required: true,
                               minlength: 10,
                               maxlength: 10
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
           */
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
    // check if the age of beneficiary is allowed  {{'beneficiaryID'+i}}
    CreateMemberComponent.prototype.checkBeneficiaryAge = function (BenefitIDnum) {
        var x = 0;
        var myValue;
        myValue = BenefitIDnum.value + x;
        var year = 0;
        var age = 0;
        var currentYear = parseInt(moment(new Date()).format('YYYY'));
        var testYearInput = parseInt(moment(new Date()).format('YY'));
        if ((BenefitIDnum.value.length + x) == 13) {
            console.log('correct id number length');
            if (parseInt(myValue.slice(0, 2)) <= testYearInput) {
                // for those born from the year 2000
                year = parseInt('20' + myValue.slice(0, 2));
                age = currentYear - year;
                if (age < 18) {
                    console.log('member aged ' + age + ' is not allowed');
                    swal({
                        title: "beneficiaryName not allowed as Beneficiary",
                        text: "Beneficiary must be older than  {maxAge (18)} years older",
                        timer: 2000,
                        showConfirmButton: true
                    }).catch(swal.noop);
                }
                else {
                    console.log('member aged ' + age + ' is allowed');
                }
            }
            else {
                // for those born before the year 2000
                year = parseInt('19' + myValue.slice(0, 2));
                age = currentYear - year;
                if (age < 18) {
                    console.log('member aged ' + age + ' is not allowed');
                    swal({
                        title: "beneficiaryName not allowed as Beneficiary",
                        text: "Beneficiary must be older than  {maxAge (18)} years older",
                        timer: 2000,
                        showConfirmButton: true
                    }).catch(swal.noop);
                }
                else {
                    console.log('member aged ' + age + ' is allowed');
                }
            }
        }
        else {
            console.log('id number is short');
        }
    };
    CreateMemberComponent.prototype.test = function (i) {
        console.log(i);
    };
    Object.defineProperty(CreateMemberComponent.prototype, "BeneficiaryForm", {
        get: function () {
            return this.type.get('BeneficiaryGroup').get('beneficiaryArray').controls;
        },
        enumerable: true,
        configurable: true
    });
    CreateMemberComponent.prototype.addBeneficiary = function () {
        this.BeneficiaryForm.push(this.formBuilder.control(this.formBuilder.group({
            beneficiaryName: [null, Validators.required],
            beneficiarySurname: [null, Validators.required],
            beneficiaryID: [null, Validators.required],
        })));
    };
    CreateMemberComponent.prototype.removeBeneficiary = function (index) {
        (this.type.get('BeneficiaryGroup').get('beneficiaryArray')).removeAt(index);
    };
    CreateMemberComponent.prototype.testBeneficiaryAge = function (i) {
        var birthyear;
        var maxAge = 57;
        this.BenefitIDnum = document.querySelector('#beneficiaryID' + i);
        var name;
        if (this.BenefitIDnum.value.length == 13) {
            var age = 0;
            birthyear = this.BenefitIDnum.value;
            age = parseInt(moment(new Date()).format('YYYY')) - parseInt('19' + birthyear.slice(0, 2));
            console.log('test');
            // for those born from the year 2000
            if (parseInt(birthyear.slice(0, 2)) <= parseInt(moment(new Date()).format('YY'))) {
                if (age < maxAge) {
                    console.log('successp');
                }
                else {
                    swal({
                        title: " not allowed as Beneficiary",
                        text: "Beneficiary must not be older than " + maxAge + " years older",
                        timer: 2000,
                        showConfirmButton: true
                    }).catch(swal.noop);
                }
            }
            else {
                if (age < maxAge) {
                    console.log('successp');
                }
                else {
                    swal({
                        title: " cannot be added as a Beneficiary",
                        text: "Beneficiary must not be older than " + maxAge + " years older",
                        timer: 5500,
                        showConfirmButton: true
                    }).catch(swal.noop);
                }
            }
        }
    };
    // testing the age of the member to determine their policy types
    CreateMemberComponent.prototype.testMemberAge = function (identitynumber) {
        console.log(stringify(identitynumber).length);
        // storing id number on string function to access string properties   
        if (stringify(identitynumber).length == 13) {
            var age = 0;
            if (parseInt(stringify(identitynumber).slice(0, 2)) <= parseInt(moment(new Date()).format('YY'))) {
                // for those born after the year 2000
                age = parseInt(moment(new Date()).format('YYYY')) - parseInt('20' + stringify(identitynumber).slice(0, 2));
                console.log('20: ' + age);
                this._policytypeService.getPolicytypebyage(age)
                    .subscribe(function (policytype_res) {
                    console.log(policytype_res);
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                // for those born before the year 2000
                age = parseInt(moment(new Date()).format('YYYY')) - parseInt('19' + stringify(identitynumber).slice(0, 2));
                console.log('19: ' + age);
                this._policytypeService.getPolicytypebyage(age)
                    .subscribe(function (policytype_res) {
                    console.log(policytype_res);
                }, function (err) {
                    console.log(err);
                });
            }
        }
    };
    CreateMemberComponent.prototype.finishCreate = function (name, surname, identitynumber, gender, housenumber, streetname, suburb, province, contactnumber, email, idpolicytype) {
        var _this = this;
        var beneficiary;
        var policydetails;
        var balance;
        var member = {
            'name': name,
            'surname': surname,
            'identitynumber': identitynumber,
            'email': email,
            'contactnumber': contactnumber,
            'gender': gender,
            'housenumber': housenumber,
            'streetname': streetname,
            'suburb': suburb,
            'province': province,
            'idpolicytype': idpolicytype,
            'iduser': 1,
            'idlifestatus': 1,
        };
        // UPLOAD DOCUMENT
        // {'document': document}
        console.log(member);
        swal({
            title: 'Finish Create',
            text: "Save Member?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Save',
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                _this.app.loading = true;
                _this._service.createMember(member)
                    .subscribe(function (member_res) {
                    //let response = member_res
                    console.log(member_res[0].idmember);
                    policydetails = {
                        'idmember': member_res[0].idmember,
                        'membershipnumber': member_res[0].membershipnumber,
                        'idpolicystatus': 1,
                        'iduser': member_res[0].iduser,
                        'idpolicytype': member_res[0].idpolicytype
                    };
                    _this._service.getPolicyTypeDetails(member_res[0].idpolicytype)
                        .subscribe(function (policytupe_res) {
                        _this._service.createMemberPolicyDetails(policydetails)
                            .subscribe(function (policyD) {
                            console.log(policyD);
                            balance = {
                                'idpolicydetails': policyD[0].idpolicydetails,
                                'amount': member_res[0].premium,
                                'lastpaiddate': '20/06/19' //new Date()
                            };
                            console.log(balance);
                            _this._service.createMemberBalanceDetails(balance)
                                .subscribe(function (balance) {
                                console.log(balance);
                                for (var i = 0; i < _this.BeneficiaryForm.length; i++) {
                                    beneficiary[i].idmember = _this.response[0].idmember;
                                    beneficiary[i].createddate = _this.response[0].createddate;
                                    _this._service.createMemberBeneficiary(beneficiary[i])
                                        .subscribe(function (ben) {
                                        console.log(ben);
                                    }, function (err) {
                                        console.log(err);
                                    });
                                }
                            }, function (err) { console.log(err); });
                        }, function (err) {
                            console.log(err);
                        });
                    }, function (err) {
                        console.log(err);
                    });
                    _this.app.loading = false;
                }, function (err) { return console.log(err); });
                swal({
                    title: 'Member Created',
                    //text: 'Member Deleted',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                }).then(function (result) { return window.location.reload(); }); //console.log('done'))
            }
        });
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    CreateMemberComponent.prototype.ngOnChanges = function (changes) {
        var input = $(this);
        if (input[0].files && input[0].files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
            };
            reader.readAsDataURL(input[0].files[0]);
        }
    };
    CreateMemberComponent.prototype.ngAfterViewInit = function () {
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
    CreateMemberComponent = __decorate([
        Component({
            selector: 'app-CreateMember',
            templateUrl: './CreateMember.component.html',
            styleUrls: ['./CreateMember.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            ServiceService,
            MemberService,
            PolicytypeService,
            Router,
            AppComponent])
    ], CreateMemberComponent);
    return CreateMemberComponent;
}());
export { CreateMemberComponent };
//# sourceMappingURL=CreateMember.component.js.map