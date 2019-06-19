import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component'

@Component({
  selector: 'app-CreateClaim',
  templateUrl: './CreateClaim.component.html',
  styleUrls: ['./CreateClaim.component.css']
})
export class CreateClaimComponent implements OnInit {

  response;
  members;
  selectedrow;
  selectedSearchType
  searchText = 'ID Number';
  isEmpty = false
  searchResult = false;
  notFound = false;
  invalidID = false;
  searchInput

  constructor( private app: AppComponent, private _service: ServiceService, private _router: Router) { }

  Types = [
    { id: 1, value: 'ID Number', viewValue: 'ID Number' },
    { id: 2, value: 'Surname', viewValue: 'Surname' }
  ];

  ngOnInit() {
    this.app.loading = false
   
  }

  //Search member
  searchMember() {

    this.isEmpty = false
    this.searchResult = false
    this.notFound = false

    this.searchInput = document.querySelector('#searchBox')

    console.log(this.selectedSearchType)
    console.log(this.searchInput.value)


    if (this.searchInput.value == '' || isNullOrUndefined(this.searchInput.value)) {
      this.searchResult = false
      this.notFound = false
      this.isEmpty = true;
    } else {
      this.isEmpty = false
      this.searchResult = false
      this.notFound = false

      if (this.selectedSearchType == 'Membership Number') {

        this._service.searchMemberByMembershipNumber(this.searchInput.value)
          .subscribe(res => {
            this.response = res

            console.log(this.members)

            if (this.response.response.length > 0) {
              console.log('Search By Membership Number')
              this.notFound = false
              this.searchResult = true
            } else {
              console.log('NO MEMBERS FOUND')
              this.searchResult = false
              this.notFound = true
            }

          },
            err => {
              console.log(err)
              console.log(this.response.error)
            }
          )

      } else
        if (this.selectedSearchType == 'Surname') {

          this._service.searchMemberBySurname(this.searchInput.value)
            .subscribe(res => {
              this.response = res

              if (this.response.response.length > 0) {
                console.log('Search By Surname')
                this.notFound = false
                this.searchResult = true
              } else {
                console.log('NO MEMBERS FOUND')
                this.searchResult = false
                this.notFound = true
              }

            },
              err => console.log(err)
            )

        } else
          if (this.searchInput.value.length == 13 || this.selectedSearchType == 'ID Number') {
            this._service.searchMemberByIdNumber(this.searchInput.value)
              .subscribe(res => {
                this.response = res

                console.log(this.members)

                if (this.response.response.length > 0) {
                  console.log('Search By ID Number')
                  this.notFound = false
                  this.searchResult = true
                } else {
                  console.log('NO MEMBERS FOUND')
                  this.searchResult = false
                  this.notFound = true
                }

              },
                err => console.log(err)
              )

          } else {
            this.invalidID = true;
          }

    }

  }

  selectSearchType() {
    this.searchText = this.selectedSearchType
  }

  changeEmpty() {
    this.isEmpty = false
    this.invalidID = false
  }

    // Create Claim
    createClaim(index) {
      this.selectedrow = index;
      //console.log('Member ID: ' + id);
     // localStorage.setItem('id', JSON.stringify(id));
      this._router.navigate(['/claims/createclaimformember']);
    }

}
