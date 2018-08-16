define([
        'angular',
        'common',
        'components/authorizationFormComponent',
        'components/formAddUserComponent',
        'components/profileControlPanelComponent',
        'components/userProfileComponent'],
    function () {
        angular.forEach(arguments, function (component) {
            if (angular.isFunction(component)) {
                component(angular.module('usersApp.commonModule'));
            }
        });
    });