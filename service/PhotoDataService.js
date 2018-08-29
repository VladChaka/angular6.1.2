const Core = require("../repository/core/dataCore").Core,
      path = require('path');

PhotoDataService.$inject = ['app.userRepository', 'app.libraryRepository'];
Core.module('app').service('app.photoDataService', PhotoDataService);

function PhotoDataService (userRepository, libraryRepository) {
    const self = this;
    
    self.getPhoto = data => {
        const userOrBook = data.user ? 'users' : 'books',
              repository = data.user ? userRepository : libraryRepository;
           
        return repository.getOne(data)
            .then(result => path.join(__dirname, '..', 'uploads', userOrBook, result.photo));
    }

    self.upadtePhoto = data => {
        const userOrBook  = data.user ? 'users' : 'books',
              repository  = data.user ? userRepository : libraryRepository,
              photoName   = `${data.id}.${data.photo.name}`,
              pathToPhoto = path.join(__dirname, '..', 'uploads', userOrBook, photoName);
        
        return data.photo.mv(pathToPhoto)
            .then(() => { return repository.updatePhoto(data, photoName) });
    }
}