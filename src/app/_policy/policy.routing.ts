import { Routes } from '@angular/router';



import { ViewPolicyTypeComponent } from './ViewPolicyType/ViewPolicyType.component';
import { CreatePolicyComponent } from './CreatePolicy/CreatePolicy.component';


export const PolicyRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'viewpolicytypedetails',
      component: ViewPolicyTypeComponent
    }]
  },  {
    path: '',
    children: [{
      path: 'createpolicytype',
      component: CreatePolicyComponent
    }]
  },   {
    path: '',
    children: [{
      path: 'viewpolicytypedetails',
      component: ViewPolicyTypeComponent
    }]
  }

];
