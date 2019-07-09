import { CreatePolicytypeComponent } from './CreatePolicytype/CreatePolicytype.component';
import { EditPolicytypeComponent } from './EditPolicytype/EditPolicytype.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';

import { SelectModule } from 'ng2-select';
import { MaterialModule } from 'src/app/app.module';
import { PolicytypeRoutes } from './policytype.routing';
import { ViewPolicytypeComponent } from './ViewPolicytype/ViewPolicytype.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PolicytypeRoutes),
    FormsModule,
    MaterialModule,
    SelectModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule
  ],
  declarations: [
 

    ViewPolicytypeComponent,
    CreatePolicytypeComponent,
    EditPolicytypeComponent

  ]
})

export class PolicytypeModule {}
