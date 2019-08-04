
import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

///////////////////// MY SERVICE CALL ///////////////////
import { MemberService } from 'src/app/services/member/member.service'
import { PolicytypeService } from 'src/app/services/policytype/policytype.service'
import { BeneficiaryService } from 'src/app/services/beneficiary/beneficiary.service'
import { FileService } from 'src/app/services/file/file.service'

///////////////////// MODEL CLASS CALLS ///////////////////
import { Member } from 'src/app/services/member/member'
import { Policytype } from 'src/app/services/policytype/policytype'
import { Beneficiary } from 'src/app/services/beneficiary/beneficiary'
import { User } from 'src/app/services/user/user'
import { File } from 'src/app/services/file/file'

/////////////////////////////////////////////////////////
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import * as moment from 'moment';
import { AppComponent } from 'src/app/app.component'



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



    // MODEL CLASS INSTANCE
    member: Member
    policytypes: Policytype[]
    user: User
    file
    key = "document";
    data

    // creating new objects    
    setmember = new Member
    setbeneficiary = new Beneficiary
    policytypeDetails = new Policytype
    beneficiaryCount = 0
    maxNumberAllowed = 0
    beneficiaryDetails = 'No beneficiary added for member'

    // variables to show and hide 
    invalidID = false
    unhideCheckBox = false
    unhideBeneficiaryForm = false
    limitReached = false

    constructor(private formBuilder: FormBuilder,
        private memberService: MemberService,
        private policytypeService: PolicytypeService,
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

        this.user = JSON.parse(localStorage.getItem('user')) // getting user details
        this.policytypeDetails.premium = '0' // prevents the currency pipe from breaking initialize premium


        this.policytypeService.getPolicytypes()
            .subscribe(policytype_res => {
                this.policytypes = policytype_res
            }, err => {
                console.log(err)
            })

        this.app.loading = false


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
             rules: {
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

        $('[data-toggle="wizard-checkbox"]').click(function (navigation: any) {

            const $wizard = navigation.closest('.card-wizard');

            //navigation: any  form-check-input check-agree  $($wizard).find('.btn-finish').show();   


            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('[type="checkbox"]').removeAttr('checked');
            } else {
                $(this).addClass('active');
                console.log('checkbox click')
                $(this).find('[type="checkbox"]').attr('checked', 'true');
            }
        });

        $('.set-full-height').css('height', 'auto');

    }



    get BeneficiaryForm() {
        return (<FormArray>(<FormGroup>this.type.get('BeneficiaryGroup')).get('beneficiaryArray')).controls;
    }


    addBeneficiary() {

        console.log(this.maxNumberAllowed)

        if (this.beneficiaryCount <= this.maxNumberAllowed && this.beneficiaryCount > 0) {

            this.limitReached = false

            this.BeneficiaryForm.push(this.formBuilder.control(
                this.formBuilder.group({
                    beneficiaryName: [null, Validators.required],
                    beneficiarySurname: [null, Validators.required],
                    beneficiaryID: [null, Validators.required],
                })

            ))

            this.beneficiaryCount = this.maxNumberAllowed - this.BeneficiaryForm.length
            this.beneficiaryDetails = this.BeneficiaryForm.length == 1 ? ('Member has ' + this.BeneficiaryForm.length + ' beneficiary') : ('Member has ' + this.BeneficiaryForm.length + ' beneficiries')

        } else {
            this.limitReached = true
        }




    }

    removeBeneficiary(index): void {
        (((this.type.get('BeneficiaryGroup') as FormGroup).get('beneficiaryArray')) as FormArray).removeAt(index)

        if (this.BeneficiaryForm.length >= 0) {

            this.beneficiaryCount = this.beneficiaryCount + 1
            this.beneficiaryDetails = this.BeneficiaryForm.length == 1 ? ('Member has ' + this.BeneficiaryForm.length + ' beneficiary') : ('Member has ' + this.BeneficiaryForm.length + ' beneficiries')

        }

        this.limitReached = false
    }

    // hides or unhides beneficiary form by click on checkbox
    checkBeneficiary() {

        if (this.unhideBeneficiaryForm) {

            this.unhideBeneficiaryForm = false
            for (let x = 1; x < this.BeneficiaryForm.length; x++) {
                // removes the added beneficiary form if disable
                (((this.type.get('BeneficiaryGroup') as FormGroup).get('beneficiaryArray')) as FormArray).removeAt(x)

            }
            console.log('unchecked')
            this.beneficiaryDetails = 'No beneficiary added for member'

        } else {
            this.unhideBeneficiaryForm = true
            console.log('checked')
        }


    }


    // check the maximum number of beneficiary based on the selected policy type
    testMaximumBeneficiary(index) {
        this.unhideBeneficiaryForm = false;
        this.unhideCheckBox = false


        // getting the selected poliy type

        this.maxNumberAllowed = parseInt(this.policytypes[index].maximumbeneficiaries)
        this.policytypeDetails = this.policytypes[index]
        this.setmember.balance = this.policytypes[index].premium // parseFloat(this.memberPolicytype.premium)

        if (this.maxNumberAllowed == 0) {
            this.beneficiaryDetails = 'Member not allowed to have beneficies, due to policy type'
            this.unhideCheckBox = false
            this.beneficiaryCount = 0
        } else {
            this.unhideCheckBox = true
            this.beneficiaryCount = parseInt(this.policytypes[index].maximumbeneficiaries)
        }


    }
    
    tickToAgree() {

        let finish = document.querySelector('.btn-finish')
        let checkbox = document.querySelector('.check-agree')

        console.log(finish)
        console.log(checkbox)

    }

    idNumberCheck() {
        console.log('button clicked')

        if (this.setmember.identitynumber.length == 13) {

            // checking if id number is unique
            this.memberService.getMemberbyidentitynumber(this.setmember.identitynumber)
                .subscribe(memberExist => {

                    if (memberExist.length == 0) {
                        console.log('idnumber not found')
                    } else {
                        console.log('idnumber already exist')

                        swal({
                            title: "Member with Id number " + this.setmember.identitynumber + " already exist",
                            text: "Please enter another Id number",
                            type: 'error',
                            timer: 5000,
                            showConfirmButton: true
                        }).catch(swal.noop)

                    }

                }, err => {
                    console.log(err)
                })

        }


    }

    finishCreate() {

        let newDate = new Date()


        // checking if id number is unique
        this.memberService.getMemberbyidentitynumber(this.setmember.identitynumber)
            .subscribe(memberExist => {

                if (memberExist.length == 0) {
                    console.log('idnumber not found')

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
                            this.setmember.id = 0
                            this.setmember.idpolicystatus = 1
                            this.setmember.idlifestatus = 1
                            this.setmember.membershipnumber = (this.setmember.surname.slice(0, 1).toUpperCase()+this.setmember.name.slice(0, 1).toUpperCase()+Math.floor(100000 + Math.random() * 900000)+(this.setmember.identitynumber).toString().slice(0, 2))
                            this.setmember.createdby = (this.user.name + " " + this.user.surname)
                            this.setmember.lastpaiddate = moment.parseZone(newDate).utc().format()
                            this.setmember.createdby =  moment.parseZone(newDate).utc().format()

                            console.log(this.setmember)

                            this.memberService.createMember(this.setmember)
                                .subscribe(member_res => {

                                    console.log(member_res)

                                    if (this.unhideBeneficiaryForm) {


                                        // creating beneficiary
                                        for (let x = 0; x < this.BeneficiaryForm.length; x++) {

                                            let BeneficiaryName
                                            let BeneficiarySurname
                                            let BeneficiaryIdNumber

                                            BeneficiaryName = document.querySelector('#beneficiaryName' + x)
                                            BeneficiarySurname = document.querySelector('#beneficiarySurname' + x)
                                            BeneficiaryIdNumber = document.querySelector('#beneficiaryID' + x)

                                            this.setbeneficiary.name = BeneficiaryName.value
                                            this.setbeneficiary.surname = BeneficiarySurname.value
                                            this.setbeneficiary.identitynumber = BeneficiaryIdNumber.value
                                            this.setbeneficiary.idlifestatus = 1
                                            this.setbeneficiary.id = 0
                                            this.setbeneficiary.idmember = member_res.id

                                            this.beneficiaryService.createBeneficiary(this.setbeneficiary)
                                                .subscribe(beneficiary_res => {

                                                    console.log(beneficiary_res)
                                                }, err => {
                                                    console.log(err)
                                                })

                                        }

                                    }

                                    swal(
                                        {
                                            title: 'Member Created',
                                            type: 'success',
                                            confirmButtonClass: "btn btn-success",
                                            buttonsStyling: false

                                        }).then((result) => document.location.reload()) // console.log('done: ' + result.value))  document.location.reload()



                                }, err => {
                                    console.log(err)
                                })

                        }
                    })


                } else {
                    console.log('idnumber already exist')

                    swal({
                        title: "Member with Id number " + this.setmember.identitynumber + " already exist",
                        text: "Please enter another Id number",
                        type: 'error',
                        timer: 5000,
                        showConfirmButton: true
                    }).catch(swal.noop)

                }

            }, err => {
                console.log(err)
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
