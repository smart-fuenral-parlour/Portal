import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

import { CalendarModule,  } from 'angular-calendar';
import { SharedModule } from '../shared/shared.module';

import { FooterComponent } from '../main-layout/footer/footer.component';
import { ModalsComponent } from './modals/modals.component';
import { Map1Component } from './maps/map1/map1.component';
import { StatsCardComponent } from './dashboards/common/stats-card/stats-card.component';
import { StatsCard2Component } from './dashboards/common/stats-card2/stats-card2.component';
import { Dashboard1Component } from './dashboards/dashboard1/dashboard1.component';
import { Profile1Component } from './profile/profile1/profile1.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {EmplyeesComponent} from './admin/emplyees/emplyees.component';
import { TablesService } from './tables/tables.service';
import { ApplyleaveComponent } from './tables/applyleave/applyleave.component';
import { LeavedetailsComponent } from './tables/leavedetails/leavedetails.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: ''
    }),
    CalendarModule.forRoot()
  ],
  declarations: [
    FooterComponent,
    ModalsComponent,
    Map1Component,
    StatsCardComponent,
    StatsCard2Component,
    Dashboard1Component,
    EmplyeesComponent,
    Profile1Component,
    HelpComponent,
    LoginComponent,
    LogoutComponent,
    ApplyleaveComponent,
    LeavedetailsComponent,

  ],
  providers: [TablesService],
  exports: [
    FooterComponent,
    ModalsComponent,
    Map1Component,
    StatsCardComponent,
    StatsCard2Component,
    Dashboard1Component
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ViewsModule { }