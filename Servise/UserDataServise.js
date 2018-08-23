let Core = require("../util/dataCore").Core;

UserDataServise.$inject = ['app.userRepository', 'app.libraryRepository'];
Core.module('app').service('app.userDataServise', UserDataServise);

function UserDataServise (userRepository, libraryRepository) {
    let self = this;

    self.login = data => {
        return userRepository.login(data);
    }

    self.findAll = login => {
        return userRepository.findAll(login);
    }

    self.findOne = id => {
        return userRepository.getOne(id);	
    }

    self.add = data => {
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

        return userRepository.add(data);
    }

    self.update = data => {
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

        return userRepository.update(user);
    }

    self.delete = data => {
        return userRepository.delete(data);	
    }

    self.getBooks = id => {
        return userRepository.getBooks(id);
    }

    self.test = () => {
        return userRepository.test();
    }

    self.takeBook = id => {
        return libraryRepository.getOne(id.bookId)
            .then(book => userRepository.takeBook(id, book))
            .then(result => {
                return libraryRepository.take(id.bookId)
                    .then(() => result);
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