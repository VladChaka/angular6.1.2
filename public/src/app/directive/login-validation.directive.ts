import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLoginValidation]'
})
export class LoginValidationDirective {

    constructor(el: ElementRef) {

    }

    private isValid(s) {
        return s && /^[a-zA-Z0-9]*$/.test(s);
    };

    // return {
    //     link: function (scope, elm, attrs, ngModelCtrl) {
    //         ngModelCtrl.$parsers.unshift(function (viewValue) {
    //             ngModelCtrl.$setValidity('correctLogin', isValid(viewValue));
    //             return viewValue;
    //         });
    //         ngModelCtrl.$formatters.unshift(function (modelValue) {
    //             ngModelCtrl.$setValidity('correctLogin', isValid(modelValue));
    //             return modelValue;
    //         });
    //     }
    // }

}
