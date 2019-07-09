import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
//////////////////////////////////////////   SERVICE CALLS   /////////////////////////////////////////////////////////////////////
import { MemberService } from 'src/app/services/member/member.service'


///////////////////////////////////////////   MODEL CLASS CALL   ///////////////////////////////////////////////////////////////////
import { Member } from 'src/app/services/member/member'


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component'

@Component({
  selector: 'app-CreateClaim',
  templateUrl: './CreateClaim.component.html',
  styleUrls: ['./CreateClaim.component.css']
})
export class CreateClaimComponent implements OnInit {


  isEmpty = false
  searchResult = false
  notFound = false
  invalidID = false

  selectedSearchType
  searchText = 'ID Number'

  members: Member

  constructor(private app: AppComponent, private memberService: MemberService, private _service: ServiceService, private _router: Router) { }

  Types = [
    { id: 1, value: 'ID Number' },
    { id: 2, value: 'Surname' }
  ];

  ngOnInit() {
    this.app.loading = false
  }

  //Search member
  searchMember(searchInput) {

    this.isEmpty = false
    this.searchResult = false
    this.notFound = false


    console.log('Search By: ' + this.selectedSearchType)
    console.log(searchInput)

    if (searchInput == '' || isNullOrUndefined(searchInput)) {
      this.searchResult = false
      this.notFound = false
      this.isEmpty = true;
    } else {
      this.isEmpty = false
      this.searchResult = false
      this.notFound = false

      if (this.selectedSearchType == 'Surname') {

        this.memberService.getMemberbysurname(searchInput)
          .subscribe(surname_res => {
            this.members = surname_res

            if (this.members.length > 0) {

              console.log('Search By Surname')
              this.notFound = false
              this.isEmpty = false
              this.searchResult = true

            } else {
              console.log('NO MEMBERS FOUND')
              this.searchResult = false
              this.isEmpty = false
              this.notFound = true
            }
          }, err => {
            console.log(err)
          })

      } else
        if (searchInput.length == 13) {
          this.memberService.getMemberbyidentitynumber(searchInput)
            .subscribe(identitynumber_res => {

              this.members = identitynumber_res

              if (this.members.length > 0) {

                console.log('Search By ID Number')
                this.isEmpty = false
                this.notFound = false
                this.searchResult = true
              } else {

                console.log('NO MEMBERS FOUND')
                this.isEmpty = false
                this.searchResult = false
                this.notFound = true
              }

            }, err => {
              console.log(err)
            })

        } else {
          this.notFound = false
          this.searchResult = false
          this.isEmpty = false
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

    console.log(this.members[index])
    //localStorage.setItem('idmember', JSON.stringify(this.members[index]));
    //this._router.navigate(['/claims/createclaimformember']);
  }

}
