import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'authentication-form',
  templateUrl: './authentication-form.component.html'
})

export class AuthenticationFormComponent {
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
                    localStorage.setItem('role', data.role);
                    localStorage.setItem('token', data.token);
                } else {
                    sessionStorage.setItem('role', data.role);
                    sessionStorage.setItem('token', data.token);
                }
                if(data.role == 'Administrator'){
                    this.router.navigate(['admin']);
                } else{
                    this.router.navigate(['dashboard/books']);
                }
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
