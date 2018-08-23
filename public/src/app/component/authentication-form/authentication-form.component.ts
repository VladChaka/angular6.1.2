import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AuthenticationService } from '../../service/authentication.service';
import * as myGlobals from '../../model/globals';

@Component({
  selector: 'authentication-form',
  templateUrl: './authentication-form.component.html'
})

export class AuthenticationFormComponent {
    myId: string;
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    login(login: string, pass: string, checked: boolean): void {
        let self = this;
        this.authenticationService.authentication({
            username: login,
            password: pass
        })
        .subscribe(
            data => {
                this.authenticationService.userAuthentication = true;
                if (checked) {
                    // myGlobals.role = data.admin;
                    localStorage.setItem('token', data.token);
                } else {
                    sessionStorage.setItem('role', data.admin);
                    sessionStorage.setItem('token', data.token);
                }
                // let navigationExtras: NavigationExtras = {
                //     queryParams: {
                //         myId: ''
                //     }
                // };
                this.router.navigate(['dashboard']);
            },
            err => {
                this.authenticationService.loginError = true;
                setTimeout(function () {
                    self.authenticationService.loginError = false;
                }, 4000);
            }
        );
    };

}
