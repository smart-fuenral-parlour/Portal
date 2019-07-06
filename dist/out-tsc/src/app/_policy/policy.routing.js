import { ViewPolicyTypeComponent } from './ViewPolicyType/ViewPolicyType.component';
import { CreatePolicyComponent } from './CreatePolicy/CreatePolicy.component';
export var PolicyRoutes = [
    {
        path: '',
        children: [{
                path: 'viewpolicytypedetails',
                component: ViewPolicyTypeComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'createpolicytype',
                component: CreatePolicyComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'viewpolicytypedetails',
                component: ViewPolicyTypeComponent
            }]
    }
];
//# sourceMappingURL=policy.routing.js.map