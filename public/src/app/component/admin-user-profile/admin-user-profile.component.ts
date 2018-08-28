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
    id: string;
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
        if (this.route.routeConfig.path !='myprofile'){
        this.route.params
            .subscribe(params => {
                this.userService.getOne(params.id, this.token)
                    .subscribe(
                        userProfile => {
                            this.userProfile = userProfile;
                        }
                    );
            });
        } else{
            this.userService.getMyId(this.token)
            .subscribe(id => {
                this.userService.getOne(id, this.token)
                    .subscribe(
                        userProfile => {
                            this.userProfile = userProfile;
                        }
                    );
            })
        }
    }
    
    editUser(): void {
        this.profileIsEdit = !this.profileIsEdit;
        if (this.profileIsEdit == true) {
            this.userProfileBtnText = 'Submit'
        } else {
            this.userProfileBtnText = 'Edit'
        }
        
        this.userService.edit(this.userProfile, this.userProfile._id, this.token)
        .subscribe();
    }
    deleteUser(): void {
        console.log(this.userProfile._id);
        this.userService.delete(this.userProfile._id, this.token)
    }
}
