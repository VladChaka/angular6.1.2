import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
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

  constructor(private userService: UserService) {

   }

    ngOnInit(): void {
        this.getOneUser();
    }
    getOneUser(): void {
        this.userService.getMyId(this.token)
            .subscribe(id => {
                this.id = id;
                this.userService.getOne(this.id, this.token)
                    .subscribe(
                        userProfile => {
                            this.userProfile = userProfile;
                        },
                        err => console.log("err",err)
                    );
            })
    }
    editUser(): void {
        this.profileIsEdit = !this.profileIsEdit;
        if (this.profileIsEdit == true) {
            this.userProfileBtnText = 'Submit'
        } else {
            this.userProfileBtnText = 'Edit'
        }        
        this.userService.edit(this.userProfile, this.userProfile._id, this.token)
        .subscribe()
    }
}
