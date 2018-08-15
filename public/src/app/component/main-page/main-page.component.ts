import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Users } from '../../model/users';

import { UserService } from '../../service/user.service';
import { AuthenticationService } from '../../service/authentication.service';
import { FormService } from '../../service/form.service';
import { RemoteService } from '../../service/remote.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {

    users: Users[]; 
    countUsers: number;
    token: string = localStorage['token'] || sessionStorage['token'];

    filterByDate: boolean = true;
    showUserProfile: boolean;


    currentPage: number = 1;
    numberOfPages: number = 1;
    pageSize: number = 18;

    constructor(
        protected userService: UserService,
        private formService: FormService,
        protected remoteService: RemoteService,
        protected authenticationService: AuthenticationService,
        protected router: Router
    ) { }

    ngOnInit() {
        // if (this.token === undefined) {
            // this.router.navigate(['/login']);
        // }
        this.getUsers();
    }

    getUsers(): void {
        this.token = localStorage.getItem('token');
        
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

    openAddForm(): void {
        this.formService.openAddForm();
    }

    logout(): void {
        this.users = undefined;
        this.authenticationService.logout();
    }

    deleteUser(test): void {
        console.log(test);
    }

    

//
//   function refreshUsers() {
//     usersService.getAllUsers().then(function(users) {
//        users = users;
//
//        users.map((element) => {
//         let date = element.regDate * 1,
//           newDate = new Date(date),
//           day = newDate.getDate(),
//           month = newDate.getMonth() + 1,
//           year = newDate.getFullYear();
//
//         element.regDate = day + '.' + month + '.' + year;
//       })
//
//        numberOfPages = Math.ceil( users.length /  pageSize);
//     })
//   }
//
//    login = function() {
//     authentication.authentication( authenticationLogin,  authenticationPass, function (response) {
//       if (response.status === 400) {
//          this.authenticationService.loginError = true;
//         $timeout(function () {
//            this.authenticationService.loginError = false
//         }, 4000)
//       } else {
//         localStorage['login'] =  authenticationLogin;
//         localStorage['pass'] =  authenticationPass;
//         refreshUsers();
//         tokenService.setToken(response.token);
//          userAuthentication = true;
//       }
//     });
//   };
//
// (function autoLogin() {
//     if (localStorage['login'] !== undefined && localStorage['pass']!== undefined) {
//       authentication.authentication(localStorage['login'], localStorage['pass'], function (response) {
//         if (response.status !== 400) {
//           refreshUsers();
//           tokenService.setToken(response.token);
//            userAuthentication = true;
//         } else {
//            userAuthentication = false
//         }
//       });
//     } else { userAuthentication = false}
//   })();
//
//    logout = function() {
//     delete localStorage['login'];
//     delete localStorage['pass'];
//      users = undefined;
//     tokenService.setToken(null);
//      userAuthentication = false;
//   };
//
//    openUserProfile = function(userId) {
//     usersService.getOneUser(userId, function(userInfo) {
//        userProfile = userInfo;
//        showUserProfile = true;
//     });
//   };
//
//    closeUserProfile = function(){
//      showUserProfile = false;
//      emailConflict = false;
//   };
//
//    deleteUser = function(userId) {
//     usersService.deleteUser(userId).then(function () {
//       refreshUsers();
//     })
//   };
//
//    editUser = function() {
//     var user = {
//       id:  userProfile._id,
//       email:  userProfile.email,
//       post:  userProfile.post,
//       phone:  userProfile.phone,
//       fullname:  userProfile.fullname
//     };
//
//     if ( userProfile.password !== undefined &&  userProfile.password.length !== 0) {
//       user.password =  userProfile.password;
//     }
//
//     usersService.editUser(user, function(response) {
//       if (response.status === 500) {
//          emailConflict = true;
//       } else {
//         refreshUsers();
//          closeUserProfile();
//       }
//     });
//   };

}
