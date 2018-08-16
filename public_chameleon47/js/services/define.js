define([
    'common',
    'services/usersService',
    'services/tokenService',
    'services/authenticationService'],
    function () {
        angular.forEach(arguments, function (service) {
            if (angular.isFunction(service)) {
                service(angular.module('usersApp.commonModule'));
            }
        });
    });