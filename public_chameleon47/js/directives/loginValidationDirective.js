
define(function () {
    function loginValidation() {
        var isValid = function (s) {
            return s && /^[a-zA-Z0-9]*$/.test(s);
        };

        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModelCtrl) {
                ngModelCtrl.$parsers.unshift(function (viewValue) {
                    ngModelCtrl.$setValidity('correctLogin', isValid(viewValue));
                    return viewValue;
                });
                ngModelCtrl.$formatters.unshift(function (modelValue) {
                    ngModelCtrl.$setValidity('correctLogin', isValid(modelValue));
                    return modelValue;
                });
            }
        }
    }

    return function (module) {
        module.directive('loginValidation', loginValidation)
    }
});