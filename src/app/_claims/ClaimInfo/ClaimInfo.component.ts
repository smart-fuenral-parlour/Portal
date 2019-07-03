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

  name
  surname
  date
  type

  constructor(private app: AppComponent, private _service: ServiceService) { }

  ngOnInit() {

    this.idclaim = JSON.parse(localStorage.getItem('claimID'));
    
    console.log('ID:' + parseInt(this.idclaim) )

    this._service.getSingleClaim(this.idclaim)
      .subscribe(res => {
        console.log(res)
        this.claims = res

        console.log(this.claims)
        console.log(res)

        this.name = this.claims[0].deceasedname
        this.surname = this.claims[0].deceasedsurname
        this.date = this.claims[0].createddate
        this.type = this.claims[0].placeofdeath

      }, err => {
        console.log(err)
      })

    this.app.loading = false

  }

  approveClaim(){

    
  }



}
