const Core = require("../repository/core/dataCore").Core;

UserDataServise.$inject = ['app.userRepository'];
Core.module('app').service('app.userDataServise', UserDataServise);

function UserDataServise (userRepository) {
    const self = this;

    self.login = data => {
        return userRepository.login(data);
    }

    self.findAll = login => {
        return userRepository.findAll(login);
    }

    self.findOne = (key, data) => {
        return userRepository.getOne(key, data);	
    }

    self.add = data => {
        if (checkEmptyField(data))               { return { message: "Fields empty.", status: 400 }; }
        if (!checkRegExpEmail(data.email))       { return { message: "Incorrect email.", status: 400 }; }
        if (!checkRegExpLogin(data.username))    { return { message: "Incorrect login.", status: 400 }; }
        if (!checkRegExpPassword(data.password)) { return { message: "Incorrect password.", status: 400 }; }

        return userRepository.add(data);
    }

    self.update = data => {
        let user = delEmptyFieldForUpdate(data);

        if (checkEmptyField(data)) return { message: "Fields empty.", status: 400 };
        if (user.email    !== undefined && !checkRegExpEmail(user.email))       { return { message: "Incorrect email.", status: 400 }; }
        if (user.username !== undefined && !checkRegExpLogin(user.username))    { return { message: "Incorrect login.", status: 400 }; }
        if (user.password !== undefined && !checkRegExpPassword(user.password)) { return { message: "Incorrect password.", status: 400 }; }

        return userRepository.update(user);
    }

    self.delete = id => {
        return userRepository.delete(id);	
    }

    self.getBooks = id => {
        return userRepository.getBooks(id);
    }

    self.test = () => {
        return userRepository.test();
    }

    function checkEmptyField(data) {
        let result = false;

        for (const index in data) {
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

        for (const index in result) {
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