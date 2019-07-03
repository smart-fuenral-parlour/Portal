import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { NotificationsRoutes } from './notification.routing';


import { PolicyComponent } from './Policy/Policy.component';
import { Funeral_arragementComponent } from './Funeral_arragement/Funeral_arragement.component';
import { ClaimsComponent } from './Claims/Claims.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(NotificationsRoutes),
        FormsModule,
        MaterialModule
    ],
    declarations: [
        PolicyComponent,
        ClaimsComponent,
        Funeral_arragementComponent
    ]
})

export class NotificationsModule { }
