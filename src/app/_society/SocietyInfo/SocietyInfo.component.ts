import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component'

declare var $: any;

@Component({
  selector: 'app-SocietyInfo',
  templateUrl: './SocietyInfo.component.html',
  styleUrls: ['./SocietyInfo.component.css']
})
export class SocietyInfoComponent implements OnInit {

  members;
  row;
  response;

  constructor(private _router: Router, private _service: ServiceService) { }

  ngOnInit() {
    this._service.getMembers()
      .subscribe(res => {
        this.response = res;
        this.members = this.response.response;
      },
      err => console.log(err))


      sessionStorage.clear()
  }


  // Edit a member
  editMember(index, id) {
    this.row = index;
    console.log('Member ID: ' + id);
    localStorage.setItem('id', JSON.stringify(id));
    sessionStorage.setItem('greenlinks', JSON.stringify('society'));
    this._router.navigate(['/members/editmember']);
  }

  // View member details
  viewMember(index, id) {
    this.row = index;
    console.log('Member ID: ' + id); 
    localStorage.setItem('id', JSON.stringify(id));
    sessionStorage.setItem('greenlinks', JSON.stringify('society'));
    this._router.navigate(['/members/viewmemberdetails']);   
  }

  // Delete a member
  deleteMember(index, id) {
    this.row = index;
    console.log('Member ID: ' + id);
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
      if (result.value) {/*
        this._service.removeMember(id)
          .subscribe(res => {
            console.log(res)
          }, err => console.log(err))*/
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
