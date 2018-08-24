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