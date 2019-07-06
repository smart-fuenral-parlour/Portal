import { RegisterComponent } from './register/register.component';
import { PricingComponent } from './pricing/pricing.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
export var UserPageRoutes = [
    {
        path: '',
        children: [{
                path: 'login',
                component: LoginComponent
            }, {
                path: 'lock',
                component: LockComponent
            }, {
                path: 'register',
                component: RegisterComponent
            }, {
                path: 'pricing',
                component: PricingComponent
            }]
    }
];
//# sourceMappingURL=User_page.routing.js.map