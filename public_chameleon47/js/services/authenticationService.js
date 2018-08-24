define(['remoteService'], function () {
    Authentication.$inject = ['usersApp.service.remote'];

    function Authentication(remoteService) {
        this.authentication = function(login, pass, callback) {
            var authenticationInfo = {
                username: login,
                password: pass
            };

            remoteService.auth.save(authenticationInfo, function(response) {
                    callback(response);
                },
                function(err) {
                    callback(err.data);
                });
        }
    }

    return function (module) {
        module.service('usersApp.service.authentication', Authentication)
    }
});