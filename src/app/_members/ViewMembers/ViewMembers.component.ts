import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here

///////////////////// SERVICE CALLS  ///////////////////////////////////////////
import { MemberService } from 'src/app/services/member/member.service'

//////////////////// MODEL/ CLASS CALLS ///////////////////////////////////////
import { Member } from 'src/app/services/member/member'

///////////////////////////////////////////////////////////////////////////////
import swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component'

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
export class ViewMembersComponent implements OnInit, AfterViewInit {


  public dataTable: DataTable;
  members
  member: Member
  searchText = 'ID Number';



  //////////////////
  isEmpty = false
  searchResult = false;
  notFound = false;
  invalidID = false;
  iduser
  ////////////////////////////

  constructor(
    private service: ServiceService,
    private memberService: MemberService,
    private router: Router,
    private app: AppComponent) {

  }

  Types = [
    { id: 1, value: 'Membership Number' },
    { id: 2, value: 'ID Number' },
    { id: 3, value: 'Surname', }
  ];



  ngOnInit() {

    if (localStorage.getItem('iduser') != '') {
      this.iduser = JSON.parse(localStorage.getItem('iduser'))
      console.log(this.iduser)
    }



    this.app.loading = false
    sessionStorage.clear()
  }

  //Search for member
  searchMember(searchInput, selectedSearchType) {

    this.isEmpty = false
    this.searchResult = false
    this.notFound = false

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

        this.memberService.getMemberbymembershipnumber(searchInput)
          .subscribe(member_res => {

            this.members = member_res
            console.log(member_res)

            if (this.members.length > 0) {
              console.log('Search By Membership Number')
              let x = 0;


              this.app.loading = false
              this.notFound = false
              this.searchResult = true

            } else {

              console.log('NO MEMBERS FOUND')
              this.app.loading = false
              this.searchResult = false
              this.notFound = true

            }

          }, err => {
            console.log(err)
          })
      } else
        if (selectedSearchType == 'Surname') {

          console.log('Search By Surname')
          this.app.loading = true

          this.memberService.getMemberbysurname(searchInput)
            .subscribe(member_res => {

              this.members = member_res
              console.log(member_res)

              if (this.members.length > 0) {

                this.app.loading = false
                this.notFound = false
                this.searchResult = true

              } else {
                console.log('NO MEMBERS FOUND')
                this.app.loading = false
                this.searchResult = false
                this.notFound = true
              }

            }, err => {
              console.log(err)
            })

        } else
          if (searchInput.length == 13) {

            this.app.loading = true


            this.memberService.getMemberbyidentitynumber(searchInput)
              .subscribe(member_res => {
                this.members = member_res
                console.log(member_res)

                if (this.members.length > 0) {
                  console.log('Search by Id number')

                  this.app.loading = false
                  this.notFound = false
                  this.searchResult = true

                } else {

                  console.log('NO MEMBERS FOUND')
                  this.app.loading = false
                  this.searchResult = false
                  this.notFound = true

                }

              }, err => {
                console.log(err)
              })

          } else {
            this.invalidID = true;
            this.app.loading = false
          }

    }

  }

  displaySelectedSearchType(selectedSearchType) {
    this.searchText = selectedSearchType
  }

  hideTextError() {
    this.isEmpty = false
    this.invalidID = false
  }


  // Edit a member
  editMember(index, idmember) {

    localStorage.setItem('editmember', JSON.stringify(this.members[index]));
    sessionStorage.clear()

    this.router.navigate(['/members/editmember']);
  }

  // View full member details
  viewMember(index) {
    localStorage.setItem('viewmember', JSON.stringify(this.members[index]));
    this.router.navigate(['/members/viewmemberdetails']);
  }

  // Delete a member
  deleteMember(idmember) {

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

        this.memberService.deleteMember(idmember)
          .subscribe(res => {
            console.log(res)
          }, err => {
            console.log(err)
          })

        swal(
          {
            title: 'Member Deleted',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false

          }).then((result) => window.location.reload())
      }
    })
  }


  ngAfterViewInit() {
    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }

    });

    const table = $('#datatables').DataTable();

    $('.card .material-datatables label').addClass('form-group');
  }

}


