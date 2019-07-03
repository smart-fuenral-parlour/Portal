import { Routes } from '@angular/router';

import { PolicyComponent } from './Policy/Policy.component';
import { Funeral_arragementComponent } from './Funeral_arragement/Funeral_arragement.component';
import { ClaimsComponent } from './Claims/Claims.component';


export const NotificationsRoutes: Routes = [
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
            path: 'policyinbox',
            component: PolicyComponent
        }]
    }
];
