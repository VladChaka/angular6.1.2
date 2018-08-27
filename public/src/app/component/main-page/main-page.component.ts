import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {
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