var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { NotificationsRoutes } from './notification.routing';
import { PolicyComponent } from './Policy/Policy.component';
import { Funeral_arragementComponent } from './Funeral_arragement/Funeral_arragement.component';
import { ClaimsComponent } from './Claims/Claims.component';
import { EditClaimComponent } from './EditClaim/EditClaim.component';
var NotificationsModule = /** @class */ (function () {
    function NotificationsModule() {
    }
    NotificationsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(NotificationsRoutes),
                FormsModule,
                MaterialModule
            ],
            declarations: [
                PolicyComponent,
                ClaimsComponent,
                Funeral_arragementComponent,
                EditClaimComponent
            ]
        })
    ], NotificationsModule);
    return NotificationsModule;
}());
export { NotificationsModule };
//# sourceMappingURL=notification.module.js.map