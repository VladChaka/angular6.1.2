import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
// import * as myGlobals from '../../model/globals';
@Component({
  selector: 'admin-main-page',
  templateUrl: './admin-main-page.component.html'
})
export class AdminMainPageComponent implements OnInit {
    router: any;
    // myId: string = AuthenticationFormComponent.myId;
    token: string = localStorage['token'] || sessionStorage['token'];
    constructor(
        protected authenticationService: AuthenticationService,
        private route: ActivatedRoute
    ) {
    }
    ngOnInit() {
        this.router = this.route.queryParams.subscribe(params =>{
            // this.myId = params.myId;
            // console.log(this.myId)
        });
    }

    logout(): void {
        this.authenticationService.logout();
    }

}
