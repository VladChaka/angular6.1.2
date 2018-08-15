let Core = require("../util/dataCore").Core;

LibraryDataService.$inject = ['app.libraryRepository'];
Core.module('app').service('app.libraryDataService', LibraryDataService);

function LibraryDataService (libraryRepository) {
    let self = this;

    self.take = () => {
        return new Promise((resolve, reject) => {
            if (checkEmptyField()) {
                reject({ message: "Fields empty.", status: 400 });
                return;
            }
            libraryRepository.take()
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });
    }

    self.return = () => {
        return new Promise((resolve, reject) => {
            libraryRepository.return()
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });
    }

    function checkEmptyField() {
        let result = false;

        let field = Zone.current.data.bookname;
        field = field.replace(/\s*/g, '');
        
        if (field === "") result = true
        
        return result;
    }
}