
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
        let role = localStorage['role'] || sessionStorage['role'];
        if (!this.authenticationService.isLogged()) {
            this.router.navigate(['login']);
            return false;
        }
        if (!this.authenticationService.isLogged()) {
            this.router.navigate(['login']);
            return false;
        }
        if (state.url === '/dashboard/users' && role !== 'Administrator') {
            this.router.navigate(['404']);
        }

        return true;
    }
}
