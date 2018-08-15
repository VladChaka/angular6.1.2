import { Component, OnInit } from '@angular/core';


import { MainPageComponent } from '../main-page/main-page.component';

import { UserService } from '../../service/user.service';
import { FormService } from '../../service/form.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'profile-control-panel',
  templateUrl: './profile-control-panel.component.html',
  styleUrls: ['./profile-control-panel.component.css']
})
export class ProfileControlPanelComponent {

    data: any;

    delUser: any;

    constructor(
        protected userService: UserService,
        protected formService: FormService,
        protected tokenService: TokenService
    ) {}
    
    openUserProfile(): void {
        this.formService.openUserProfile();
    }
    
    openLibraryCard(): void {
        this.formService.openLibraryCard();
    }

    deleteUser(id: any): void {
        console.log(id);
        console.log(this.delUser);
        
        // this.userService.delete("123", this.tokenService.getToken());
    }
 }
