import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
@Component({
  selector: 'admin-main-page',
  templateUrl: './admin-main-page.component.html'
})
export class AdminMainPageComponent implements OnInit {
    token: string = localStorage['token'] || sessionStorage['token'];
    constructor(
        private authenticationService: AuthenticationService
    ) {
    }
    ngOnInit() {
    }

    logout(): void {
        this.authenticationService.logout();
    }

}
