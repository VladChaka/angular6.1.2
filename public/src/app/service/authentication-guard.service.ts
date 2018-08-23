
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
        let a = state.url;
        console.log(a.split('/')[3]);

        if (state.url === '/dashboard/users' && role !== 'Administrator') {
            // if ((state.url === '/dashboard/users' || state.url !== '/dashboard/users/') && role !== 'Administrator') {
            this.router.navigate(['404']);
        }

        return true;
    }
}
