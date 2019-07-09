import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';

import { SelectModule } from 'ng2-select';
import { MaterialModule } from 'src/app/app.module';

import { UserRoutes } from './user.routing';

import { CreateUserComponent } from './CreateUser/CreateUser.component';
import { ViewUserComponent } from './ViewUser/ViewUser.component';
import { EditUserComponent } from './EditUser/EditUser.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    FormsModule,
    MaterialModule,
    SelectModule,
    ReactiveFormsModule,
    NouisliderModule,
    TagInputModule
  ],
  declarations: [
 
    CreateUserComponent,
    ViewUserComponent,
    EditUserComponent

  ]
})

export class UserModule {}
