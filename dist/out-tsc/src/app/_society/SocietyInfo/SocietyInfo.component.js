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
var SocietyInfoComponent = /** @class */ (function () {
    function SocietyInfoComponent(_router, _service) {
        this._router = _router;
        this._service = _service;
    }
    SocietyInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._service.getMembers()
            .subscribe(function (res) {
            _this.response = res;
            _this.members = _this.response.response;
        }, function (err) { return console.log(err); });
        sessionStorage.clear();
    };
    // Edit a member
    SocietyInfoComponent.prototype.editMember = function (index, id) {
        this.row = index;
        console.log('Member ID: ' + id);
        localStorage.setItem('id', JSON.stringify(id));
        sessionStorage.setItem('greenlinks', JSON.stringify('society'));
        this._router.navigate(['/members/editmember']);
    };
    // View member details
    SocietyInfoComponent.prototype.viewMember = function (index, id) {
        this.row = index;
        console.log('Member ID: ' + id);
        localStorage.setItem('id', JSON.stringify(id));
        sessionStorage.setItem('greenlinks', JSON.stringify('society'));
        this._router.navigate(['/members/viewmemberdetails']);
    };
    // Delete a member
    SocietyInfoComponent.prototype.deleteMember = function (index, id) {
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
    SocietyInfoComponent = __decorate([
        Component({
            selector: 'app-SocietyInfo',
            templateUrl: './SocietyInfo.component.html',
            styleUrls: ['./SocietyInfo.component.css']
        }),
        __metadata("design:paramtypes", [Router, ServiceService])
    ], SocietyInfoComponent);
    return SocietyInfoComponent;
}());
export { SocietyInfoComponent };
//# sourceMappingURL=SocietyInfo.component.js.map