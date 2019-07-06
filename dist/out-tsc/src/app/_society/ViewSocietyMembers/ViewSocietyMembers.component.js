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
var ViewSocietyMembersComponent = /** @class */ (function () {
    function ViewSocietyMembersComponent(_service, _roter) {
        this._service = _service;
        this._roter = _roter;
    }
    ViewSocietyMembersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._service.getMembers()
            .subscribe(function (res) {
            _this.response = res;
            _this.members = _this.response.response;
            console.log(_this.members);
        }, function (err) { return console.log(err); });
    };
    // Delete a member
    ViewSocietyMembersComponent.prototype.deleteMember = function (index, id) {
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
        }).then(function (result) {
            if (result.value) { /*
              this._service.removeMember(id)
                .subscribe(res => {
                  console.log(res)
                }, err => console.log(err))*/
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
    ViewSocietyMembersComponent = __decorate([
        Component({
            selector: 'app-ViewSocietyMembers',
            templateUrl: './ViewSocietyMembers.component.html',
            styleUrls: ['./ViewSocietyMembers.component.css']
        }),
        __metadata("design:paramtypes", [ServiceService, Router])
    ], ViewSocietyMembersComponent);
    return ViewSocietyMembersComponent;
}());
export { ViewSocietyMembersComponent };
//# sourceMappingURL=ViewSocietyMembers.component.js.map