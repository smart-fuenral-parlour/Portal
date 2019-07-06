import { ClaimInfoComponent } from './ClaimInfo/ClaimInfo.component';
import { ViewAllClaimsComponent } from './ViewAllClaims/ViewAllClaims.component';
import { CreateClaimComponent } from './CreateClaim/CreateClaim.component';
import { CreateClaimFormComponent } from './CreateClaimForm/CreateClaimForm.component';
export var ClaimsRoutes = [
    {
        path: '',
        children: [{
                path: 'viewallclaims',
                component: ViewAllClaimsComponent
            }]
    },
    {
        path: '',
        children: [{
                path: 'claiminfo',
                component: ClaimInfoComponent
            }]
    },
    {
        path: '',
        children: [{
                path: 'createclaim',
                component: CreateClaimComponent
            }]
    },
    {
        path: '',
        children: [{
                path: 'createclaimformember',
                component: CreateClaimFormComponent
            }]
    }
];
//# sourceMappingURL=claims.routing.js.map