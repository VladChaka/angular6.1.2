define(['common', 'tokenInterceptor'], function() {
        var mainRemoteService = angular.module("usersApp.commonModule");

        mainRemoteService.service('usersApp.service.remote', RemoteService);

        RemoteService.$inject = ['$resource'];

        function RemoteService($resource) {
            var self = this;

            self.auth = $resource('/login');
			self.getAll = $resource('/users');
			self.create = $resource('/users');
			self.delete = $resource('/users/:userId', { userId: '@id' });
			self.getById = $resource('/users/:userId', { userId: '@id' });
			self.update = $resource('/users/:id', { id: '@id' }, { update: { method: 'PUT' }});
        }
});
