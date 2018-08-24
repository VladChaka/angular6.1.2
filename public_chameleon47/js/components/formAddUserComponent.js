define(function () {
    var formAddUser = {
        templateUrl: 'includes/FormAddUser.html',
        controllerAs: 'uc',
        bindings: {
            emailConflict: '=',
            loginConflict: '=',
            closeFormAddUser: '<',
            addUser: '<',
            formAddUser: '='
        }
    };

    return function (module) {
        module.component('formAddUser', formAddUser)
    }
});