var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
import swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component';
var ViewMembersComponent = /** @class */ (function () {
    function ViewMembersComponent(_service, _router, app) {
        this._service = _service;
        this._router = _router;
        this.app = app;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.searchText = 'ID Number';
        this.isEmpty = false;
        this.searchResult = false;
        this.notFound = false;
        this.invalidID = false;
        this.title = 'materialApp';
        this.color = 'primary';
        this.mode = 'determinate';
        this.value = 80;
        this.Types = [
            { id: 1, value: 'Membership Number', viewValue: 'Membership Number' },
            { id: 2, value: 'ID Number', viewValue: 'ID Number' },
            { id: 3, value: 'Surname', viewValue: 'Surname' }
        ]; /*
        $(window).on("load",function(){
          $(".loader-wrapper").fadeOut("slow");
      });
      */
    }
    ViewMembersComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('iduser') != '') {
            this.iduser = JSON.parse(localStorage.getItem('iduser'));
            console.log(this.iduser);
        }
        this.app.loading = false;
        sessionStorage.clear();
    };
    ViewMembersComponent.prototype.click = function () {
        this.app.loading = true;
        window.onloadstart;
    };
    //Search member
    ViewMembersComponent.prototype.searchMember = function () {
        var _this = this;
        this.isEmpty = false;
        this.searchResult = false;
        this.notFound = false;
        //this.load = true
        this.searchInput = document.querySelector('#searchBox');
        if (this.searchInput.value == '' || isNullOrUndefined(this.searchInput.value)) {
            this.searchResult = false;
            this.notFound = false;
            this.isEmpty = true;
        }
        else {
            this.isEmpty = false;
            this.searchResult = false;
            this.notFound = false;
            if (this.selectedSearchType == 'Membership Number') {
                this.app.loading = true;
                this._service.searchMemberByMembershipNumber(this.searchInput.value)
                    .subscribe(function (res) {
                    _this.response = res;
                    if (_this.response.length > 0) {
                        console.log('Search By Membership Number');
                        _this.members = [];
                        _this.z = 0;
                        for (_this.i = 0; _this.i < _this.response.length; _this.i++) {
                            _this._service.getLifestatus(_this.response[_this.i].idlifestatus)
                                .subscribe(function (lifeS) {
                                _this.members.push({
                                    'idmember': _this.response[_this.z].idmember,
                                    'membershipnumber': _this.response[_this.z].membershipnumber,
                                    'name': _this.response[_this.z].name,
                                    'surname': _this.response[_this.z].surname,
                                    'createddate': _this.response[_this.z].createddate,
                                    'identitynumber': _this.response[_this.z].identitynumber,
                                    'lifestatus': lifeS[0].name
                                });
                                _this.z++;
                            }, function (err) {
                                console.log();
                            });
                        }
                        _this.app.loading = false;
                        _this.notFound = false;
                        _this.searchResult = true;
                    }
                    else {
                        console.log('NO MEMBERS FOUND');
                        _this.app.loading = false;
                        _this.searchResult = false;
                        _this.notFound = true;
                    }
                }, function (err) {
                    console.log(err);
                });
            }
            else if (this.selectedSearchType == 'Surname') {
                this.app.loading = true;
                this._service.searchMemberBySurname(this.searchInput.value)
                    .subscribe(function (res) {
                    _this.response = res;
                    if (_this.response.length > 0) {
                        console.log('Search By Surname');
                        _this.members = [];
                        _this.z = 0;
                        for (_this.i = 0; _this.i < _this.response.length; _this.i++) {
                            _this._service.getLifestatus(_this.response[_this.i].idlifestatus)
                                .subscribe(function (lifeS) {
                                _this.members.push({
                                    'idmember': _this.response[_this.z].idmember,
                                    'membershipnumber': _this.response[_this.z].membershipnumber,
                                    'name': _this.response[_this.z].name,
                                    'surname': _this.response[_this.z].surname,
                                    'createddate': _this.response[_this.z].createddate,
                                    'identitynumber': _this.response[_this.z].identitynumber,
                                    'lifestatus': lifeS[0].name
                                });
                                _this.z++;
                            }, function (err) {
                                console.log();
                            });
                            /*
                            */
                        }
                        _this.app.loading = false;
                        _this.notFound = false;
                        _this.searchResult = true;
                    }
                    else {
                        console.log('NO MEMBERS FOUND');
                        _this.app.loading = false;
                        _this.searchResult = false;
                        _this.notFound = true;
                    }
                }, function (err) {
                    console.log(err);
                });
            }
            else if (this.searchInput.value.length == 13 || this.selectedSearchType == 'ID Number') {
                this.app.loading = true;
                this._service.searchMemberByIdNumber(this.searchInput.value)
                    .subscribe(function (res) {
                    _this.response = res;
                    if (_this.response.length > 0) {
                        console.log('Search By ID Number');
                        _this.members = [];
                        _this.z = 0;
                        for (_this.i = 0; _this.i < _this.response.length; _this.i++) {
                            _this.members.push({
                                'idmember': _this.response[_this.i].idmember,
                                'membershipnumber': _this.response[_this.i].membershipnumber,
                                'name': _this.response[_this.i].name,
                                'surname': _this.response[_this.i].surname,
                                'createddate': _this.response[_this.i].createddate,
                                'identitynumber': _this.response[_this.i].identitynumber
                            });
                            _this._service.getLifestatus(_this.response[_this.i].idlifestatus)
                                .subscribe(function (lifeS) {
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
                            }, function (err) {
                                console.log();
                            });
                        }
                        _this.app.loading = false;
                        _this.notFound = false;
                        _this.searchResult = true;
                    }
                    else {
                        console.log('NO MEMBERS FOUND');
                        _this.app.loading = false;
                        _this.searchResult = false;
                        _this.notFound = true;
                    }
                }, function (err) { return console.log(err); });
            }
            else {
                this.invalidID = true;
            }
        }
    };
    ViewMembersComponent.prototype.selectSearchType = function () {
        this.searchText = this.selectedSearchType;
    };
    ViewMembersComponent.prototype.changeEmpty = function () {
        this.isEmpty = false;
        this.invalidID = false;
    };
    // Edit a member
    ViewMembersComponent.prototype.editMember = function (index, idmember) {
        this.selectedrow = index;
        localStorage.setItem('idmember', JSON.stringify(idmember));
        sessionStorage.clear();
        this._router.navigate(['/members/editmember']);
    };
    // View full member details
    ViewMembersComponent.prototype.viewMember = function (index, idmember) {
        this.selectedrow = index;
        localStorage.setItem('idmember', JSON.stringify(idmember));
        this._router.navigate(['/members/viewmemberdetails']);
    };
    // Delete a member
    ViewMembersComponent.prototype.deleteMember = function (index, idmember) {
        var _this = this;
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
        }).then(function (result) {
            if (result.value) {
                _this._service.removeMember(idmember)
                    .subscribe(function (res) {
                    console.log(res);
                }, function (err) { return console.log(err); });
                swal({
                    title: 'Member Deleted',
                    //text: 'Member Deleted',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                }).then(function (result) { return window.location.reload(); });
            }
        });
    };
    ViewMembersComponent = __decorate([
        Component({
            selector: 'app-ViewMembers',
            templateUrl: './ViewMembers.component.html',
            styleUrls: ['./ViewMembers.component.css']
        }),
        __metadata("design:paramtypes", [ServiceService, Router, AppComponent])
    ], ViewMembersComponent);
    return ViewMembersComponent;
}());
export { ViewMembersComponent };
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
//# sourceMappingURL=ViewMembers.component.js.map