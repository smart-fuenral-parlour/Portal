
import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormArray, FormGroup, FormBuilder,FormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { patchComponentDefWithScope } from '@angular/core/src/render3/jit/module';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role/role.service';
import { PolicytypeService } from '../../services/policytype/policytype.service';
import { Policytype } from '../../services/policytype/policytype';
import swal from 'sweetalert2';
import { Moment } from 'moment'
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component';

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
    selector: 'app-CreatePolicytype',
    templateUrl: './CreatePolicytype.component.html',
    styleUrls: ['./CreatePolicytype.component.css']
})
export class CreatePolicytypeComponent implements OnInit {

 
    constructor( private formBuilder: FormBuilder, private _role: RoleService,private _policytype: PolicytypeService, private _router: Router, private app: AppComponent) { }

policy = new Policytype
    ///////////////////////////////////////////////////////////////////////////////////////

    createPolicy(){
    



      swal({
            title: 'Create Policy Type '+this.policy.name+'',
            text: "Are you sure you want to create a new policy type",
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
                
                this._policytype.createPolicytype(this.policy      
                    )
                .subscribe(res => {
                   console.log(res)
                  }, (err) => {
                    console.log(err);
                   
                  });

                swal(
                    {
                        title: 'New Policy Created',
                        type: 'success',
                        confirmButtonClass: "btn btn-success",
                        buttonsStyling: false

                    }).then((result) => { this._router.navigate(['/policytype/viewpolicytype']) })
            }
        })



    
    
    
    }

 

    ///////////////////////////////////////////////////////////////////////////////////////
    ngOnInit() {
        this.app.loading = false
        

 
    }

 

}
