import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component'

@Component({
  selector: 'app-ClaimInfo',
  templateUrl: './ClaimInfo.component.html',
  styleUrls: ['./ClaimInfo.component.css']
})
export class ClaimInfoComponent implements OnInit {

  constructor(private app: AppComponent) { }

  ngOnInit() {
    this.app.loading = false
    
  }

}
