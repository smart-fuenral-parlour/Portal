
import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { patchComponentDefWithScope } from '@angular/core/src/render3/jit/module';
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

///////////////////// MODEL CLASS CALLS ///////////////////
import { Member } from 'src/app/services/member/member'
import { Policytype } from 'src/app/services/policytype/policytype'
import { Policydetails } from 'src/app/services/policydetails/policydetails'
import { Balance } from 'src/app/services/balance/balance'
import { Beneficiary } from 'src/app/services/beneficiary/beneficiary'
import { User } from 'src/app/services/user/user'
import { File } from 'src/app/services/file/file'

/////////////////////////////////////////////////////////
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component'
import { type } from 'os';



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
    member: Member
    setpolicytype: Policytype
    file
    key = "document";
    data

    setmember = new Member
    setbeneficiary = new Beneficiary
    setbalance = new Balance
    setpolicydetails = new Policydetails

    invalidID = false

    constructor(private formBuilder: FormBuilder,
        private memberService: MemberService,
        private policytypeService: PolicytypeService,
        private policydetailsService: PolicydetailsService,
        private balanceService: BalanceService,
        private beneficiaryService: BeneficiaryService,
        private fileService: FileService,
        private router: Router,
        private app: AppComponent
    ) { }

    // province drop downkzn
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


    // check if the age of beneficiary is allowed  {{'beneficiaryID'+i}}
    checkBeneficiaryAge(BenefitIDnum) {

        let x = 0
        let myValue: string

        myValue = BenefitIDnum.value + x
        let year = 0
        let age = 0
        let currentYear = parseInt(moment(new Date()).format('YYYY'))
        let testYearInput = parseInt(moment(new Date()).format('YY'))



        if ((BenefitIDnum.value.length + x) == 13) {
            console.log('correct id number length')

            if (parseInt(myValue.slice(0, 2)) <= testYearInput) {
                // for those born from the year 2000
                year = parseInt('20' + myValue.slice(0, 2))
                age = currentYear - year
                if (age < 18) {
                    console.log('member aged ' + age + ' is not allowed')
                    swal({
                        title: "beneficiaryName not allowed as Beneficiary",
                        text: "Beneficiary must be older than  {maxAge (18)} years older",
                        timer: 2000,
                        showConfirmButton: true
                    }).catch(swal.noop)
                } else {
                    console.log('member aged ' + age + ' is allowed')
                }
            } else {
                // for those born before the year 2000
                year = parseInt('19' + myValue.slice(0, 2))
                age = currentYear - year
                if (age < 18) {
                    console.log('member aged ' + age + ' is not allowed')
                    swal({
                        title: "beneficiaryName not allowed as Beneficiary",
                        text: "Beneficiary must be older than  {maxAge (18)} years older",
                        timer: 2000,
                        showConfirmButton: true
                    }).catch(swal.noop)
                } else {
                    console.log('member aged ' + age + ' is allowed')
                }
            }

        } else {
            console.log('id number is short')
        }
    }



    get BeneficiaryForm() {
        return (<FormArray>(<FormGroup>this.type.get('BeneficiaryGroup')).get('beneficiaryArray')).controls;
    }

    addBeneficiary() {


        this.BeneficiaryForm.push(this.formBuilder.control(
            this.formBuilder.group({
                beneficiaryName: [null, Validators.required],
                beneficiarySurname: [null, Validators.required],
                beneficiaryID: [null, Validators.required],
            })

        ))

    }

    removeBeneficiary(index): void {
        (((this.type.get('BeneficiaryGroup') as FormGroup).get('beneficiaryArray')) as FormArray).removeAt(index)

    }

    testBeneficiaryAge(i) {



    }

    // testing the age of the member to determine their policy types
    testMemberAge(identitynumber) {
        this.setmember.gender

    }


    finishCreate(name, surname, identitynumber, gender, housenumber, streetname, suburb, province, contactnumber, email, idpolicytype) {

        let beneficiary;
        let policydetails
        let balance
        let member

        // UPLOAD DOCUMENT
        // {'document': document}

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

                member = {
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
                    //'membershipnumber':
                }
                console.log(member)

                // this.service.createMember(member)
                this.memberService.createMember(member)
                    .subscribe(member_res => {

                        policydetails = {
                            'idmember': member_res[0].idmember,
                            'membershipnumber': member_res[0].membershipnumber,
                            'idpolicystatus': member_res[0].idlifestatus,
                            'iduser': member_res[0].iduser,
                            'idpolicytype': member_res[0].idpolicytype,
                            'idextras': 1
                        }
                        console.log(policydetails)


                        this.policydetailsService.createPolicydetails(policydetails)
                            .subscribe(policydetails_res => {
                                console.log(policydetails_res[0].idpolicytype)

                                this.policytypeService.getPolicytype(policydetails_res[0].idpolicytype)
                                    .subscribe(policytype_res => {

                                        balance = {
                                            'idpolicydetails': policydetails_res[0].idpolicydetails,
                                            'amount': policytype_res[0].premium,
                                            'lastpaiddate': 'date'
                                        }
                                        console.log(balance)

                                        this.balanceService.createBalance(balance)
                                            .subscribe(balance_res => {
                                                console.log(balance_res)

                                                /*
                                         creating beneficiary for a member
                                                for (let x = 0; x < this.BeneficiaryForm.length; x++) {

                                                    this.BenefitName = document.querySelector('#beneficiaryName' + x)
                                                    this.BenefitSurname = document.querySelector('#beneficiarySurname' + x)
                                                    this.BenefitIDnum = document.querySelector('#beneficiaryID' + x)

                                                    beneficiary = {
                                                        'idmember': member_res[0].idmember,
                                                        'name': this.BenefitName.value,
                                                        'surname': this.BenefitSurname.value,
                                                        'identitynumber': this.BenefitIDnum.value,
                                                        'idlifestatus': 1
                                                    }
                                                    console.log(beneficiary)

                                                    this.beneficiaryService.createBeneficiary(beneficiary)
                                                        .subscribe(beneficiary_res => {
                                                            console.log(beneficiary_res)
                                                        }, err => {
                                                            console.log(err)
                                                        })

                                                    // tslint:disable-next-line: max-line-length
                                                }
*/




                                            }, err => {
                                                console.log(err)
                                            })

                                    }, err => {
                                        console.log(err)
                                    })

                            }, err => {
                                console.log(err)
                            })

                        /*
                                                this.service.getPolicyTypeDetails(member_res[0].idpolicytype)
                                                    .subscribe(policytupe_res => {
                        
                        
                        
                                                        this.service.createMemberPolicyDetails(policydetails)
                                                            .subscribe(policyD => {
                                                                console.log(policyD)
                        
                                                                balance = {
                        
                                                                    'idpolicydetails': policyD[0].idpolicydetails,
                                                                    'amount': member_res[0].premium,
                                                                    'lastpaiddate': '20/06/19' //new Date()
                                                                }
                                                                console.log(balance)
                                                                this.service.createMemberBalanceDetails(balance)
                                                                    .subscribe(balance => {
                                                                        console.log(balance)
                        
                                                                        for (let i = 0; i < this.BeneficiaryForm.length; i++) {
                                                                            beneficiary[i].idmember = this.response[0].idmember
                                                                            beneficiary[i].createddate = this.response[0].createddate
                        
                                                                            this.service.createMemberBeneficiary(beneficiary[i])
                                                                                .subscribe(ben => {
                                                                                    console.log(ben)
                        
                                                                                }, err => {
                                                                                    console.log(err)
                                                                                })
                                                                        }
                                                                    }, err => { console.log(err) })
                        
                                                            }, err => {
                                                                console.log(err)
                                                            })
                                                    }, err => {
                                                        console.log(err)
                                                    })
                        */

                        this.app.loading = false
                    }, err => console.log(err))

                swal(
                    {
                        title: 'Member Created',
                        //text: 'Member Deleted',
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false

                    }).then((result) => window.location.reload()) //console.log('done'))
            }
        })

    }

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
