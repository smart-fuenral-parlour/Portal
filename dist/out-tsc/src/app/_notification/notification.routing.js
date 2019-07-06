import { PolicyComponent } from './Policy/Policy.component';
import { Funeral_arragementComponent } from './Funeral_arragement/Funeral_arragement.component';
import { ClaimsComponent } from './Claims/Claims.component';
import { EditClaimComponent } from './EditClaim/EditClaim.component';
export var NotificationsRoutes = [
    {
        path: '',
        children: [{
                path: 'claimsinbox',
                component: ClaimsComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'funeralarrangement',
                component: Funeral_arragementComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'changeclaimstatus',
                component: EditClaimComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'policyinbox',
                component: PolicyComponent
            }]
    }
];
//# sourceMappingURL=notification.routing.js.map