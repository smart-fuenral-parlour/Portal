

import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormArray, FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { RoleService } from '../../services/role/role.service';
import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component'

///////////////////// SERVICE CALLS  ///////////////////////////////////////////
import { MemberService } from 'src/app/services/member/member.service'
import { PolicytypeService } from '../../services/policytype/policytype.service';

//////////////////// MODEL/ CLASS CALLS ///////////////////////////////////////
import { Member } from 'src/app/services/member/member'
import { Policytype } from '../../services/policytype/policytype';
import { User } from 'src/app/services/user/user'

///////////////////////////////////////////////////////////////////////////////

import { stringify } from 'querystring';

declare const $: any;
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


@Component({
    selector: 'app-ViewPolicytype',
    templateUrl: './ViewPolicytype.component.html',
    styleUrls: ['./ViewPolicytype.component.css']
})
export class ViewPolicytypeComponent implements OnInit {

    //////Initialized variables  

    policytypes: Policytype[];
    noPolicytype = true


    constructor(private formBuilder: FormBuilder,
        private role: RoleService,
        private policytypeService: PolicytypeService,
        private router: Router,
        private app: AppComponent) { }



    ////Functions//////////////////////////////////////////

    ViewPolicytype(index) {


        swal({
            title: 'Edit Policy Type ' + this.policytypes[index].name + '',
            text: "Are you sure you want to edit policy type? Please note if you make any changes to the premium it will affect the policy holder immediately ",
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes',
            buttonsStyling: false
        }).then((result) => {
            if (result.value) {

                localStorage.setItem('editpolicytype', JSON.stringify(this.policytypes[index]));
                this.router.navigate(['/policytype/editpolicytype'])

            }
        })

    }


    ngOnInit() {

        //get all policytypes
          this.app.loading = true
        this.policytypeService.getPolicytypes()
            .subscribe(policytypes_res => {

                console.log(this.policytypes)

                if (policytypes_res.length > 0) {

                    this.policytypes = policytypes_res;
                    this.noPolicytype = false

                } else {
                    this.noPolicytype = true
                }
                this.app.loading = false

            }, err => {
                console.log(err);
                this.app.loading = false
            });



    }

}
