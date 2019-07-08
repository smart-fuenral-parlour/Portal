import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AppComponent } from 'src/app/app.component'
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here

//////////////////////////////////////   SERVICE CALLS   //////////////////////////////////////////////////////////

////////////////////////////////////////    MODEL CLASS CALLs   //////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Router } from '@angular/router'
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-CreateClaimForm',
  templateUrl: './CreateClaimForm.component.html',
  styleUrls: ['./CreateClaimForm.component.css']
})
export class CreateClaimFormComponent implements OnInit {



  constructor(private app: AppComponent, private _service: ServiceService, private _router: Router, private formBuilder: FormBuilder) { }
 

  ngOnInit() {

  }
 
  createClaim() {

    

      //-0--0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000


  }


}
