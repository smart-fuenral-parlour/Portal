
import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Moment } from 'moment'

///////////////////// MY SERVICE CALL ///////////////////
import { MemberService } from 'src/app/services/member/member.service'
import { PolicytypeService } from 'src/app/services/policytype/policytype.service'
import { PolicydetailsService } from 'src/app/services/policydetails/policydetails.service'
import { BalanceService } from 'src/app/services/balance/balance.service'
import { BeneficiaryService } from 'src/app/services/beneficiary/beneficiary.service'
import { FileService } from 'src/app/services/file/file.service'
import { PolicystatusService } from 'src/app/services/policystatus/policystatus.service'
import { LifestatusService } from 'src/app/services/lifestatus/lifestatus.service'

///////////////////// MODEL CLASS CALLS ///////////////////
import { Member, MainMember } from 'src/app/services/member/member'
import { Policytype } from 'src/app/services/policytype/policytype'
import { Policydetails } from 'src/app/services/policydetails/policydetails'
import { Balance } from 'src/app/services/balance/balance'
import { Beneficiary } from 'src/app/services/beneficiary/beneficiary'
import { User } from 'src/app/services/user/user'
import { File } from 'src/app/services/file/file'
import { Policystatus } from 'src/app/services/policystatus/policystatus'
import { Lifestatus } from 'src/app/services/lifestatus/lifestatus'

/////////////////////////////////////////////////////////
import {Directive, ElementRef, HostListener, Input} from '@angular/core';
////////////////////////////////////////////////////////
import * as moment from 'moment';
import { AppComponent } from 'src/app/app.component'
import { type } from 'os';
import { isNullOrUndefined, isObject } from 'util';
import { timestamp } from 'rxjs/operators';
import { randomBytes } from 'crypto';
import { JsonPipe } from '@angular/common';



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
    selector: 'app-CreateMember',
    templateUrl: './CreateMember.component.html',
    styleUrls: ['./CreateMember.component.css']
})
export class CreateMemberComponent implements OnInit {

    beneficiaryNumber

    // MODEL CLASS INSTANCE
    member
    policytypes: Policytype[]
    policytype: Policytype
    policystatus: Policystatus
    lifestatus: Lifestatus
    user: User
    file
    key = "document";
    data

    // creating new objects
    
    setmember = new Member
    //setbeneficiary = new Beneficiary
    setbeneficiary = []
    setbalance = new Balance
    setpolicydetails = new Policydetails
    beneficiaryLeft

    // variables to show and hide 
    invalidID = false
    unhideCheckBox = false
    unhideBeneficiaryForm = false
    limitReached = false

    constructor(private formBuilder: FormBuilder,
        private memberService: MemberService,
        private lifestatusService: LifestatusService,
        private policystatusService: PolicystatusService,
        private policytypeService: PolicytypeService,
        private policydetailsService: PolicydetailsService,
        private balanceService: BalanceService,
        private beneficiaryService: BeneficiaryService,
        private fileService: FileService,
        private router: Router,
        private app: AppComponent) { }

    // province drop down list
    provinces = [
        { value: 'Gauteng', abrv: 'GP' },
        { value: 'Limpopo', abrv: 'L' },
        { value: 'Mpumalanga', abrv: 'MP' },
        { value: 'Free State', abrv: 'FS' },
        { value: 'North West', abrv: 'NW' },
        { value: 'Northern Cape', abrv: 'NC' },
        { value: 'Eastern Cape', abrv: 'EC' },
        { value: 'Western Cape', abrv: 'WC' },
        { value: 'Kwazulu Natal', abrv: 'KZN' },
    ];

