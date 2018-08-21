let Core = require("../util/dataCore").Core,
    path = require('path');

PhotoDataService.$inject = ['app.userRepository', 'app.libraryRepository'];
Core.module('app').service('app.photoDataService', PhotoDataService);

function PhotoDataService (userRepository, libraryRepository) {
    let self = this;

    self.getPhoto = data => {
        return new Promise((resolve, reject) => {
            let pathToPhoto;
            
            if (data.user) {                
                userRepository.getOne('_id', data.id)
                .then(user => {                    
                    pathToPhoto = path.join(__dirname, '..', 'tmp', 'users', user.photo);
                    resolve(pathToPhoto);
                })
                .catch(err => reject(err));
            } else {
                libraryRepository.getOne(data.id)
                .then(book => {
                    console.log("book",book);
                    pathToPhoto = path.join(__dirname, '..', 'tmp', 'books', book.photo);
                    resolve(pathToPhoto);
                })
                .catch(err => reject(err));
            }
        });
    }

    self.upadtePhoto = (data) => {
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
            .catch(err => reject({ error: err.message, status: 500 }));
        });
    }
}