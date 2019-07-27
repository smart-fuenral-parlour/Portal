import { Role } from './../../services/role/role';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { RoleService } from '../../services/role/role.service';
import { PolicytypeService } from '../../services/policytype/policytype.service';
import { Policytype } from '../../services/policytype/policytype';





declare const $: any;
@Component({
  selector: 'app-EditPolicytype',
  templateUrl: './EditPolicytype.component.html',
  styleUrls: ['./EditPolicytype.component.css']
})
export class EditPolicytypeComponent implements OnInit {

  placeholder:Policytype;
  policytype = new Policytype;
 


  constructor(private app: AppComponent, private _role: RoleService,private _policytype: PolicytypeService, private _router: Router) {}
  

  ngOnInit() {

 //policytype from edit page

this.placeholder = JSON.parse(localStorage.getItem('selectedPolicyType'));

    



  }

  editPolicy() {

   
    
console.log(this.policytype)

    swal({
      title: "Update "+this.placeholder.name+"'s Details",
      text: "Are you sure you want to update "+this.placeholder.name+"'s details?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Save update',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this._policytype.updatePolicytype(this.placeholder.id,this.policytype)
      .subscribe(res => {
         console.log(res)
        }, (err) => {
          console.log(err);
         
        });



        swal(
          {
            title: 'Policytype Updated',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false

          }).then((result) => { this._router.navigate(['/policytype/viewpolicytype']) })
      }
    })

   
  }

}
