
import { Map1Component } from './views/maps/map1/map1.component';
import { ModalsComponent } from './views/modals/modals.component';
import { Profile1Component } from './views/profile/profile1/profile1.component';
import { LoginComponent } from './views/login/login/login.component';
import {LogoutComponent} from './views/logout/logout.component';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { Dashboard1Component } from './views/dashboards/dashboard1/dashboard1.component';
import {EmplyeesComponent} from './views/admin/emplyees/emplyees.component';
import { ApplyleaveComponent } from './views/tables/applyleave/applyleave.component';
import {LeavedetailsComponent} from './views/tables/leavedetails/leavedetails.component';
const routes: Route[] = [

  { path: '', pathMatch: 'full', redirectTo: 'login/login' },
  { path: 'login', children:
  [
    { path: 'login', component: LoginComponent },
  ]
},
  { path: 'dashboards', children:
    [
      { path: 'v1', component: Dashboard1Component },
    ]
  },
  { path: 'profiles', children:
    [
      { path: 'profile1', component: Profile1Component },
    ]
  },
  { path: 'tables', children:
  [
    { path: 'applyleave', component: ApplyleaveComponent },
  ]
},
  { path: 'tables', children:
    [
      { path: 'leavedetails', component: LeavedetailsComponent },
    ]
  },
  { path: 'admin', children:
  [
    { path: 'employees', component: EmplyeesComponent },
  ]
},
  { path: 'maps', children:
    [
      { path: 'claims', component: Map1Component},
    ]
  },
  { path: 'logout', component: LogoutComponent },
  { path: 'modals', component: ModalsComponent},
  { path: '**', component: NotFoundComponent },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
