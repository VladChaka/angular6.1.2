import { Component, OnInit } from '@angular/core';
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
  constructor(protected formService: FormService, private ar: ActivatedRoute) {
  ar.params.subscribe(param => console.log(param));
   }

  ngOnInit() {
  }

  closeUserProfile(): void {
    this.formService.closeUserProfile();
}

}
