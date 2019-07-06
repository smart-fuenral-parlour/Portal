var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { isNullOrUndefined } from 'util';
import { AppComponent } from 'src/app/app.component';
//Menu Items
export var ROUTES = [
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
    {
        path: '/members',
        title: 'Individual Members',
        type: 'sub',
        icontype: 'person',
        collapse: 'member',
        children: [
            { path: 'searchmember', title: 'Search For Members', ab: 'SFM' },
            { path: 'createmember', title: 'Create Member', ab: 'CM' }
        ]
    },
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
    {
        path: '/claims',
        title: 'Claims',
        type: 'sub',
        icontype: 'supervisor_account',
        collapse: 'claims',
        children: [
            { path: 'viewallclaims', title: 'View All Claims', ab: 'VAC' },
            { path: 'createclaim', title: 'Create Claim', ab: 'CC' }
        ]
    },
    {
        path: '/policy',
        title: 'Policy',
        type: 'sub',
        icontype: 'person_add',
        collapse: 'policy',
        children: [
            { path: 'createpolicytype', title: 'Create Policy', ab: 'CP' },
            { path: 'updatepolicytype', title: 'Edit Policy', ab: 'EP' },
            { path: 'viewpolicytypedetails', title: 'View Policy Type', ab: 'VPT' }
        ]
    },
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
];
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(app) {
        this.app = app;
    }
    SidebarComponent.prototype.isMobileMenu = function () {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
    ;
    SidebarComponent.prototype.ngOnInit = function () {
        this.menuItems = ROUTES.filter(function (menuItem) { return menuItem; });
        // GETTING NAME OF THE CREATOR
        if (!isNullOrUndefined(localStorage.getItem('name'))) {
            this.user = JSON.parse(localStorage.getItem('name'));
            this.role = JSON.parse(localStorage.getItem('role'));
        }
        else {
            this.user = 'ADMINISTRATOR';
            this.role = 'Admin';
        }
    };
    SidebarComponent.prototype.updatePS = function () {
        if (window.matchMedia("(min-width: 960px)").matches && !this.isMac()) {
            var elemSidebar = document.querySelector('.sidebar .sidebar-wrapper');
            var ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    };
    SidebarComponent.prototype.isMac = function () {
        var bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    };
    SidebarComponent.prototype.nextPage = function () {
        this.app.loading = true;
    };
    SidebarComponent = __decorate([
        Component({
            selector: 'app-sidebar-cmp',
            templateUrl: 'sidebar.component.html',
        }),
        __metadata("design:paramtypes", [AppComponent])
    ], SidebarComponent);
    return SidebarComponent;
}());
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map