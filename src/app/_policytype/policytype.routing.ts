import { ViewPolicytypeComponent } from './ViewPolicytype/ViewPolicytype.component';
import { CreatePolicytypeComponent } from './CreatePolicytype/CreatePolicytype.component';
import { EditPolicytypeComponent } from './EditPolicytype/EditPolicytype.component';
import { Routes } from '@angular/router';



export const PolicytypeRoutes: Routes = [
{
    path: '',
    children: [{
      path: 'viewpolicytype',
      component: ViewPolicytypeComponent
    }]
  },{
    path: '',
    children: [{
      path: 'createpolicytype',
      component: CreatePolicytypeComponent
    }]
  }
  ,{
    path: '',
    children: [{
      path: 'editpolicytype',
      component: EditPolicytypeComponent
    }]
  }



];
