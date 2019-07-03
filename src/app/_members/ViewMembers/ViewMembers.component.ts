import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component'
import { jsonpCallbackContext } from '@angular/common/http/src/module';

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
  members
  lifestatus;
  i: number;
  x = 0;y=0; z=0;
  selectedrow;
  selectedSearchType
  searchText = 'ID Number';
  isEmpty = false
  searchResult = false;
  notFound = false;
  invalidID = false;
  searchInput
  iduser

  title = 'materialApp';
  color = 'primary';
  mode = 'determinate';
  value = 80;

  constructor(private _service: ServiceService, private _router: Router, private app: AppComponent) {

  }

  Types = [
    { id: 1, value: 'Membership Number', viewValue: 'Membership Number' },
    { id: 2, value: 'ID Number', viewValue: 'ID Number' },
    { id: 3, value: 'Surname', viewValue: 'Surname' }
  ];/*
  $(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
});
*/




  ngOnInit() {
    
    if (localStorage.getItem('iduser') != '') {
      this.iduser = JSON.parse(localStorage.getItem('iduser'))
      console.log(this.iduser)
    }

    this.app.loading = false
    sessionStorage.clear()
  }

  click() {

    this.app.loading = true
    window.onloadstart
  }

  //Search member
  searchMember() {

    this.isEmpty = false
    this.searchResult = false
    this.notFound = false
    //this.load = true

    this.searchInput = document.querySelector('#searchBox')



    if (this.searchInput.value == '' || isNullOrUndefined(this.searchInput.value)) {
      this.searchResult = false
      this.notFound = false
      this.isEmpty = true;
    } else {
      this.isEmpty = false
      this.searchResult = false
      this.notFound = false

      if (this.selectedSearchType == 'Membership Number') {
        this.app.loading = true

        this._service.searchMemberByMembershipNumber(this.searchInput.value)
          .subscribe(res => {
            this.response = res


            if (this.response.length > 0) {
              console.log('Search By Membership Number')
              this.members = []
              this.z = 0;

              for (this.i = 0; this.i < this.response.length; this.i++) {
                this._service.getLifestatus(this.response[this.i].idlifestatus)
                .subscribe(lifeS => { 

                  this.members.push({
                    'idmember': this.response[this.z].idmember,
                    'membershipnumber': this.response[this.z].membershipnumber,
                    'name': this.response[this.z].name,
                    'surname': this.response[this.z].surname,
                    'createddate': this.response[this.z].createddate,
                    'identitynumber': this.response[this.z].identitynumber,
                    'lifestatus': lifeS[0].name
                  })
                  this.z++

                  
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
            err => {
              console.log(err)
            }
          )

      } else
        if (this.selectedSearchType == 'Surname') {
          this.app.loading = true

          this._service.searchMemberBySurname(this.searchInput.value)
            .subscribe(res => {
              this.response = res

              if (this.response.length > 0) {
                console.log('Search By Surname')
                
                this.members = []
                this.z = 0

                for (this.i = 0; this.i < this.response.length; this.i++) {
                  
                  this._service.getLifestatus(this.response[this.i].idlifestatus)
                  .subscribe(lifeS => {

                    
                    this.members.push({
                      'idmember': this.response[this.z].idmember,
                      'membershipnumber': this.response[this.z].membershipnumber,
                      'name': this.response[this.z].name,
                      'surname': this.response[this.z].surname,
                      'createddate': this.response[this.z].createddate,
                      'identitynumber': this.response[this.z].identitynumber,
                      'lifestatus': lifeS[0].name
                    })
                    this.z++

                    
                  }, err => {
                    console.log()
                  })
                  

/*
*/
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
          if (this.searchInput.value.length == 13 || this.selectedSearchType == 'ID Number') {
            this.app.loading = true
            this._service.searchMemberByIdNumber(this.searchInput.value)
              .subscribe(res => {
                this.response = res

                if (this.response.length > 0) {
                  console.log('Search By ID Number')

                  this.members = []
                  this.z = 0
                  
                  for (this.i = 0; this.i < this.response.length; this.i++) {
                    this.members.push({
                      'idmember': this.response[this.i].idmember,
                      'membershipnumber': this.response[this.i].membershipnumber,
                      'name': this.response[this.i].name,
                      'surname': this.response[this.i].surname,
                      'createddate': this.response[this.i].createddate,
                      'identitynumber': this.response[this.i].identitynumber
                    })
                    this._service.getLifestatus(this.response[this.i].idlifestatus)
                    .subscribe(lifeS => {
  
 /*                     
                      this.members.push({
                        'idmember': this.response[this.z].idmember,
                        'membershipnumber': this.response[this.z].membershipnumber,
                        'name': this.response[this.z].name,
                        'surname': this.response[this.z].surname,
                        'createddate': this.response[this.z].createddate,
                        'identitynumber': this.response[this.z].identitynumber,
                        'lifestatus': lifeS[0].name
                      })
                      this.z++
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

  selectSearchType() {
    this.searchText = this.selectedSearchType
  }

  changeEmpty() {
    this.isEmpty = false
    this.invalidID = false
  }


  // Edit a member
  editMember(index, idmember) {
    this.selectedrow = index;
    
    localStorage.setItem('idmember', JSON.stringify(idmember));
    sessionStorage.clear()
    this._router.navigate(['/members/editmember']);
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


/*

                  console.log(isNullOrUndefined(this.response[this.i].idlifestatus))
                  if (isNullOrUndefined(this.response[this.i].idlifestatus)) {
                    this.members.push({
                      'idmember': this.response[this.i].idmember,
                      'membershipnumber': this.response[this.i].membershipnumber,
                      'name': this.response[this.i].name,
                      'surname': this.response[this.i].surname,
                      'createddate': this.response[this.i].createddate,
                      'lifestatus': 'NOT DEFINED'
                    })
                  } else {

                    this._service.getLifestatus(this.response[this.i].idlifestatus)
                      .subscribe(lifeS => {
                        this.lifestatus = lifeS[0].name
                        console.log(this.lifestatus)
                        console.log(this.i)
                        console.log(this.response[0])
                        
                      })
                    //  console.log(this.lifestatus)
                    this.members.push({
                      'idmember': this.response[this.i].idmember,
                      'membershipnumber': this.response[this.i].membershipnumber,
                      'name': this.response[this.i].name,
                      'surname': this.response[this.i].surname,
                      'createddate': this.response[this.i].createddate,
                      'lifestatus': 'DEFINED'
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

 Edit record
table.on('click', '.edit', function(e) {
  const $tr = $(this).closest('tr');
  const data = table.row($tr).data();
  alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
  e.preventDefault();
});

// Delete a record
table.on('click', '.remove', function(e) {
  const $tr = $(this).closest('tr');
  table.row($tr).remove().draw();
  e.preventDefault();
});

//Like record
table.on('click', '.like', function (e) {
  alert('You clicked on Like button');
  e.preventDefault();
});

$('.card .material-datatables label').addClass('form-group');
}


*/