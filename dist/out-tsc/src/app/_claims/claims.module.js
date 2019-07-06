var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { SelectModule } from 'ng2-select';
import { MaterialModule } from 'src/app/app.module';
import { ClaimsRoutes } from './claims.routing';
import { ClaimInfoComponent } from './ClaimInfo/ClaimInfo.component';
import { ViewAllClaimsComponent } from './ViewAllClaims/ViewAllClaims.component';
import { CreateClaimComponent } from './CreateClaim/CreateClaim.component';
import { CreateClaimFormComponent } from './CreateClaimForm/CreateClaimForm.component';
var ClaimsModule = /** @class */ (function () {
    function ClaimsModule() {
    }
    ClaimsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(ClaimsRoutes),
                FormsModule,
                MaterialModule,
                SelectModule,
                ReactiveFormsModule,
                NouisliderModule,
                TagInputModule
            ],
            declarations: [
                ClaimInfoComponent,
                ViewAllClaimsComponent,
                CreateClaimComponent,
                CreateClaimFormComponent
            ]
        })
    ], ClaimsModule);
    return ClaimsModule;
}());
export { ClaimsModule };
//# sourceMappingURL=claims.module.js.map