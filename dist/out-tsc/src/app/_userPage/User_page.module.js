var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { UserPageRoutes } from './User_page.routing';
import { RegisterComponent } from './register/register.component';
import { PricingComponent } from './pricing/pricing.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
var UserPagesModule = /** @class */ (function () {
    function UserPagesModule() {
    }
    UserPagesModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(UserPageRoutes),
                FormsModule,
                MaterialModule,
                ReactiveFormsModule
            ],
            declarations: [
                LoginComponent,
                RegisterComponent,
                PricingComponent,
                LockComponent
            ]
        })
    ], UserPagesModule);
    return UserPagesModule;
}());
export { UserPagesModule };
//# sourceMappingURL=User_page.module.js.map