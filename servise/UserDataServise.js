const Core = require("../repository/core/dataCore").Core;

UserDataServise.$inject = ['app.userRepository'];
Core.module('app').service('app.userDataServise', UserDataServise);

function UserDataServise (userRepository) {
    const self = this;

    self.login  = data  => { return userRepository.login(data); }
    self.getAll = login => { return userRepository.getAll(login); }
    self.getOne = data  => { return userRepository.getOne(data); }
    self.delete = data  => { return userRepository.delete(data); }

    self.add = data => {
        if (checkEmptyField(data)) {               return { message: "Fields empty.", status: 400 }; }
        if (!checkRegExpEmail(data.email)) {       return { message: "Incorrect email.", status: 400 }; }
        if (!checkRegExpLogin(data.username)) {    return { message: "Incorrect login.", status: 400 }; }
        if (!checkRegExpPassword(data.password)) { return { message: "Incorrect password.", status: 400 }; }

        return userRepository.add(data);
    }

    self.update = data => {
        let user = checkEmptyField(data, true);

        if (user.email    !== undefined && !checkRegExpEmail(user.email)) {       return { message: "Incorrect email.", status: 400 }; }
        if (user.username !== undefined && !checkRegExpLogin(user.username)) {    return { message: "Incorrect login.", status: 400 }; }
        if (user.password !== undefined && !checkRegExpPassword(user.password)) { return { message: "Incorrect password.", status: 400 }; }

        return userRepository.update(user);
    }

    function checkEmptyField(data, delEmptyField) {
        let result = delEmptyField ? {} : false;

        for (const key in data) {
            let field = data[key] + '';   
            field = field.replace(/\s*/g, '');

            if (!delEmptyField && field === "") {
                result = true;
                break;
            } else if (delEmptyField && field !== "" && field !== 'undefined') {
                result[key] = data[key];
            }
        }
        
        return result;
    }

    function checkRegExpLogin(login) { return /^[a-zA-Z1-9].{4,16}$/.test(login); }
    function checkRegExpPassword(pass) { return /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/.test(pass) && pass.length > 7; }
    function checkRegExpEmail(email) { return /(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/.test(email); }
}