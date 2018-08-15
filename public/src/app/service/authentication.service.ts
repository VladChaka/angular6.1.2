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
        let token = localStorage['token'] || sessionStorage['token'];
        if (token !== undefined) {
            
            this.remoteService.tokenValid(token)
            .subscribe(
                data => {
                    this.userAuthentication = true;
                    this.route.navigate(['/users']);
                },
                err => this.route.navigate(['/'])               
            );
        } else {
            this.route.navigate(['/']);
        }
    }

    logout(): void {
        sessionStorage.clear();
        localStorage.clear();
        this.userAuthentication = false;
    }
}
