import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AuthenticationService } from '../../service/authentication.service';

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
                console.log(data);
                this.authenticationService.userAuthentication = true;
                if (checked) {
                    localStorage.setItem('role', data.role);
                    localStorage.setItem('token', data.token);
                } else {
                    sessionStorage.setItem('role', data.role);
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
