import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../service/form.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    userProfileBtnText:string = 'Edit';
    profileIsEdit:boolean = false;
    token: string = localStorage['token'] || sessionStorage['token'];
    userProfile: any;
  constructor(private formService: FormService,
              private route: ActivatedRoute,
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
                            console.log(userProfile);

                            this.userProfile = userProfile;
                            console.log(this.userProfile);
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
        .subscribe(
            user => {
                console.log(user);
                
            },
            err => {
                console.log('Error',err);
                
            }
        );
    }
//   closeUserProfile(): void {
//     this.formService.closeUserProfile();
// }
}
