
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    canActivate(route, state) {
        let role = localStorage['role'] || sessionStorage['role'],
            test = state.url.split('/')[1];
            
        if (!this.authenticationService.isLogged()) {
            this.router.navigate(['login']);
        }

        if (!this.authenticationService.isLogged()) {
            this.router.navigate(['login']);
        }

        if (test === 'admin' && role !== 'Administrator') {
            this.router.navigate(['404']);
        }

        return true;
    }
}
