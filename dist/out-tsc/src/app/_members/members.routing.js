import { ViewMembersComponent } from './ViewMembers/ViewMembers.component';
import { CreateMemberComponent } from './CreateMember/CreateMember.component';
import { EditMemberComponent } from './EditMember/EditMember.component';
import { MemberDetailsComponent } from './MemberDetails/MemberDetails.component';
import { TextComponentComponent } from './textComponent/textComponent.component';
export var MembersRoutes = [
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
                path: 'testa',
                component: TextComponentComponent
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
//# sourceMappingURL=members.routing.js.map