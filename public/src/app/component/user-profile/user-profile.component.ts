import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../service/form.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfileBtnText  = "Edit";
   userProfile = {
     username: "Vladislav",
       email:"vlad4402@mail.com",
       fullname: "Vladislav Chaka",
       password: "vlad44478",
       phone: "5125113563",
       post:"odmen"
}
  constructor(private formService: FormService,
              private route: ActivatedRoute,
              private location: Location) {

   }

    ngOnInit(): void {
        console.log(this.location);
        console.log(this.route.params);
    }
    // goBack(): void {
    //     this.location.go('dashboard/users');
    // }
  closeUserProfile(): void {
    this.formService.closeUserProfile();
}

}
