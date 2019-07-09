import { Routes } from '@angular/router';

import { CreateUserComponent } from './CreateUser/CreateUser.component';
import { ViewUserComponent } from './ViewUser/ViewUser.component';
import { EditUserComponent } from './EditUser/EditUser.component';

export const UserRoutes: Routes = [

  {
    path: '',
    children: [{
      path: 'createuser',
      component: CreateUserComponent
    }]
  },{
    path: '',
    children: [{
      path: 'viewuser',
      component: ViewUserComponent
    }]
  },{
    path: '',
    children: [{
      path: 'edituser',
      component: EditUserComponent
    }]
  }


];
