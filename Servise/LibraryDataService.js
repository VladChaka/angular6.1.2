let Core = require("../util/dataCore").Core;

LibraryDataService.$inject = ['app.libraryRepository'];
Core.module('app').service('app.libraryDataService', LibraryDataService);

function LibraryDataService (libraryRepository) {
    let self = this;

    self.getAll = () => {
        return new Promise((resolve, reject) => {
            libraryRepository.getAll()
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });
    }

    self.getOne = (book) => {
        return new Promise((resolve, reject) => {
            libraryRepository.getOne(book)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });
    }

    self.add = (bookData) => {
        return new Promise((resolve, reject) => {
            libraryRepository.add(bookData)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });
    }

    self.update = (bookData) => {
        return new Promise((resolve, reject) => {
            libraryRepository.update(bookData)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });
    }
}