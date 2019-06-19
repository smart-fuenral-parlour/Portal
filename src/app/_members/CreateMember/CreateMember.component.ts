
import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { patchComponentDefWithScope } from '@angular/core/src/render3/jit/module';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import swal from 'sweetalert2';
import { Moment } from 'moment'
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';
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

    societies; response
    fname; lname;
    BenefitName; BenefitSurname;
    BenefitIDnum; dateV: string
    idNumber; date;
    houseNo; streetName;
    suburb; province;
    phone; email;
    beneficiary = [];
    i: number;
    invalid = false
    invalidID = false

    selectedProvince: string;
    selectedGender: string;

    jsonDATA; creator


    constructor( private formBuilder: FormBuilder, private _servive: ServiceService, private _routet: Router, private app: AppComponent) { }


    // province drop downkzn
    provinces = [
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


    genders = [
        { value: 'Male', name: 'Male', abrv: 'M' },
        { value: 'Female', name: 'Female', abrv: 'F' }
    ]
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
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

    ///////////////////////////////////////////////////////////////////////////////////////

    nextPan() {

     //   this.idNumber = document.querySelector('#idnumber')

        if (this.idNumber.value.length < 13) {
            this.invalidID = true
        } else {
            this.invalidID = false
        }

       // console.log(this.idNumber)
    }


    finishCreate() {

        this.fname = document.querySelector('#firstname')
        this.lname = document.querySelector('#lastname')
        this.idNumber = document.querySelector('#idnumber')

        this.houseNo = document.querySelector('#housenumber')
        this.streetName = document.querySelector('#streetname')
        this.suburb = document.querySelector('#suburb')

        this.email = document.querySelector('#email')
        this.phone = document.querySelector('#phone')
        this.date = document.querySelector('#date')


        this.email = document.querySelector('#email')
        this.phone = document.querySelector('#phone')
        this.date = document.querySelector('#date')


        const year = moment(this.date.value).format('YYYY')
        this.beneficiary = [];

        for (this.i = 0; this.i < this.BeneficiaryForm.length; this.i++) {

            this.BenefitName = document.querySelector('#beneficiaryName' + this.i)
            this.BenefitSurname = document.querySelector('#beneficiarySurname' + this.i)
            this.BenefitIDnum = document.querySelector('#beneficiaryID' + this.i)

            // tslint:disable-next-line: max-line-length
            this.beneficiary.push({ 'name': this.BenefitName.value, 'surname': this.BenefitSurname.value, 'idnumber': this.BenefitIDnum.value })
        }



        this.jsonDATA = {
            'name': this.fname.value,
            'surname': this.lname.value,
            'idnumber': this.idNumber.value,
            'email': this.email.value,
            'contactnumber': this.phone.value,
            'gender': this.selectedGender,
            'housenumber': this.houseNo.value,
            'streetname': this.streetName.value,
            'suburb': this.suburb.value,
            'province': this.selectedProvince,
            'birthyear': year,
            'beneficiaries': this.beneficiary,
            'numberOfBeneficiaries': this.BeneficiaryForm.length,
            'createdby': this.creator
        }

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

                this._servive.createMember(this.jsonDATA)
                    .subscribe(res => {
                        console.log(res)
                        this.app.loading = false
                    }, err => console.log(err))

                swal(
                    {
                        title: 'Member Created',
                        //text: 'Member Deleted',
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false

                    }).then((result) => window.location.reload())
            }
        })


        console.log(this.jsonDATA)


    }

    get BeneficiaryForm() {
        return (<FormArray>(<FormGroup>this.type.get('BeneficiaryGroup')).get('beneficiary')).controls;
        // return (((this.type.get('BeneficiaryGroup') as FormGroup).get('beneficiary')) as FormArray).controls;

    }

    addBeneficiary() {


        this.BeneficiaryForm.push(this.formBuilder.control(
            this.formBuilder.group({
                beneficiaryName: [null, Validators.required],
                beneficiarySurname: [null, Validators.required],
                beneficiaryID: [null, Validators.required],
            })
        ))
        /*
                let beneficiary = (((this.type.get('BeneficiaryGroup') as FormGroup).get('beneficiary')) as FormArray);
                beneficiary.push(this.formBuilder.array([
                    this.formBuilder.group({
                        beneficiaryName: [null, Validators.required],
                        beneficiarySurname: [null, Validators.required],
                        beneficiaryID: [null, Validators.required],
                    })
              ]));
        */

    }

    removeBeneficiary(index): void {
        //  (<FormArray>this.type.get('beneficiary')).removeAt(index)
        (((this.type.get('BeneficiaryGroup') as FormGroup).get('beneficiary')) as FormArray).removeAt(index)

    }
    ///////////////////////////////////////////////////////////////////////////////////////
    ngOnInit() {
        this.app.loading = false
        

        this.invalid = false
        // GETTING NAME OF THE CREATOR
        if (!isNullOrUndefined(localStorage.getItem('name'))) {
            this.creator = JSON.parse(localStorage.getItem('name'))
        } else {
            this.creator = 'System'
        }

        // this.setArrayInputs(this.arrayInputs)

        this.type = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.

            BeneficiaryGroup: this.formBuilder.group({
                beneficiary: this.formBuilder.array([
                    this.formBuilder.control({
                        beneficiaryName: [null, Validators.required],
                        beneficiarySurname: [null, Validators.required],
                        beneficiaryID: [null, Validators.required],
                    })
                ])
            }),


            firstName: [null, Validators.required],
            idnumber: [null, Validators.required],
            date: [null, Validators.required],
            selectedGender: [null, Validators.required], // drop down list
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
                selectedGender: {
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
                    maxlength: 13
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
