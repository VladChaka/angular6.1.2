let Core = require("../util/dataCore").Core;

UserDataServise.$inject = ['app.userRepository', 'app.libraryRepository'];
Core.module('app').service('app.userDataServise', UserDataServise);

function UserDataServise (userRepository, libraryRepository) {
    let self = this;

    self.login = data => {
        return new Promise((resolve, reject) => {
            userRepository.login(data)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });
    }

    self.findAll = login => {        
        return new Promise((resolve, reject) => {
            userRepository.findAll(login)
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

    self.add = data => {
        return new Promise((resolve, reject) => {
            if (checkEmptyField(data)) {
                reject({ message: "Fields empty.", status: 400 });
                return;
            }
            if (!checkRegExpEmail(data.email)) {
                reject({ message: "Incorrect email.", status: 400 });
                return;
            }
            if (!checkRegExpLogin(data.username)) {
                reject({ message: "Incorrect login.", status: 400 });
                return;
            }
            if (!checkRegExpPassword(data.password)) {
                resolve({ message: "Incorrect password.", status: 400 });
                return;
            }

            userRepository.add(data)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });
    }

    self.update = data => {
        return new Promise((resolve, reject) => {
            let user = delEmptyFieldForUpdate(data);

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

    self.delete = data => {
        return new Promise((resolve, reject) => {
            userRepository.delete(data)
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

    self.returnBook = data => {
        return new Promise((resolve, reject) => {
            libraryRepository.getOne(data.bookId)
            .then(book => {
                userRepository.returnBook(data, book)
                .then(result => {
                    libraryRepository.return(data.bookId)
                    .then(() => resolve(result))
                    .catch(err => reject(err));
                })
                .catch(err => reject(err));
            })
            .catch(err => reject(err));
        });	
    }

    function checkEmptyField(data) {
        let result = false;

        for (let index in data) {
            let field = data[index] + '';   
            field = field.replace(/\s*/g, '');

            if (field === "") {
                result = true;
                break;
            }
        }

        return result;
    }

    function delEmptyFieldForUpdate(data) {
        let result = data;

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