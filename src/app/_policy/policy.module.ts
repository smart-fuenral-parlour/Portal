import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';

import { SelectModule } from 'ng2-select';
import { MaterialModule } from 'src/app/app.module';

import { PolicyRoutes } from './policy.routing';


import { ViewPolicyTypeComponent } from './ViewPolicyType/ViewPolicyType.component';
import { CreatePolicyComponent } from './CreatePolicy/CreatePolicy.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PolicyRoutes),
    FormsModule,
    MaterialModule,
    SelectModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule
  ],
  declarations: [
    ViewPolicyTypeComponent,
    CreatePolicyComponent
  ]
})

export class PolicyModule {}
