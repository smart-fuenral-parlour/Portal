import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';

import { SelectModule } from 'ng2-select';
import { MaterialModule } from 'src/app/app.module';

import { MembersRoutes } from './members.routing';
import { ViewMembersComponent } from './ViewMembers/ViewMembers.component';
import { CreateMemberComponent } from './CreateMember/CreateMember.component';
import { EditMemberComponent } from './EditMember/EditMember.component';
import { MemberDetailsComponent } from './MemberDetails/MemberDetails.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MembersRoutes),
    FormsModule,
    MaterialModule,
    SelectModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule
  ],
  declarations: [
    ViewMembersComponent,
    CreateMemberComponent,
    EditMemberComponent,
    MemberDetailsComponent
  ]
})

export class MembersModule {}
