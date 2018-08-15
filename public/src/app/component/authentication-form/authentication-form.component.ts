import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css']
})



export class AuthenticationFormComponent implements OnInit {
    btnText: string = 'Enter';
    input;

    constructor(
        protected authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
    }

    login(login: string, pass: string, checked: boolean): void {
        var self = this;
        
        this.authenticationService.authentication({
            username: login,
            password: pass
        })
        .subscribe(
            data => {
                this.authenticationService.userAuthentication = true;
                if (checked) {
                    localStorage.setItem('token', data.token);
                } else {
                    sessionStorage.setItem('token', data.token);
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
