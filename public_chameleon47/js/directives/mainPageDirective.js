
define(function () {
    function mainPage() {
        return {
            templateUrl: 'includes/mainPage.html',
            restrict: 'E'
        }
    }

    return function (module) {
        module.directive('mainPage', mainPage)
    }
});