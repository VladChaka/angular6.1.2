let Core = require("../util/dataCore").Core,
    path = require('path');

PhotoDataService.$inject = ['app.userRepository', 'app.libraryRepository'];
Core.module('app').service('app.photoDataService', PhotoDataService);

function PhotoDataService (userRepository, libraryRepository) {
    let self = this;
    
    self.getPhoto = data => {
        return new Promise((resolve, reject) => {
            let pathToPhoto,
                repository = data.user ? userRepository : libraryRepository;
            
            if (data.user) {                
                repository.getOne('_id', data.id)
                .then(user => {                    
                    pathToPhoto = path.join(__dirname, '..', 'uploads', 'users', user.photo);
                    resolve(pathToPhoto);
                })
                .catch(err => reject(err));
            } else {
                repository.getOne(data.id)
                .then(book => {
                    pathToPhoto = path.join(__dirname, '..', 'uploads', 'books', book.photo);
                    resolve(pathToPhoto);
                })
                .catch(err => reject(err));
            }
        });
    }

    self.upadtePhoto = data => {
        return new Promise((resolve, reject) => {
            let pathToPhoto = path.join(__dirname, '..', 'tmp', data.who, `${data.name}.${photo.name}`);
            photo.mv(pathToPhoto)
            .then(() => {
                if (data.user) {
                    userRepository.updatePhoto(data)
                    .then(result => resolve(result))
                    .catch(err => reject(err));
                } else {
                    libraryRepository.updatePhoto(data)
                    .then(result => resolve(result))
                    .catch(err => reject(err));
                }
            })
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }
}