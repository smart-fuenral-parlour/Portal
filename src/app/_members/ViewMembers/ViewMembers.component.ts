import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

///////////////////// SERVICE CALLS  ///////////////////////////////////////////
import { MemberService } from 'src/app/services/member/member.service'

//////////////////// MODEL/ CLASS CALLS ///////////////////////////////////////
import { Member } from 'src/app/services/member/member'
import { User } from 'src/app/services/user/user'

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
  members: Member[]

  user: User

  searchText = 'ID Number';

  // pagination
  pageNo = 1
  membersPerPage = 5

  //////////////////
  isEmpty = false
  searchResult = false;
  notFound = false;
  invalidID = false;
  ////////////////////////////

  constructor(
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
    
    sessionStorage.clear()
  }

  //Search for member
  searchMember(searchInput: string, selectedSearchType) {

    this.isEmpty = false
    this.searchResult = false
    this.notFound = false

    if (searchInput == '' || isNullOrUndefined(searchInput.trim())) {

      this.searchResult = false
      this.notFound = false
      this.isEmpty = true;

    } else {

      this.isEmpty = false
      this.searchResult = false
      this.notFound = false 

   
            if (selectedSearchType == 'Membership Number') {
      
              this.app.loading = true      
              this.memberService.getMemberbymembershipnumber(searchInput.trim())
                .subscribe(members_res => { 
                  
                  console.log(members_res)
                  this.app.loading = false
      
                  if (members_res.length > 0) { 
                    
                    console.log('Search members By Membership Number')
                    
                    this.members = members_res      
       
                    
                    this.notFound = false
                    this.searchResult = true
      
                  } else {      
                    console.log('NO MEMBERS FOUND')
                    
                    this.searchResult = false
                    this.notFound = true
      
                  }
      
                }, err => {
                  console.log(err)
                  this.app.loading = false
                })
            } else
              if (selectedSearchType == 'Surname') {
      
                this.app.loading = true                
                this.memberService.getMemberbysurname(searchInput)
                  .subscribe(members_res => {       
            
                    
                    console.log(members_res)
                    this.app.loading = false
                    
                    if ( members_res.length > 0 ) { 

                      console.log('Search members By Surname')
                      
                      this.members = members_res
                      
                      
                      this.notFound = false
                      this.searchResult = true
      
                    } else {
                      console.log('NO MEMBERS FOUND')
                      
                      this.searchResult = false
                      this.notFound = true
                    }
      
                  }, err => {
                    console.log(err)
                    this.app.loading = false
                  })
      
              } else
                if (searchInput.length == 13) {
      
                  this.app.loading = true     
                  this.memberService.getMemberbyidentitynumber(searchInput.trim())
                    .subscribe(members_res => {       
      
                      console.log(members_res)
                      this.app.loading = false
      
                      if ( members_res.length > 0 ) {

                        console.log('Search members by Id number')

                        this.members = members_res   

                        this.notFound = false
                        this.searchResult = true
      
                      } else {
                        console.log('NO MEMBERS FOUND')
                        this.searchResult = false
                        this.notFound = true
      
                      }
      
                    }, err => {
                      console.log(err)
                      this.app.loading = false
                    })
      
                } else {
                  this.invalidID = true;
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
  editMember(index) {
    index = index + ((this.pageNo-1)*this.membersPerPage)
    localStorage.setItem('editmember', JSON.stringify(this.members[index]));
    sessionStorage.clear()
    this.router.navigate(['/members/editmember']);
  }

  // View full member details
  viewMember(index) {
    index = index + ((this.pageNo-1)*this.membersPerPage)
    localStorage.setItem('viewdetails', JSON.stringify(this.members[index]));
    this.router.navigate(['/members/viewmemberdetails']);
  }

  // Delete a member
  deleteMember(id) {

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

        this.memberService.deleteMember(id)
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

          }).then((result) => {
            window.location.reload()
          })
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
