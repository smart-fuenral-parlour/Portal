import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component'

///////////////////////////  MODEL CLASS CALLS  //////////////////////////////////////////////////////////////
import { User } from 'src/app/services/user/user'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/user',
        title: 'User',
        type: 'sub',
        icontype: 'person_outline',
        collapse: 'user',
        children: [
            { path: 'createuser', title: 'Create User', ab: 'CU' },
            { path: 'viewuser', title: 'View User', ab: 'VU' }
        ]
    },
    /*
    {
        path: '/notification',
        title: 'Notification',
        type: 'sub',
        icontype: 'notifications',
        collapse: 'notification',
        children: [
            { path: 'claimsinbox', title: 'Inbox', ab: 'I' }
        ]
    },
    */
    {
        path: '/members',
        title: 'Members',
        type: 'sub',
        icontype: 'person',
        collapse: 'member',
        children: [
            { path: 'searchmember', title: 'Search For Members', ab: 'SFM' },
            { path: 'createmember', title: 'Create Member', ab: 'CM' }
        ]
    },
    {
        path: '/claims',
        title: 'Claims',
        type: 'sub',
        icontype: 'supervisor_account', //supervisor_account  money
        collapse: 'claims',
        children: [
            { path: 'viewallclaims', title: 'View All Claims', ab: 'VAC' },
            { path: 'createclaim', title: 'Create Claim', ab: 'CC' }
        ]
    },
    {
        path: '/policytype',
        title: 'Policy Type',
        type: 'sub',
        icontype: 'library_books',
        collapse: 'policy',
        children: [
            { path: 'createpolicytype', title: 'Create Policy', ab: 'CP' },
            { path: 'viewpolicytype', title: 'View Policy Type', ab: 'VPT' }
        ]
    },
     /*
    {
        path: '/payments',
        title: 'Payments',
        type: 'sub',
        icontype: 'payment',
        collapse: 'payments',
        children: [
            { path: 'viewpayments', title: 'View All Payments', ab: 'VAP' }
        ]
    },
   ///////////////////////////////////////////////////////////////////////////////////////////////////
  
    {
        path: '/payments',
        title: 'Payments',
        type: 'sub',
        icontype: 'person',
        collapse: 'payments',
        children: [
            { path: 'viewpayments', title: 'View All Payments', ab: 'VP' }
        ]
    },
  {
        path: '/members',
        title: 'Individual Members',
        type: 'sub',
        icontype: 'person',
        collapse: 'member',
        children: [
            { path: 'viewmembers', title: 'View Members', ab: 'VAM' },
            { path: 'createmember', title: 'Create Member', ab: 'CM' }
        ]
    },
    {
        path: '/society',
        title: 'Society',
        type: 'sub',
        icontype: 'people',
        collapse: 'society',
        children: [
            { path: 'createsociety', title: 'Create Society', ab: 'CS' },
            { path: 'viewallsocieties', title: 'View All Societies', ab: 'VAS' },
            { path: 'createsocietymember', title: 'Create Society Member', ab: 'CSM' }
        ]
    },
    {

        path: '/DASHboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    }, {
        path: '/components',
        title: 'Components',
        type: 'sub',
        icontype: 'apps',
        collapse: 'components',
        children: [
            { path: 'buttons', title: 'Buttons', ab: 'B' },
            { path: 'grid', title: 'Grid System', ab: 'GS' },
            { path: 'panels', title: 'Panels', ab: 'P' },
            { path: 'sweet-alert', title: 'Sweet Alert', ab: 'SA' },
            { path: 'notifications', title: 'Notifications', ab: 'N' },
            { path: 'icons', title: 'Icons', ab: 'I' },
            { path: 'typography', title: 'Typography', ab: 'T' }
        ]
    }, {
        path: '/forms',
        title: 'Forms',
        type: 'sub',
        icontype: 'content_paste',
        collapse: 'forms',
        children: [
            { path: 'regular', title: 'Regular Forms', ab: 'RF' },
            { path: 'extended', title: 'Extended Forms', ab: 'EF' },
            { path: 'validation', title: 'Validation Forms', ab: 'VF' },
            { path: 'wizard', title: 'Wizard', ab: 'W' }
        ]
    }, {
        path: '/tables',
        title: 'Tables',
        type: 'sub',
        icontype: 'grid_on',
        collapse: 'tables',
        children: [
            { path: 'regular', title: 'Regular Tables', ab: 'RT' },
            { path: 'extended', title: 'Extended Tables', ab: 'ET' },
            { path: 'datatables.net', title: 'Datatables.net', ab: 'DT' }
        ]
    }, {
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        icontype: 'place',
        collapse: 'maps',
        children: [
            { path: 'google', title: 'Google Maps', ab: 'GM' },
            { path: 'fullscreen', title: 'Full Screen Map', ab: 'FSM' },
            { path: 'vector', title: 'Vector Map', ab: 'VM' }
        ]
    }, {
        path: '/widgets',
        title: 'Widgets',
        type: 'link',
        icontype: 'widgets'

    }, {
        path: '/charts',
        title: 'Charts',
        type: 'link',
        icontype: 'timeline'

    }, {
        path: '/calendar',
        title: 'Calendar',
        type: 'link',
        icontype: 'date_range'
    }, {
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        collapse: 'pages',
        children: [
            { path: 'pricing', title: 'Pricing', ab: 'P' },
            { path: 'timeline', title: 'Timeline Page', ab: 'TP' },
            { path: 'login', title: 'Login Page', ab: 'LP' },
            { path: 'register', title: 'Register Page', ab: 'RP' },
            { path: 'lock', title: 'Lock Screen Page', ab: 'LSP' },
            { path: 'user', title: 'User Page', ab: 'UP' }
        ]
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////*/
];


@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    user: User
    titleName = 'Diale Funeral'

    public menuItems: any[];


    constructor(private app: AppComponent) {
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);


        // GETTING NAME OF THE CREATOR
        if (JSON.parse(localStorage.getItem('user')) != null) {
            this.user = JSON.parse(localStorage.getItem('user'))
        } else {
            this.user.name = 'INVALID USER!!!'
            
        }


    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    nextPage() {
    }

}
