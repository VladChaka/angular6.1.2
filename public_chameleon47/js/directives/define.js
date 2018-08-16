define([
    'angular',
    'common',
    'directives/mainPageDirective',
    'directives/loginValidationDirective',
    'directives/nameValidationDirective',
    'directives/telValidationDirective',
    'directives/strongPassRequiredDirective'],
    function () {
        angular.forEach(arguments, function (directive) {
            if (angular.isFunction(directive)) {
                directive(angular.module('usersApp.commonModule'));
            }
        });
    });