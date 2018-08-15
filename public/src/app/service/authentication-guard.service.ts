import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { RemoteService } from './remote.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    token: string = localStorage['token'] || sessionStorage['token'];

    constructor(
        protected authenticationService: AuthenticationService,
        protected remoteService: RemoteService,
        protected router: Router
    ) { }

    canActivate() {
        if (this.token === undefined) {
            this.router.navigate(['/']);
            return false;
        } else {        
            this.remoteService.tokenValid(this.token)
            .subscribe(
                () => {
                    this.authenticationService.userAuthentication = true;
                    this.router.navigate(['/users']);
                    return true;
                },
                () => {
                    this.router.navigate(['/']);
                    return false;
                }
            );
        } 
    }
}
