import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdalService } from 'adal-angular4';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef;

  clicked: boolean;
  public email: any;
  public fullnames: any;
  public ImageUpload: string | undefined;
  public currentUser: any;
  public siteurl = window.location.origin;
  constructor(private adalSvc: AdalService) {

    this.clicked = this.clicked === undefined ? false : true;
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

  setClicked(val: boolean): void {
    this.clicked = val;
  }

}
