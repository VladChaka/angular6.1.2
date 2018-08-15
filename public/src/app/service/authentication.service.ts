import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RemoteService } from './remote.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    userAuthentication: any = false;
    loginError: boolean = false;

    constructor(
        protected remoteService: RemoteService
    ) { }

    authentication(authenticationInfo): Observable<any> {
        return this.remoteService.authentication(authenticationInfo);
    }

    logout(): void {
        sessionStorage.clear();
        localStorage.clear();
        this.userAuthentication = false;
    }
}