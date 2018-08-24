import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'admin-user-profile',
  templateUrl: './admin-user-profile.component.html'
})
export class AdminUserProfileComponent implements OnInit {
    userProfileBtnText:string = 'Edit';
    router: any;
    profileIsEdit:boolean = false;
    token: string = localStorage['token'] || sessionStorage['token'];
    id: string = localStorage['id'] || sessionStorage['id'];
    userProfile: any = {
        email: "",
        username: "",
        fullname: "",
        password: "",
        post: "",
        phone: "",
    }

  constructor(private route: ActivatedRoute,
              private userService: UserService) {

   }

    ngOnInit(): void {
        this.getOneUser();
    }
    getOneUser(): void {
        this.route.params
            .subscribe(params => {
                this.userService.getOne(params.id, this.token)
                    .subscribe(
                        userProfile => {
                            this.userProfile = userProfile;
                        },
                        err => console.log("err",err)
                    );
            });
    }
    editUser(): void {
        this.profileIsEdit = !this.profileIsEdit;
        if (this.profileIsEdit == true) {
            this.userProfileBtnText = 'Submit'
        } else {
            this.userProfileBtnText = 'Edit'
        }
        console.log(this.userProfile);
        
        this.userService.edit(this.userProfile, this.userProfile._id, this.token)
    }
    deleteUser(): void {
        this.userService.delete(this.userProfile._id, this.token);
    }
}
