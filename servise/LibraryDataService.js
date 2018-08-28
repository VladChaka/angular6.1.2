const Core = require("../repository/core/dataCore").Core;

LibraryDataService.$inject = ['app.libraryRepository'];
Core.module('app').service('app.libraryDataService', LibraryDataService);

function LibraryDataService (libraryRepository) {
    const self = this;

    self.getAll       = ()   => { return libraryRepository.getAll(); }
    self.getOne       = id   => { return libraryRepository.getOne(id); }
    self.delete       = data   => { return libraryRepository.delete(data); }
    self.add          = data => { return libraryRepository.add(data); }
    self.update       = data => { return libraryRepository.update(data); }
    self.getUserBooks = data => { return libraryRepository.getUserBooks(data); }
    self.takeBook     = data => { return libraryRepository.takeBook(data); }
    self.returnBook   = data => { return libraryRepository.returnBook(data); }
    
    self.test   = data => { return libraryRepository.test(data); }
}