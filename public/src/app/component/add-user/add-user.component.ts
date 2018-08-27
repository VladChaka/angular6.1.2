import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {
    formAddUser: any = {
        username: "ignat"
    };
    token: string = localStorage['token'] || sessionStorage['token'];
  constructor(private userService: UserService) { }

  ngOnInit(): void {

}
addUser(): void {    
    this.userService.add(this.formAddUser, this.token)
    .subscribe();
}
}
