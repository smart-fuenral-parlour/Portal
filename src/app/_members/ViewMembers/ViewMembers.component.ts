import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component'
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import {  Member } from 'src/app/services/member/member'
import {  MemberService } from 'src/app/services/member/member.service'

declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}



@Component({
  selector: 'app-ViewMembers',
  templateUrl: './ViewMembers.component.html',
  styleUrls: ['./ViewMembers.component.css']
})
export class ViewMembersComponent implements OnInit {

  public dataTable: DataTable;
  response;
  lifestatus;
  
  selectedrow;
  searchText = 'ID Number';
  isEmpty = false
  searchResult = false;
  notFound = false;
  invalidID = false;
  iduser
  members
 

  constructor(private memberSerice: MemberService, private _service: ServiceService, private _router: Router, private app: AppComponent) {

  }

  Types = [
    { id: 1, value: 'Membership Number', viewValue: 'Membership Number' },
    { id: 2, value: 'ID Number', viewValue: 'ID Number' },
    { id: 3, value: 'Surname', viewValue: 'Surname' }
  ];



  ngOnInit() {

    if (localStorage.getItem('iduser') != '') {
      this.iduser = JSON.parse(localStorage.getItem('iduser'))
      console.log(this.iduser)
    }

    this.app.loading = false
    sessionStorage.clear()
  }

  //Search member
  searchMember(searchInput, selectedSearchType) {

    this.isEmpty = false
    this.searchResult = false
    this.notFound = false 
    console.log(searchInput)
  

    if (searchInput == '' || isNullOrUndefined(searchInput)) {
      this.searchResult = false
      this.notFound = false
      this.isEmpty = true;
    } else {
      this.isEmpty = false
      this.searchResult = false
      this.notFound = false

      if (selectedSearchType == 'Membership Number') {
        this.app.loading = true
this.memberSerice.getMember(searchInput)
        //this._service.searchMemberByMembershipNumber(searchInput)
          .subscribe(member_res => {
            this.response = member_res

            if (this.response.length > 0) {
              console.log('Search By Membership Number')
               let x = 0;

              for (let i = 0; i < this.response.length;  i++) {
                this._service.getLifestatus(this.response[i].idlifestatus)
                  .subscribe(lifestatus_res => {

                    
                    this.members.push({
                      'idmember': this.response[x].idmember,
                      'membershipnumber': this.response[x].membershipnumber,
                      'name': this.response[x].name,
                      'surname': this.response[x].surname,
                      'createddate': this.response[x].createddate,
                      'identitynumber': this.response[x].identitynumber,
                      'lifestatus': lifestatus_res[0].name
                    })
                    x++


                  }, err => {
                    console.log(err)
                  })


              }

              this.app.loading = false
              this.notFound = false
              this.searchResult = true
            } else {
              console.log('NO MEMBERS FOUND')
              this.app.loading = false
              this.searchResult = false
              this.notFound = true
            }

          },
            err => {
              console.log(err)
            }
          )
      } else
        if (selectedSearchType == 'Surname') {
          this.app.loading = true

          this._service.searchMemberBySurname(searchInput)
            .subscribe(res => {
              this.response = res

              if (this.response.length > 0) {
                console.log('Search By Surname')

                this.members = []
                let x = 0

                for (let i = 0;  i < this.response.length; i++) {

                  this._service.getLifestatus(this.response[ i ].idlifestatus)
                    .subscribe(lifeS => {


                      this.members.push({
                        'idmember': this.response[x].idmember,
                        'membershipnumber': this.response[x].membershipnumber,
                        'name': this.response[x].name,
                        'surname': this.response[x].surname,
                        'createddate': this.response[x].createddate,
                        'identitynumber': this.response[x].identitynumber,
                        'lifestatus': lifeS[0].name
                      })
                      x++


                    }, err => {
                      console.log(err)
                    })

                }


                this.app.loading = false
                this.notFound = false
                this.searchResult = true
              } else {
                console.log('NO MEMBERS FOUND')
                this.app.loading = false
                this.searchResult = false
                this.notFound = true
              }

            },
              err => {
                console.log(err)
              }
            )

        } else
          if (searchInput.length == 13 || selectedSearchType == 'ID Number') {
            this.app.loading = true
            this._service.searchMemberByIdNumber(searchInput)
              .subscribe(res => {
                this.response = res

                if (this.response.length > 0) {
                  console.log('Search By ID Number')

                  this.members = []
                  let x = 0

                  for (let i = 0;  i < this.response.length;  i++) {
                    this.members.push({
                      'idmember': this.response[x].idmember,
                      'membershipnumber': this.response[x].membershipnumber,
                      'name': this.response[i].name,
                      'surname': this.response[i].surname,
                      'createddate': this.response[i].createddate,
                      'identitynumber': this.response[i].identitynumber
                    })
                    this._service.getLifestatus(this.response[i].idlifestatus)
                      .subscribe(lifeS => {
console.log(lifeS)
                        /*                     
                      this.members.push({
                        'idmember': this.response[x].idmember,
                        'membershipnumber': this.response[x].membershipnumber,
                        'name': this.response[x].name,
                        'surname': this.response[x].surname,
                        'createddate': this.response[x].createddate,
                        'identitynumber': this.response[x].identitynumber,
                        'lifestatus': lifeS[0].name
                      })
                      x++
                         */

                      }, err => {
                        console.log()
                      })



                  }


                  this.app.loading = false
                  this.notFound = false
                  this.searchResult = true
                } else {
                  console.log('NO MEMBERS FOUND')
                  this.app.loading = false
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

  selectSearchType(selectedSearchType) {
    this.searchText = selectedSearchType
    console.log(this.searchText)
  }

  changeEmpty() {
    this.isEmpty = false
    this.invalidID = false
  }


  // Edit a member
  editMember(index, idmember) {
    this.selectedrow = index;

   // localStorage.setItem('idmember', JSON.stringify(idmember));
   
    sessionStorage.clear()
    //this._router.navigate(['/members/editmember']);
  }

  // View full member details
  viewMember(index, idmember) {
    this.selectedrow = index;

    localStorage.setItem('idmember', JSON.stringify(idmember));
    this._router.navigate(['/members/viewmemberdetails']);
  }

  // Delete a member
  deleteMember(index, idmember) {
    this.selectedrow = index;

    swal({
      title: 'Delete This Member',
      text: "Are you sure?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      cancelButtonText: 'No, Do not Delete',
      confirmButtonText: 'Yes, Delete',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {

        this._service.removeMember(idmember)
          .subscribe(res => {
            console.log(res)
          }, err => console.log(err))

        swal(
          {
            title: 'Member Deleted',
            //text: 'Member Deleted',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false

          }).then((result) => window.location.reload())
      }
    })
  }


}


