define(function () {
    function TokenService() {
        let token = null,
            self = this;

        self.setToken = function (newToken) {
            token = newToken;
        };
        self.getToken = function () {
            return token;
        }
    }

    return function (module) {
        module.service('usersApp.service.token', TokenService)
    }
});