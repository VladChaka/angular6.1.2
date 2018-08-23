
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {

    constructor(
        protected authenticationService: AuthenticationService,
        protected router: Router
    ) { }

    canActivate(route, state) {
        if (!this.authenticationService.isLogged()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
