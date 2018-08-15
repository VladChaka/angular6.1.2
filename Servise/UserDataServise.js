let Core = require("../util/dataCore").Core;

UserDataServise.$inject = ['app.userRepository'];
Core.module('app').service('app.userDataServise', UserDataServise);

function UserDataServise (userRepository) {
    let self = this;

    self.login = () => {
        return new Promise((resolve, reject) => {
            userRepository.login()
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });
    }

    self.findAll = () => {
        return new Promise((resolve, reject) => {
            userRepository.getAll()
            .then((result) => { resolve(result) })
            .catch((err) => { reject(err); });
        });
    }

    self.findOne = () => {	
        return new Promise((resolve, reject) => {
            userRepository.getOne()
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });	
    }

    self.add = () => {
        return new Promise((resolve, reject) => {
            delete Zone.current.data.bookname;
            Zone.current.data.rating = '0';

            if (checkEmptyField()) {
                reject({ message: "Fields empty.", status: 400 });
                return;
            }
            if (!checkRegExEmail(Zone.current.data.email)) {
                reject({ message: "Incorrect email.", status: 400 });
                return;
            }
            if (!checkRegExLogin(Zone.current.data.username)) {
                reject({ message: "Incorrect login.", status: 400 });
                return;
            }
            if (!checkRegExPassword(Zone.current.data.password)) {
                resolve({ message: "Incorrect password.", status: 400 });
                return;
            }

            userRepository.add()
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });
    }

    self.update = () => {
        return new Promise((resolve, reject) => {
            if (Zone.current.data.password === '') {
                delete Zone.current.data.password;
            } else {
                if (!checkRegExPassword(Zone.current.data.password)) {
                    resolve({ message: "Incorrect password.", status: 400 });
                    return;
                }
            }
            delete Zone.current.data.bookname;
            delete Zone.current.data.regDate;            

            if (checkEmptyField()) {
                reject({ message: "Fields empty.", status: 400 });
                return;
            }
            if (!checkRegExEmail(Zone.current.data.email)) {
                reject({ message: "Incorrect email.", status: 400 });
                return;
            }
            if (!checkRegExLogin(Zone.current.data.username)) {
                reject({ message: "Incorrect login.", status: 400 });
                return;
            }

            userRepository.update()
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });
    }

    self.upadtePhoto = (pathToPhoto) => {
        return new Promise((resolve, reject) => {
            userRepository.updatePhoto(pathToPhoto)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });	
    }

    self.delete = () => {
        return new Promise((resolve, reject) => {
            userRepository.delete()
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });	
    }

    function checkEmptyField() {
        let result = false;

        for (let index in Zone.current.data) {
            let field = Zone.current.data[index];   
            field = field.replace(/\s*/g, '');

            if (field === "") result = true
        }
        
        return result;
    }

    function checkRegExLogin(login) { return /^[a-zA-Z1-9].{4,16}$/.test(login); }
    function checkRegExPassword(pass) { return /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/.test(pass) && pass.length > 7; }
    function checkRegExEmail(email) { return /(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/.test(email); }	
}