define(['angular', 'mainComponent', 'mainService', 'mainFilter', 'mainDirective', 'domReady!'], function(){
    var usersApp = angular.module("usersApp", ['usersApp.commonModule']);

    usersApp.controller('usersController', usersController);

    usersController.$inject = [
        'usersApp.service.token',
        'usersApp.service.users',
        'usersApp.service.authentication',
        '$timeout'
    ];

    function usersController(tokenService, usersService, authentication, $timeout) {
        var uc = this;
        uc.btnText = 'Enter';
        uc.title = 'hi';
        uc.userAuthorized = null;
        uc.showUserProfile = false;
        uc.showFormAddUser = false;
        uc.currentPage = 1;
        uc.pageSize = 15;

        uc.closeFormAddUser = function(){
            uc.showFormAddUser = false;
            uc.emailConflict = false;
            uc.loginConflict = false;
            uc.formAddUser = {};
        };

        uc.addUser = function() {
            usersService.addUser(uc.formAddUser, function(response) {
                if (response.status === 500) {
                    let errorType = response.data.error.split("$")[1].split('_')[0];
                    if (errorType === "username") {
                        uc.emailConflict = false;
                        uc.loginConflict = true;
                    } else if (errorType === "email") {
                        uc.emailConflict = true;
                        uc.loginConflict = false;
                    }
                } else {
                    refreshUsers();
                    uc.closeFormAddUser();
                    uc.showFormAddUser = false;
                }
            });
        };

        function refreshUsers() {
            usersService.getAllUsers().then(function(users) {
                uc.users = users;

                uc.users.map((element) => {
                    let date = element.regDate * 1,
                        newDate = new Date(date),
                        day = newDate.getDate(),
                        month = newDate.getMonth() + 1,
                        year = newDate.getFullYear();

                        element.regDate = day + '.' + month + '.' + year;
                })
                               
                uc.numberOfPages = Math.ceil(uc.users.length / uc.pageSize);
            })
        }

        uc.login = function() {
                authentication.authentication(uc.authenticationLogin, uc.authenticationPass, function (response) {
                    if (response.status === 400) {
                        uc.loginError = true;
                        $timeout(function () {
                            uc.loginError = false
                        }, 4000)
                    } else {
                        localStorage['login'] = uc.authenticationLogin;
                        localStorage['pass'] = uc.authenticationPass;
                        refreshUsers();
                        tokenService.setToken(response.token);
                        uc.userAuthorized = true;
                    }
                });
        };

        (function autoLogin() {
            if (localStorage['login'] !== undefined && localStorage['pass']!== undefined) {
                authentication.authentication(localStorage['login'], localStorage['pass'], function (response) {
                    if (response.status !== 400) {
                        refreshUsers();
                        tokenService.setToken(response.token);
                        uc.userAuthorized = true;
                    } else {
                        uc.userAuthorized = false
                    }
                });
            } else {uc.userAuthorized = false}
        })();

        uc.logout = function() {
            delete localStorage['login'];
            delete localStorage['pass'];
            uc.users = undefined;
            tokenService.setToken(null);
            uc.userAuthorized = false;
        };

        uc.openUserProfile = function(userId) {
            usersService.getOneUser(userId, function(userInfo) {
                uc.userProfile = userInfo;
                uc.showUserProfile = true;
            });
        };

        uc.closeUserProfile = function(){
            uc.showUserProfile = false;
            uc.emailConflict = false;
        };

        uc.deleteUser = function(userId) {
            usersService.deleteUser(userId).then(function () {
                refreshUsers();
            })
        };

        uc.editUser = function() {
            var user = {
                id: uc.userProfile._id,
                email: uc.userProfile.email,
                post: uc.userProfile.post,
                phone: uc.userProfile.phone,
                fullname: uc.userProfile.fullname
            };

			if (uc.userProfile.password !== undefined && uc.userProfile.password.length !== 0) {
                user.password = uc.userProfile.password;
			}

            usersService.editUser(user, function(response) {
                    if (response.status === 500) {
                        uc.emailConflict = true;
                    } else {
                        refreshUsers();
                        uc.closeUserProfile();
                    }
            });
        };
    }
});