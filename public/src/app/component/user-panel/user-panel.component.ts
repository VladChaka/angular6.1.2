import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {Router} from "@angular/router";
import { Users } from '../../model/users';
import { UserService } from '../../service/user.service';
import { AuthenticationService } from '../../service/authentication.service';
import { FormService } from '../../service/form.service';
import { RemoteService } from '../../service/remote.service';
import { TokenService } from '../../service/token.service';
@Component({
    selector: 'user-panel',
    templateUrl: './user-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent implements OnInit{
// user = {
// id: "rfawqw1rfasevq3r1",
//      username: "Vladislav",
//        email:"vlad4402@mail.com",
//        fullname: "Vladislav Chaka",
//        password: "vlad44478",
//        phone: "5125113563",
//        post:"odmen"
// }

    token: string = localStorage['token'] || sessionStorage['token'];
    users: Users[];
    pageSize: number = 18;
    currentPage: number = 1;
    numberOfPages: number = 1;
    countUsers: number;
    filterByDate: boolean = true;

    // @Input() user: string;
    // @Input() filterByDate: string;
    // @Input() filterByRating: string;

    constructor(
        private userService: UserService,
        private formService: FormService,
        private remoteService: RemoteService,
        private authenticationService: AuthenticationService,
        private router: Router) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getAll(this.token)
            .subscribe(
                users => {

                    console.log(this.token);
                    this.users = users;
                    this.convertDate(this.users);

                    this.countUsers = users.length;
                    this.numberOfPages = Math.ceil(users.length / this.pageSize);
                },
                err => console.log("err",err)
            );
    }

    convertDate(users: Users[]): void {
        users.map((element: any) => {
            let date: number = element.regDate * 1,
                newDate = new Date(date),
                day = newDate.getDate(),
                month = newDate.getMonth() + 1,
                year = newDate.getFullYear();

            element.regDate = day + '.' + month + '.' + year;
        });
    }
}
