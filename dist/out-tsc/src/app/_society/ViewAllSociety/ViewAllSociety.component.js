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
var ViewAllSocietyComponent = /** @class */ (function () {
    function ViewAllSocietyComponent(_router, _service) {
        this._router = _router;
        this._service = _service;
    }
    ViewAllSocietyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataTable = {
            headerRow: ['Name', 'Position', 'Office', 'Age', 'Date', 'Actions'],
            footerRow: ['Name', 'Position', 'Office', 'Age', 'Start Date', 'Actions'],
            dataRows: [
                ['Airi Satou', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
                ['Angelica Ramos', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
                ['Ashton Cox', 'Alex Mike', 'Design', '2010', '92,144', 'btn-simple'],
                ['Bradley Greer', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Brenden Wagner', 'Paul Dickens', 'Communication', '2015', '69,201', ''],
                ['Brielle Williamson', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Caesar Vance', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Cedric Kelly', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Charde Marshall', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Colleen Hurst', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Dai Rios', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
                ['Doris Wilder', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
                ['Fiona Green', 'Alex Mike', 'Design', '2010', '92,144', 'btn-simple'],
                ['Garrett Winters', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Gavin Cortez', 'Paul Dickens', 'Communication', '2015', '69,201', ''],
                ['Gavin Joyce', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Gloria Little', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Haley Kennedy', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Herrod Chandler', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Hope Fuentes', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Howard Hatfield', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
                ['Jena Gaines', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
                ['Jenette Caldwell', 'Alex Mike', 'Design', '2010', '92,144', 'btn-simple'],
                ['Jennifer Chang', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Martena Mccray', 'Paul Dickens', 'Communication', '2015', '69,201', ''],
                ['Michael Silva', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Michelle House', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Paul Byrd', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Prescott Bartlett', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Quinn Flynn', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Rhona Davidson', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
                ['Shou Itou', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
                ['Sonya Frost', 'Alex Mike', 'Design', '2010', '92,144', 'btn-simple'],
                ['Suki Burks', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Tatyana Fitzpatrick', 'Paul Dickens', 'Communication', '2015', '69,201', ''],
                ['Tiger Nixon', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Timothy Mooney', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Unity Butler', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Vivian Harrell', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
                ['Yuri Berry', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round']
            ]
        };
        this._service.getSociety()
            .subscribe(function (res) {
            _this.response = res;
            _this.societies = _this.response.response;
            console.log(res);
        }, function (err) { return console.log(err); });
    };
    // Edit society
    ViewAllSocietyComponent.prototype.editSociety = function (index, id) {
        this.row = index;
        localStorage.setItem('id', JSON.stringify(id));
        this._router.navigate(['/society/editsociety']);
    };
    // View society information 
    ViewAllSocietyComponent.prototype.viewSociety = function (index, id) {
        this.row = index;
        console.log('Member ID: ' + id);
        localStorage.setItem('id', JSON.stringify(id));
        this._router.navigate(['/society/societyinfomation']);
    };
    // Delete a society
    ViewAllSocietyComponent.prototype.deleteSociety = function (index, id) {
        this.row = index;
        console.log('Member ID: ' + id);
        swal({
            title: 'Delete This Society',
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
                    title: 'Society Deleted',
                    //text: 'Member Deleted',
                    type: 'success',
                    confirmButtonClass: "btn btn-success",
                    buttonsStyling: false
                }).then(function (result) { return window.location.reload(); });
            }
        });
    };
    ViewAllSocietyComponent = __decorate([
        Component({
            selector: 'app-ViewAllSociety',
            templateUrl: './ViewAllSociety.component.html',
            styleUrls: ['./ViewAllSociety.component.css']
        }),
        __metadata("design:paramtypes", [Router, ServiceService])
    ], ViewAllSocietyComponent);
    return ViewAllSocietyComponent;
}());
export { ViewAllSocietyComponent };
//# sourceMappingURL=ViewAllSociety.component.js.map