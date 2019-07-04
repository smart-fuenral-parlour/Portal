import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component'
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here

@Component({
  selector: 'app-ClaimInfo',
  templateUrl: './ClaimInfo.component.html',
  styleUrls: ['./ClaimInfo.component.css']
})
export class ClaimInfoComponent implements OnInit {

  idclaim
  claims
  noClaims

  name
  surname
  date
  type

  constructor(private app: AppComponent, private _service: ServiceService) { }

  ngOnInit() {

    if( localStorage.getItem('idclaim') != null ) {
      this.idclaim = JSON.parse(localStorage.getItem('idclaim'));
    }
 
    
    console.log('ID:' + parseInt(this.idclaim) )

    this._service.getSingleClaimInfo(this.idclaim)
      .subscribe(res => {
        console.log(res)
        this.claims = res

        console.log(this.claims)
        if(this.claims.length > 0) {
          this.name = this.claims[0].deceasedname
          this.surname = this.claims[0].deceasedsurname
          this.date = this.claims[0].createddate
          this.type = this.claims[0].placeofdeath
          this.noClaims = false
        } else {
          this.noClaims = true
        }
/*

        */

      }, err => {
        console.log(err)
      })

    this.app.loading = false

  }

  approveClaim(){


  }

  



}
