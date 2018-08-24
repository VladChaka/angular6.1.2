import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { RemoteService } from './remote.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    token: any = localStorage['token'] || sessionStorage['token'];
    role: string = localStorage['token'] || sessionStorage['token'];
    userAuthentication: any = this.token === undefined ? false : true;
    loginError: boolean = false;
    myId: string;

    constructor(
        protected remoteService: RemoteService,
        protected router: Router
    ) { }

    authentication(authenticationInfo): Observable<any> {
        return this.remoteService.authentication(authenticationInfo);
    }

    getMyId(): any {
        return this.myId;
    }

    isLogged(): Observable<any> {
        return this.userAuthentication;
    }

    logout(): void {
        sessionStorage.clear();
        localStorage.clear();
        console.log(sessionStorage);
        console.log(localStorage);
        this.userAuthentication = false;
        this.router.navigate(['/login']);
    }
}