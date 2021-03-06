var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapsRoutes } from './maps.routing';
import { FullScreenMapsComponent } from './fullscreenmap/fullscreenmap.component';
import { GoogleMapsComponent } from './googlemaps/googlemaps.component';
import { VectorMapsComponent } from './vectormaps/vectormaps.component';
var MapsModule = /** @class */ (function () {
    function MapsModule() {
    }
    MapsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(MapsRoutes),
                FormsModule
            ],
            declarations: [
                FullScreenMapsComponent,
                GoogleMapsComponent,
                VectorMapsComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
    ], MapsModule);
    return MapsModule;
}());
export { MapsModule };
//# sourceMappingURL=maps.module.js.map