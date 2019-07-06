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
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/SERVICE/service.service'; // service link here
var EditSocietyComponent = /** @class */ (function () {
    function EditSocietyComponent(formBuilder, _router, _service) {
        this.formBuilder = formBuilder;
        this._router = _router;
        this._service = _service;
    }
    EditSocietyComponent.prototype.ngOnInit = function () {
    };
    EditSocietyComponent.prototype.Save = function () {
        this._router.navigate(['/society/viewallsocieties']);
    };
    EditSocietyComponent = __decorate([
        Component({
            selector: 'app-EditSociety',
            templateUrl: './EditSociety.component.html',
            styleUrls: ['./EditSociety.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, Router, ServiceService])
    ], EditSocietyComponent);
    return EditSocietyComponent;
}());
export { EditSocietyComponent };
//# sourceMappingURL=EditSociety.component.js.map