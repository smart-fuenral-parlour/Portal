import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: any;
  public fullnames: any;
  public ImageUpload: string | undefined;
  public currentUser: any;
  public siteurl = window.location.origin;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adalSvc: AdalService
  ) {
            // Get current   user Details
            this.fullnames = this.adalSvc.userInfo.profile.name;
            this.email = this.adalSvc.userInfo.userName;
              if ( this.email === 'support@skhomotech.co.za') {
                // tslint:disable-next-line:no-trailing-whitespace
                
                   $('#applyleave').hide();
                   $('#leavedetails').hide();
                   $('#employees').show();
                  } else {
                    $('#applyleave').show();
                    $('#leavedetails').show();
                    $('#employees').hide();
                   }
  }

  ngOnInit() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboards/v1';

    if (this.adalSvc.userInfo.authenticated) {
      this.router.navigate([returnUrl]);
    } else {
      this.adalSvc.login();
    }
         // Get current   user Details
         this.fullnames = this.adalSvc.userInfo.profile.name;
         this.email = this.adalSvc.userInfo.userName;
           if ( this.email === 'support@skhomotech.co.za') {
             // tslint:disable-next-line:no-trailing-whitespace
             
                $('#applyleave').hide();
                $('#leavedetails').hide();
                $('#employees').show();
               } else {
                 $('#applyleave').show();
                 $('#leavedetails').show();
                 $('#employees').hide();
                }
  }
}
