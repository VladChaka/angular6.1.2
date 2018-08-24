({
    baseUrl: "js",
    out: 'js/main.js',
    include: [
        '../node_modules/requirejs/require.js',
        'config',
        'app',
        '../node_modules/requirejs-domready/domReady',
        '../node_modules/angular/angular.min',
        '../node_modules/angular-resource/angular-resource',
        'controllers/usersController',
        'services/usersService',
        'services/tokenService',
        'services/authenticationService',
        'remoteservices/remoteService',
        'filters/reverseFilter',
        'filters/startFromFilter',
        'controllers/usersController',
        'components/authorizationFormComponent',
        'components/formAddUserComponent',
        'components/profileControlPanelComponent',
        'components/userProfileComponent',
        'directives/mainPageDirective',
        'directives/telValidationDirective',
        'directives/loginValidationDirective',
        'directives/nameValidationDirective',
        'directives/strongPassRequiredDirective'
    ]
})