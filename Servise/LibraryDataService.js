let Core = require("../util/dataCore").Core;

LibraryDataService.$inject = ['app.libraryRepository'];
Core.module('app').service('app.libraryDataService', LibraryDataService);

function LibraryDataService (libraryRepository) {
    let self = this;

    self.getAll = () => {
        return libraryRepository.getAll();
    }

    self.getOne = id => {
        return libraryRepository.getOne(id);
    }

    self.add = data => {
        return libraryRepository.add(data);
    }

    self.update = data => {
        return libraryRepository.update(data);
    }

    self.delete = id => {
        return libraryRepository.delete(id);
    }

    self.getUserBooks = id => {
        return libraryRepository.getUserBooks(id);
    }

    self.takeBook = data => {
        return libraryRepository.takeBook(data);	
    }

    self.returnBook = data => {
        return libraryRepository.returnBook(data);	
    }
}