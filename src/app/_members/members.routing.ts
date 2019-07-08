import { Routes } from '@angular/router';

import { ViewMembersComponent } from './ViewMembers/ViewMembers.component';
import { CreateMemberComponent } from './CreateMember/CreateMember.component';
import { EditMemberComponent } from './EditMember/EditMember.component';
import { MemberDetailsComponent } from './MemberDetails/MemberDetails.component';


export const MembersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'searchmember',
      component: ViewMembersComponent
    }]
  },
  {
    path: '',
    children: [{
      path: 'createmember',
      component: CreateMemberComponent
    }]
  },
  {
    path: '',
    children: [{
      path: 'viewmemberdetails',
      component: MemberDetailsComponent
    }]
  },
  {
    path: '',
    children: [{
      path: 'editmember',
      component: EditMemberComponent
    }]
  }

];
