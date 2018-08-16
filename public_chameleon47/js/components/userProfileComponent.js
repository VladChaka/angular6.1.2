define(function () {
    let userProfile = {
        templateUrl: 'includes/UserProfile.html',
        controllerAs: 'uc',
        bindings: {
            emailConflict: '=',
            closeUserProfile: '<',
            userProfile: '=',
            editUser: '<',
        }
    };

    return function (module) {
        module.component('userProfile', userProfile)
    }
});
