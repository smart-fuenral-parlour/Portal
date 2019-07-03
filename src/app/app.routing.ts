import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

////////////////////////////////////////////////////////////////////////////////

export const AppRoutes: Routes = [

    {
        path: '',
        redirectTo: '/user/login',
        pathMatch: 'full',
    }, 
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            
            {
                // DASHBOARD MODULE
                path: '',
                loadChildren: './_dashboard/dashboard.module#DashboardsModule'
            },
            {
                // MEMBERS MODULE
                path: 'members',
                loadChildren: './_members/members.module#MembersModule'
            },
           /* {
                // PAYMENTS MODULE
                path: 'payments',
                loadChildren: './payments/payments.module#PaymentsModule'
            },*/
            {
                // SOCIETY MODULE
                path: 'society',
                loadChildren: './_society/society.module#SocietyModule'
            },
            {
                // PAYMENTS MODULE
                path: 'payments',
                loadChildren: './_payments/payments.module#PaymentsModule'
            },
            {
                // CLAIMS MODULE NotificationsModule
                path: 'claims',
                loadChildren: './_claims/claims.module#ClaimsModule'
            },
            {
                // NOTIFICATIONS MODULE 
                path: 'notification',
                loadChildren: './_notification/notification.module#NotificationsModule'
            },
            //////////////////////////////////////////////////////////////////////////
            {
                path: 'DASHboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            }, {
                path: 'components',
                loadChildren: './components/components.module#ComponentsModule'
            }, {
                path: 'forms',
                loadChildren: './forms/forms.module#Forms'
            }, {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule'
            }, {
                path: 'maps',
                loadChildren: './maps/maps.module#MapsModule'
            }, {
                path: 'widgets',
                loadChildren: './widgets/widgets.module#WidgetsModule'
            }, {
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule'
            }, {
                path: 'calendar',
                loadChildren: './calendar/calendar.module#CalendarModule'
            }, {
                path: '',
                loadChildren: './userpage/user.module#UserModule'
            }, {
                path: '',
                loadChildren: './timeline/timeline.module#TimelineModule'
            },
        ]
    },
    {
        path: '',
     //   redirectTo: '/login',
     //   pathMatch: 'full',
        component: AuthLayoutComponent,
        children: [{
            path: 'pages',
            loadChildren: './pages/pages.module#PagesModule'
        } , {
            path: 'user',
            loadChildren: './_userPage/User_page.module#UserPagesModule'
        } 
    ]
    }
];
