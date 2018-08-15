import { Component, OnInit } from '@angular/core';

import { FormService } from '../../service/form.service';

@Component({
    selector: 'form-add-user',
    templateUrl: './form-add-user.component.html',
    styleUrls: ['./form-add-user.component.css']
})
export class FormAddUserComponent implements OnInit {

    constructor(protected formService: FormService,) { }

    ngOnInit() {
    }

    closeFormAddUser(): void {
        this.formService.closeFormAddUser();
    }

    addUser(): void {
        // this.userService.add(this.tokenService.getToken());

      // usersService.addUser(formAddUser, function(response) {
      //   if (response.status === 500) {
      //     let errorType = response.data.error.split("$")[1].split('_')[0];
      //     if (errorType === "username") {
      //        emailConflict = false;
      //        loginConflict = true;
      //     } else if (errorType === "email") {
      //        emailConflict = true;
      //        loginConflict = false;
      //     }
      //   } else {
      //     refreshUsers();
      //      closeFormAddUser();
      //      showFormAddUser = false;
      //   }
      // });
    };

}
