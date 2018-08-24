import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
// import * as myGlobals from '../../model/globals';
@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {
    router: any;
    // myId: string = AuthenticationFormComponent.myId;
    token: string = localStorage['token'] || sessionStorage['token'];
    role: boolean = localStorage['role'] || sessionStorage['role'];
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