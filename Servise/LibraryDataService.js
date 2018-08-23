let Core = require("../util/dataCore").Core;

LibraryDataService.$inject = ['app.libraryRepository'];
Core.module('app').service('app.libraryDataService', LibraryDataService);

function LibraryDataService (libraryRepository) {
    let self = this;

    self.getAll = () => {
        return new Promise((resolve, reject) => {
            libraryRepository.getAll()
            .then(result => resolve(result))
            .catch(err => reject(err));
        });
    }

    self.getOne = id => {
        return new Promise((resolve, reject) => {
            libraryRepository.getOne(id)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });
    }

    self.add = data => {
        return new Promise((resolve, reject) => {
            libraryRepository.add(data)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });
    }

    self.update = data => {
        return new Promise((resolve, reject) => {
            libraryRepository.update(data)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });
    }

    self.getUserBooks = id => {
        return new Promise((resolve, reject) => {            
            libraryRepository.getUserBooks(id)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });
    }

    self.takeBook = data => {
        return new Promise((resolve, reject) => {
            libraryRepository.takeBook(data)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });	
    }

    self.returnBook = data => {
        return new Promise((resolve, reject) => {
            libraryRepository.returnBook(data)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });	
    }
}