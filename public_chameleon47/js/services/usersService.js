define(['remoteService'], function(){
    UsersService.$inject = ['usersApp.service.remote', 'usersApp.service.token'];

    function UsersService(remoteService, tokenService) {
       var self = this;

       self.deleteUser = function(id) {
           return remoteService.delete.delete({userId: id}).$promise;
       };

       self.addUser = function(user, callback) {
           remoteService.create.save(user,
               function(response) {
                   callback(response);
               },
               function(error) {
                   callback(error);
               });
       };

       self.editUser = function(user, callback) {
           remoteService.update.update(user, function(response) {               
               callback(response);
           }, function(error) {
               callback(error);
           });
       };

       self.getOneUser = function(id, callback) {
           remoteService.getById.get({ userId: id }, function(user) {
               callback(user);
           });
       };

       self.getAllUsers = function() {
           return remoteService.getAll.query().$promise;
       }
    }

    return function (module) {
        module.service('usersApp.service.users', UsersService)
    }
});