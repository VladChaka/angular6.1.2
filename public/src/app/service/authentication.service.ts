import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RemoteService } from './remote.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    userAuthentication: any = false;
    loginError: boolean = false;

    constructor(
        protected remoteService: RemoteService,
        protected tokenService: TokenService,
        private route: Router,
    ) { }

    authentication(authenticationInfo): Observable<any> {
        return this.remoteService.authentication(authenticationInfo);
    }

    isAuthentication(): any {        
        if (localStorage['token'] !== undefined) {
            this.userAuthentication = true;
            this.route.navigate(['/users']);
        }
    }

    logout(): void {
        delete localStorage['token'];
        this.tokenService.setToken(null);
        this.userAuthentication = false;
    }
}
