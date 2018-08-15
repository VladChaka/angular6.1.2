import { Component, OnInit } from '@angular/core';

import { FormService } from '../../service/form.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(protected formService: FormService) { }

  ngOnInit() {
  }

  closeUserProfile(): void {
    this.formService.closeUserProfile();
}

}
