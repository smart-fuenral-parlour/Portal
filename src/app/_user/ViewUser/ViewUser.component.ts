import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormArray, FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

///////////////////// SERVICE CALLS  ///////////////////////////////////////////
import { UserService } from '../../services/user/user.service';
//////////////////// MODEL/ CLASS CALLS ///////////////////////////////////////
import { User } from './../../services/user/user';

///////////////////////////////////////////////////////////////////////////////
import swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component'

declare const $: any;





export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


@Component({
    selector: 'app-ViewUser',
    templateUrl: './ViewUser.component.html',
    styleUrls: ['./ViewUser.component.css']
})
export class ViewUserComponent implements OnInit {

    //////Initialized variables  

    users: User[];
    currentUser: User
    noUser = false

    // pagination
    pageNo = 1
    usersPerPage = 5


    constructor(private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private app: AppComponent) { }

    ////Functions//////////////////////////////////////////

    ngOnInit() {
        this.app.loading = true
        this.currentUser = JSON.parse(localStorage.getItem('user'))


        //get all users
        this.userService.getUsers()
            .subscribe(user_res => {

                this.app.loading = false
                if (user_res.length > 0) {
                    this.users = user_res
                    this.noUser = false
                } else {
                    this.noUser = true
                }

            }, err => {
                console.log(err);
                this.app.loading = false
            });

    }



    EditUser(index) {
        index = index + ((this.pageNo-1)*this.usersPerPage)
        localStorage.setItem('edituser', JSON.stringify(this.users[index]));
        this.router.navigate(['/user/edituser']);
    }

    DeleteUser(index) {

        swal({
            title: 'Delete User',
            text: 'Are you sure you want to delete ' + this.users[index].name + ' ' + this.users[index].surname + '?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Save',
            buttonsStyling: false
        }).then((result) => {
            if (result.value) {


                this.app.loading = true
                this.userService.deleteUser(this.users[index].idsystemusers)
                    .subscribe(res => {

                        console.log(res)
                        this.app.loading = false

                        swal({
                            title: 'User Deleted',
                            type: 'success',
                            confirmButtonClass: "btn btn-success",
                            buttonsStyling: false

                        }).then((result) => {
                            //this.router.navigate(['/user/viewuser']) 
                            document.location.reload()
                        })

                    }, err => {
                        console.log(err);
                        this.app.loading = false
                    });

            }
        })


    }

}
