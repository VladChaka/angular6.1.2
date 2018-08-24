define(['mainService'], function() {
    var common = angular.module("usersApp.commonModule");

    common.factory('tokenInterceptor', tokenInterceptor);

    tokenInterceptor.$inject = ['usersApp.service.token'];

    function tokenInterceptor(TokenService) {
        return {
            'request': function(config) {
                config.params = { token: TokenService.getToken() };
                return config;
            },
            'response': function(response) {
                return response;
            }
        };
    }

    common.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('tokenInterceptor');
    }]);

});
