define(function () {
    let profileControlPanel = {
        template: '<button ng-click="uc.openUserProfile()">\n' +
        '    Go to profile\n' +
        '</button>\n' +
        '<button ng-click="uc.deleteUser()" \n' +
        '        type="submit">\n' +
        '    Delete user\n' +
        '    <span>✖</span>\n' +
        '</button>',
        controllerAs: 'uc',
        bindings: {
            openUserProfile: '&',
            deleteUser: '&'
        }
    };

    return function (module) {
        module.component('profileControlPanel', profileControlPanel)
    }
});