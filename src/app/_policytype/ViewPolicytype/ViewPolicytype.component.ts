

import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormArray, FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

import { RoleService } from '../../services/role/role.service';
import { PolicytypeService } from '../../services/policytype/policytype.service';
import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component'
import { stringify } from 'querystring';
import { Policytype } from '../../services/policytype/policytype';

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
    constructor(private formBuilder: FormBuilder, private _role: RoleService, private _policytype: PolicytypeService, private _router: Router, private app: AppComponent) { }

    //////Initialized variables  

    policytypes: Policytype[];



    ////Functions//////////////////////////////////////////

    ViewPolicytype(index) {

        localStorage.setItem('selectedPolicyType', JSON.stringify(this.policytypes[index]));


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

                this._router.navigate(['/policytype/editpolicytype'])

            }
        })

    }


    ngOnInit() {



        //get all policytypes
        this._policytype.getPolicytypes()
            .subscribe(res => {
                this.policytypes = res;
                console.log(this.policytypes)
            }, err => {
                console.log(err);
            });

        this.app.loading = false










    }

}
