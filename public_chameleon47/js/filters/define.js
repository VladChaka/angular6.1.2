define([
    'angular',
    'common',
    'filters/reverseFilter',
    'filters/startFromFilter'],
    function () {
    angular.forEach(arguments, function (filter) {
        if (angular.isFunction(filter)) {
            filter(angular.module('usersApp.commonModule'));
        }
    });
});