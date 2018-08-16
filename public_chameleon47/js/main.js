require.config({
    baseUrl: "js",
    paths: {
        'common': 'common',
        'app': 'app',
        'domReady': '../node_modules/requirejs-domready/domReady',
        'angular': '../node_modules/angular/angular.min',
        'angularResource': '../node_modules/angular-resource/angular-resource',
        'usersController': 'controllers/usersController',
        'mainService': 'services/define',
        'remoteService': 'remoteservices/remoteService',
        'mainFilter': 'filters/define',
        'mainComponent': 'components/define',
        'mainDirective': 'directives/define',
        'tokenInterceptor': 'interceptors/tokenInterceptor'
    },
    shim: {
        angularResource:{
            deps: ['angular']
        }
    }
});

define([
    'require',
    'app'
], function (require) {
    require(['domReady!'], function (document) {
        angular.bootstrap(document, ['app']);
    });
});