    // Gender drop down list
    Genders = [
        { value: 'Male', abrv: 'M' },
        { value: 'Female', abrv: 'F' }
    ]
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email

    ]);

    matcher = new MyErrorStateMatcher();

    type: FormGroup;
    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    displayFieldCss(form: FormGroup, field: string) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-feedback': this.isFieldValid(form, field)
        };
    }


    ngOnInit() {

        ///////////////////////  work here   ////////////////////////////
        this.user = JSON.parse(localStorage.getItem('user'))

        this.policytypeService.getPolicytypes()
            .subscribe(policytype_res => {
                this.policytypes = policytype_res
            }, err => {
                console.log(err)
            })
        ///////////////////////////////////////////////////////

        this.app.loading = false

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
            selectedPolicyType: [null, Validators.requiredTrue],// drop down list
            createddate: [null, Validators.required],
            gender: [null, Validators.required], // drop down list
            selectedProvince: [null, Validators.required], // drop down list
            province: [null, Validators.required], // drop down list
            society: [null, Validators.required], // drop down list
            lastName: [null, Validators.required],
            housenumber: [null, Validators.required],
            streetname: [null, Validators.required],
            suburb: [null, Validators.required],
            phone: [null, Validators.required],
            email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        });
        // Code for the Validator  beneficiaryName

        const $validator = $('.card-wizard form').validate({
            /*  rules: {
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
              },*/

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

            onInit: function (tab: any, navigation: any, index: any) {

                // check number of tabs and fill the entire row
                let $total = navigation.find('li').length;
                let $wizard = navigation.closest('.card-wizard');

                let $first_li = navigation.find('li:first-child a').html();
                let $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
                $('.card-wizard .wizard-navigation').append($moving_div);

                $total = $wizard.find('.nav li').length;
                let $li_width = 100 / $total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width', $li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                let $current = index + 1;

                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }

                if (mobile_device) {
                    let x: any = index / 2;
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

            onTabClick: function (tab: any, navigation: any, index: any) {

                const $valid = $('.card-wizard form').valid();

                if (!$valid) {
                    return false;
                } else {
                    return true;
                }
            },

            onTabShow: function (tab: any, navigation: any, index: any) {
                let $total = navigation.find('li').length;
                let $current = index + 1;

                const $wizard = navigation.closest('.card-wizard');

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $($wizard).find('.btn-next').hide();
                    $($wizard).find('.btn-finish').show();
                } else {
                    $($wizard).find('.btn-next').show();
                    $($wizard).find('.btn-finish').hide();
                }

                const button_text = navigation.find('li:nth-child(' + $current + ') a').html();

                setTimeout(function () {
                    $('.moving-tab').text(button_text);
                }, 150);

                const checkbox = $('.footer-checkbox');

                if (index !== 0) {
                    $(checkbox).css({
                        'opacity': '0',
                        'visibility': 'hidden',
                        'position': 'absolute'
                    });
                } else {
                    $(checkbox).css({
                        'opacity': '1',
                        'visibility': 'visible'
                    });
                }
                $total = $wizard.find('.nav li').length;
                let $li_width = 100 / $total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width', $li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                $current = index + 1;

                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }

                if (mobile_device) {
                    let x: any = index / 2;
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
            const input = $(this);

            if (input[0].files && input[0].files[0]) {
                const reader = new FileReader();

                reader.onload = function (e: any) {
                    $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                };
                reader.readAsDataURL(input[0].files[0]);
            }
        });

        $('[data-toggle="wizard-radio"]').click(function () {
            const wizard = $(this).closest('.card-wizard');
            wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
            $(this).addClass('active');
            $(wizard).find('[type="radio"]').removeAttr('checked');
            $(this).find('[type="radio"]').attr('checked', 'true');
        });

        $('[data-toggle="wizard-checkbox"]').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('[type="checkbox"]').removeAttr('checked');
            } else {
                $(this).addClass('active');
                $(this).find('[type="checkbox"]').attr('checked', 'true');
            }
        });

        $('.set-full-height').css('height', 'auto');

    }



    get BeneficiaryForm() {
        return (<FormArray>(<FormGroup>this.type.get('BeneficiaryGroup')).get('beneficiaryArray')).controls;
    }


    addBeneficiary() {


        if (this.beneficiaryLeft <= this.policytype.maximumbeneficiaries && this.beneficiaryLeft > 0) {

            this.limitReached = false

            this.BeneficiaryForm.push(this.formBuilder.control(
                this.formBuilder.group({
                    beneficiaryName: [null, Validators.required],
                    beneficiarySurname: [null, Validators.required],
                    beneficiaryID: [null, Validators.required],
                })

            ))

            this.beneficiaryLeft = this.policytype.maximumbeneficiaries - this.BeneficiaryForm.length


        } else {
            this.limitReached = true

        }



    }

    removeBeneficiary(index): void {
        (((this.type.get('BeneficiaryGroup') as FormGroup).get('beneficiaryArray')) as FormArray).removeAt(index)

        this.beneficiaryLeft = this.beneficiaryLeft + 1
        this.limitReached = false
    }

    // hides or unhides beneficiary form by click on checkbox
    checkBeneficiary() {

        if (this.unhideBeneficiaryForm == true) {

            this.beneficiaryLeft = this.policytype.maximumbeneficiaries
            this.unhideBeneficiaryForm = false
            for (let x = 0; x < this.BeneficiaryForm.length; x++) {
                // removes the added beneficiary form if disable
                (((this.type.get('BeneficiaryGroup') as FormGroup).get('beneficiaryArray')) as FormArray).removeAt(x)

            }
            console.log('unchecked')

        } else {
            this.unhideBeneficiaryForm = true
            console.log('checked')

        }
    }

    // check the maximum number of beneficiary based on the selected policy type
    testMaximumBeneficiary() {
        this.unhideBeneficiaryForm = false;
        this.unhideCheckBox = false

        // the selected poliy type
        this.policytypeService.getPolicytype(this.setmember.idpolicytype)
            .subscribe(res => {

                this.policytype = res[0]
                this.beneficiaryLeft = this.policytype.maximumbeneficiaries
                this.policytype.premium

                console.log(this.policytype.maximumbeneficiaries)

                if (this.policytype.maximumbeneficiaries == 0) {
                    this.unhideCheckBox = false
                } else {
                    this.unhideCheckBox = true

                }

            }, err => {
                console.log(err)
            })


    }


    finishCreate() {

        let BeneficiaryName
        let BeneficiarySurname
        let BeneficiaryIdNumber
        let newDate = new Date

        this.setmember.idlifestatus = 1
        this.setmember.membershipnumber = ('MN' + (newDate).getMilliseconds().toString().slice(0, 3) + (this.setmember.identitynumber).toString().slice(6, 9))
        this.setmember.createdby = (this.user.name + " " + this.user.surname)
        this.setmember.balance = this.policytype.premium
        this.setmember.lastpaiddate = moment.parseZone(newDate).utc().format()


        this.policystatusService.getPolicystatus(1)
            .subscribe(policystatus_res => { // getting the name of the policy status by the idpolicystatus
                this.setmember.policystatus = policystatus_res[0].name


                this.lifestatusService.getLifestatus(this.setmember.idlifestatus)
                    .subscribe(lifestatus_res => { // getting the name of the life status by the idlifestatus
                        this.setmember.lifestatus = lifestatus_res[0].name



                        this.setbeneficiary = []
                        if (this.unhideBeneficiaryForm) {

                            // creating beneficiary
                            for (let x = 0; x < this.BeneficiaryForm.length; x++) {

                                BeneficiaryIdNumber = document.querySelector('#beneficiaryID' + x)
                                BeneficiarySurname = document.querySelector('#beneficiarySurname' + x)
                                BeneficiaryName = document.querySelector('#beneficiaryName' + x)

                                this.setbeneficiary.push(
                                    {
                                        //idbeneficiary: number;
                                        name: BeneficiaryName.value,
                                        surname: BeneficiarySurname.value,
                                        identitynumber: BeneficiaryIdNumber.value,
                                        idlifestatus: 1,
                                        lifestatus: lifestatus_res[0].name
                                    }
                                )

                                /**
                                 *                              this.setmember.beneficiary[x].name = BeneficiaryName.value
                                                                this.setmember.beneficiary[x].surname = BeneficiarySurname.value
                                                                this.setmember.beneficiary[x].identitynumber = BeneficiaryIdNumber.value
                                                                this.setmember.beneficiary[x].idlifestatus = 1
                                                                this.setmember.beneficiary[x].lifestatus = lifestatus_res[0].name
                                
                                                                
                                    {
                                      //idbeneficiary: number;
                                      name: string;
                                      surname: string;
                                      identitynumber: string;
                                      idlifestatus: number;
                                      lifestatus: string;
                                      createddate: Date;
                                    }
                                 */



                            }

                        }

                        console.log(this.setmember)


                        this.app.loading = false



                    }, err => {
                        console.log(err)
                    })
            }, err => {
                console.log(err)
            })


        console.log(this.setmember)

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
        }).then((result) => {
            if (result.value) {
                this.app.loading = true

                // creating member


                this.setmember.idlifestatus = 1
                this.setmember.membershipnumber = ('MN' + (newDate).getMilliseconds().toString().slice(0, 3) + (this.setmember.identitynumber).toString().slice(6, 9))
                this.setmember.createdby = (this.user.name + " " + this.user.surname)

                
                this.lifestatusService.getLifestatus(this.setmember.idlifestatus)
                    .subscribe(lifestatus_res => { // getting the name of the life status by the idlifestatus
                        this.setmember.lifestatus = lifestatus_res[0].name

                        this.policystatusService.getPolicystatus(1)
                            .subscribe(policystatus_res => { // getting the name of the policy status by the idpolicystatus
                                this.setmember.policystatus = policystatus_res[0].name
 
                                console.log(this.setmember)

                            }, err => {
                                console.log(err)
                            })
                    }, err => {
                        console.log(err)
                    })


                swal(
                    {
                        title: 'Member Created',
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false

                    }).then((result) => document.location.reload()) //console.log('done'))
            }
        })

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    files() {

        this.data = {
            document: this.file
        }

        this.fileService.createFile(this.file)
            .subscribe(file_res => {
                console.log(this.data)
                console.log(file_res)
                console.log(this.file)
            }, err => {
                console.log(err)
            })


    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ngOnChanges(changes: SimpleChanges) {
        const input = $(this);

        if (input[0].files && input[0].files[0]) {
            const reader: any = new FileReader();

            reader.onload = function (e: any) {
                $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
            };
            reader.readAsDataURL(input[0].files[0]);
        }
    }

    ngAfterViewInit() {

        $(window).resize(() => {
            $('.card-wizard').each(function () {

                const $wizard = $(this);
                const index = $wizard.bootstrapWizard('currentIndex');
                let $total = $wizard.find('.nav li').length;
                let $li_width = 100 / $total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if (mobile_device) {
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width', $li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                let $current = index + 1;

                if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
                    move_distance -= 8;
                } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
                    move_distance += 8;
                }

                if (mobile_device) {
                    let x: any = index / 2;
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
    }


}
