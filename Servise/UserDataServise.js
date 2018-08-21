let Core = require("../util/dataCore").Core;

UserDataServise.$inject = ['app.userRepository', 'app.libraryRepository'];
Core.module('app').service('app.userDataServise', UserDataServise);

function UserDataServise (userRepository, libraryRepository) {
    let self = this;

    self.login = userData => {
        return new Promise((resolve, reject) => {
            userRepository.login(userData)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });
    }

    self.findAll = username => {
        return new Promise((resolve, reject) => {
            userRepository.getAll(username)
            .then(result => { resolve(result) })
            .catch(err => { reject(err); });
        });
    }

    self.findOne = id => {
        return new Promise((resolve, reject) => {
            userRepository.getOne('_id', id)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });	
    }

    self.add = userData => {
        return new Promise((resolve, reject) => {
            if (checkEmptyField(userData)) {
                reject({ message: "Fields empty.", status: 400 });
                return;
            }
            if (!checkRegExpEmail(userData.email)) {
                reject({ message: "Incorrect email.", status: 400 });
                return;
            }
            if (!checkRegExpLogin(userData.username)) {
                reject({ message: "Incorrect login.", status: 400 });
                return;
            }
            if (!checkRegExpPassword(userData.password)) {
                resolve({ message: "Incorrect password.", status: 400 });
                return;
            }

            userRepository.add(userData)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });
    }

    self.update = userData => {
        return new Promise((resolve, reject) => {
            let user = delEmptyFieldForUpdate(userData);

            if (user.password !== undefined && !checkRegExpPassword(user.password)) {
                reject({ message: "Incorrect password.", status: 400 });
                return;
            }
            if (user.email !== undefined && !checkRegExpEmail(user.email)) {
                reject({ message: "Incorrect email.", status: 400 });
                return;
            }
            if (user.username !== undefined && !checkRegExpLogin(user.username)) {
                reject({ message: "Incorrect login.", status: 400 });
                return;
            }

            userRepository.update(user)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });
    }

    self.upadtePhoto = (pathToPhoto, username) => {
        return new Promise((resolve, reject) => {
            userRepository.updatePhoto(pathToPhoto, username)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });	
    }

    self.delete = userData => {
        return new Promise((resolve, reject) => {
            userRepository.delete(userData)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });	
    }

    self.getBooks = id => {
        return new Promise((resolve, reject) => {
            userRepository.getBooks(id)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });
    }

    self.takeBook = id => {
        return new Promise((resolve, reject) => {
            libraryRepository.getOne(id.bookId)
            .then(book => {
                userRepository.takeBook(id, book)
                .then(result => {
                    libraryRepository.take(id.bookId)
                    .then(() => resolve(result))
                    .catch(err => reject(err));
                })
                .catch(err => reject(err));
            })
            .catch(err => reject(err));
        });	
    }

    self.returnBook = userData => {
        return new Promise((resolve, reject) => {
            libraryRepository.getOne(userData.bookId)
            .then(book => {
                userRepository.returnBook(userData, book)
                .then(result => {
                    libraryRepository.return(userData.bookId)
                    .then(() => resolve(result))
                    .catch(err => reject(err));
                })
                .catch(err => reject(err));
            })
            .catch(err => reject(err));
        });	
    }

    function checkEmptyField(userData) {
        let result = false;

        for (let index in userData) {
            let field = userData[index] + '';   
            field = field.replace(/\s*/g, '');

            if (field === "") {
                result = true;
                break;
            }
        }

        return result;
    }

    function delEmptyFieldForUpdate(userData) {
        let result = userData;

        for (let index in result) {
            let field = result[index] + ''; 
            field = field.replace(/\s*/g, '');
    
            if (field === "") delete result[index];
        }

        return result;
    }
    function checkRegExpLogin(login) { return /^[a-zA-Z1-9].{4,16}$/.test(login); }
    function checkRegExpPassword(pass) { return /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/.test(pass) && pass.length > 7; }
    function checkRegExpEmail(email) { return /(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/.test(email); }	
}