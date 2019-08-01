import { Role } from './../../services/role/role';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { RoleService } from '../../services/role/role.service';

///////////////////// SERVICE CALLS  ///////////////////////////////////////////
import { PolicytypeService } from '../../services/policytype/policytype.service';

//////////////////// MODEL/ CLASS CALLS ///////////////////////////////////////
import { Policytype } from '../../services/policytype/policytype';
import { User } from 'src/app/services/user/user'

///////////////////////////////////////////////////////////////////////////////





declare const $: any;
@Component({
  selector: 'app-EditPolicytype',
  templateUrl: './EditPolicytype.component.html',
  styleUrls: ['./EditPolicytype.component.css']
})
export class EditPolicytypeComponent implements OnInit {

  policytype: Policytype;
  setpolicytype = new Policytype;



  constructor(private app: AppComponent,
    private role: RoleService,
    private policytypeService: PolicytypeService,
    private router: Router) { }


  ngOnInit() {

    //policytype from edit page

    this.policytype = JSON.parse(localStorage.getItem('editpolicytype'));
  }

  editPolicy() {



    console.log(this.setpolicytype)

    swal({
      title: "Update " + this.policytype.name + "'s Details",
      text: "Are you sure you want to update " + this.policytype.name + "'s details?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Save update',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        
        this.policytypeService.updatePolicytype(this.policytype.id, this.setpolicytype)
          .subscribe(policytype_res => {

            console.log(policytype_res)            

            swal(
              {
                title: 'Policytype Updated',
                type: 'success',
                confirmButtonClass: "btn btn-success",
                buttonsStyling: false
    
              }).then((result) => { 
                this.router.navigate(['/policytype/viewpolicytype']) 
              })

          }, (err) => {
            console.log(err);

          });

      }
    })


  }

}
