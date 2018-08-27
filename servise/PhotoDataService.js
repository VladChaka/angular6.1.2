let Core = require("../repository/core/dataCore").Core,
    path = require('path');

PhotoDataService.$inject = ['app.userRepository', 'app.libraryRepository'];
Core.module('app').service('app.photoDataService', PhotoDataService);

function PhotoDataService (userRepository, libraryRepository) {
    let self = this;
    
    self.getPhoto = data => {
        let pathToPhoto,
            repository = data.user ? userRepository : libraryRepository,
            userOrBook = data.user ? 'users' : 'books';
           
        return repository.getOne(data.id)
            .then(result => pathToPhoto = path.join(__dirname, '..', 'uploads', userOrBook, result.photo));
    }

    self.upadtePhoto = data => {
        let userOrBook = data.user ? 'users' : 'books',
            repository = data.user ? userRepository : libraryRepository,
            photoName = `${data.id}.${data.photo.name}`,
            pathToPhoto = path.join(__dirname, '..', 'uploads', userOrBook, photoName);
        
        return data.photo.mv(pathToPhoto)
            .then(() => { return repository.updatePhoto(data.id, photoName) });
    }
}