
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
        let path = state.url;
        
                
        if (!this.authenticationService.isLogged()) {
            return false;
        }
        this.router.navigate(['dashboard']);
        return true;
    }
}
