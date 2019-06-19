import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component'

declare var $: any;

@Component({
  selector: 'app-EditSociety',
  templateUrl: './EditSociety.component.html',
  styleUrls: ['./EditSociety.component.css']
})
export class EditSocietyComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _router: Router, private _service: ServiceService) {}

  ngOnInit() {
  }


  Save() {
 this._router.navigate(['/society/viewallsocieties'])
  }

}
