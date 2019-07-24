import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
@Component({
  selector: 'app-profile1',
  templateUrl: './profile1.component.html',
  styleUrls: ['./profile1.component.scss']
})
export class Profile1Component implements OnInit {
 public email: any;
  public fullnames: any;
  public userdetails: any;
  public ImageUpload: string | undefined;
  public currentUser: any;
  public siteurl = window.location.origin;
  constructor( private adalSvc: AdalService) {
    if (this.ImageUpload === undefined || this.ImageUpload === '') {
      this.ImageUpload = '/assets/img/image_placeholder.jpg';
    }

   }

  ngOnInit() {

       // Get current   user Details
       this.fullnames = this.adalSvc.userInfo.profile.name;
       this.email = this.adalSvc.userInfo.userName;
       this.userdetails = this.adalSvc.userInfo;
  }

}
