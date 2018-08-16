define(function () {
    function passValidation() {
        var isValid = function (s) {
            return s && /\D/.test(s) && /\d/.test(s);
        };
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModelCtrl) {
                ngModelCtrl.$parsers.unshift(function (viewValue) {
                    ngModelCtrl.$setValidity('strongPass', isValid(viewValue));
                    return viewValue;
                });
                ngModelCtrl.$formatters.unshift(function (modelValue) {
                    ngModelCtrl.$setValidity('strongPass', isValid(modelValue));
                    return modelValue;
                });
            }
        }
    }

    return function (module) {
        module.directive('passValidation', passValidation)
    }
});