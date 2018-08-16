import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { RemoteService } from './remote.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {

    token: string = localStorage['token'] || sessionStorage['token'];

    constructor(
        protected authenticationService: AuthenticationService,
        protected remoteService: RemoteService,
        protected router: Router
    ) { }

    // canActivate(): any {

    //     let route = this.router.url;
    //     console.log(route);
    //     if (this.token !== undefined) {       
    //         this.remoteService.tokenValid(this.token)
    //         .subscribe(
    //             () => {
    //                 console.log(route);
                    
    //                 this.authenticationService.userAuthentication = true;
    //                 return true;
    //             },
    //             () => {
    //                 console.log('error');
    //                 return false;
    //             }
    //         );
    //     } 
    // }
}
