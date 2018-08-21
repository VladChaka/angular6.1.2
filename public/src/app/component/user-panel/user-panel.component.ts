import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {Users} from "../../model/users";
import {UserService} from "../../service/user.service";
import { Router } from '@angular/router';

@Component({
    selector: 'user-panel',
    templateUrl: './user-panel.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent implements OnInit{
    router: string;
    users: Users[];
    countUsers: number;
    token: string = localStorage['token'] || sessionStorage['token'];
    filterByDate: boolean = true;
    filterByRating: boolean = false;
    showUserProfile: boolean;
    currentPage: number = 1;
    numberOfPages: number = 1;
    pageSize: number = 18;

    // @Input() user: string;
    // @Input() filterByDate: string;
    // @Input() filterByRating: string;

    constructor(private userService: UserService, private _router: Router) {
        this.router = _router.url;
    }

    ngOnInit() {
        this.getUsers();
    }
    getUsers(): void {
        this.userService.getAll(this.token)
            .subscribe(
                users => {
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
