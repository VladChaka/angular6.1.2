let Core = require("../util/dataCore").Core,
    path = require('path');

PhotoDataService.$inject = ['app.userRepository', 'app.libraryRepository'];
Core.module('app').service('app.photoDataService', PhotoDataService);

function PhotoDataService (userRepository, libraryRepository) {
    let self = this;
    
    self.getPhoto = data => {
        let pathToPhoto,
            repository = data.user ? userRepository : libraryRepository,
            test = data.user ? 'users' : 'books';
           
        return repository.getOne(data.id)
            .then(result => pathToPhoto = path.join(__dirname, '..', 'uploads', test, result.photo));
    }

    self.upadtePhoto = data => {
        let pathToPhoto = path.join(__dirname, '..', 'tmp', data.who, `${data.name}.${data.photo.name}`),
            repository = data.user ? userRepository : libraryRepository;

        data.photo.mv(pathToPhoto)
            .then(() => {
                return repository.updatePhoto(data.id)
                    .then(user => pathToPhoto = path.join(__dirname, '..', 'uploads', 'users', user.photo));
            }
        );
    }
}