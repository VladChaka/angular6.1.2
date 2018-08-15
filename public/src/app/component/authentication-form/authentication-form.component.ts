import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../service/authentication.service';
import { RemoteService } from '../../service/remote.service';

@Component({
  selector: 'authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css']
})



export class AuthenticationFormComponent implements OnInit {
    btnText: string = 'Enter';

    constructor(
        protected remoteService: RemoteService,
        protected authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.authenticationService.isAuthentication();
    }

    login(login, pass): void {
        this.authenticationService.authentication({
            username: login,
            password: pass
        })
        .subscribe(
            data => {
                this.authenticationService.userAuthentication = true;
                localStorage.setItem('token', data.token);
            },
            err => {
                this.authenticationService.loginError = true;
                setTimeout(function () {
                    this.authenticationService.loginError = false;
                }, 4000);
            }
        );
    };

}
