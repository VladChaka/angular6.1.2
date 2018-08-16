define(function () {
    let authorizationForm = {
        template: '<form ng-hide="uc.userAuthorized"' +
        '          class="users-login"\n' +
        '          id="auth">\n' +
        '        <p>Login</p>\n' +
        '        <input type="text"\n' +
        '               ng-model="uc.authenticationLogin"\n' +
        '               placeholder="Enter your login">\n' +
        '        <p ng-hide="uc.userAuthorized">Password</p>\n' +
        '        <input type="password"\n' +
        '               ng-model="uc.authenticationPass"\n' +
        '               placeholder="Enter your pass">\n' +
        '        <span ng-if="uc.loginError">Incorrect login or password</span>\n' +
        '        <br><br><button ng-click="uc.login()">\n' +
        '            {{uc.btnText}}\n' +
        '        </button>' +
        '    </form>',
        controllerAs: 'uc',
        bindings: {
            btnText: '@',
            authenticationLogin: '=',
            authenticationPass: '=',
            login: '&',
            loginError: '=',
            userAuthorized: '='
        }
    };

    return function (module) {
        module.component('authorizationForm', authorizationForm)
    }
});
