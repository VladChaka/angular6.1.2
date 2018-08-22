import { Component, OnInit} from '@angular/core';
import {Users} from "../../model/users";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'users-panel',
  templateUrl: './users-panel.component.html'
})

export class UsersPanelComponent implements OnInit{
    users: Users[];
    token: string = localStorage['token'] || sessionStorage['token'];
    filterByDate: boolean = true;
    filterByRating: boolean = false;
    currentPage: number = 1;
    pageSize: number = 20;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
}
getUsers(): void {
    this.userService.getAll(this.token)
        .subscribe(
            users => {
                this.users = users.slice().reverse();
                this.convertDate(this.users);
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
