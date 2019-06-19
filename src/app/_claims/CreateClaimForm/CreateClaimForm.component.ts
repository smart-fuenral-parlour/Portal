import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component'

@Component({
  selector: 'app-CreateClaimForm',
  templateUrl: './CreateClaimForm.component.html',
  styleUrls: ['./CreateClaimForm.component.css']
})
export class CreateClaimFormComponent implements OnInit {

  constructor(private app: AppComponent) { }

  ngOnInit() {
    this.app.loading = false    
  }

}
