const Core   = require("./core/dataCore").Core,
      bcrypt = require('bcrypt-nodejs'),
      jwt    = require('jsonwebtoken'),
      user   = require('./models/user');
    
Core.module('app').service('app.userRepository', UserRepository);

function UserRepository() {
    const self = this;

    self.UserSchema      = user.UserSchema;
    self.UserSchemaModel = user.UserSchemaModel;

    self.login = data => {
        const error = { message: 'Authentication failed. Login or password wrong.', status: 400 };

        return find('findOne', { username: data.username }, 'UserSchemaModel')
            .then(user => {                    
                if (!user) { throw error; }

                return verifyPassword(data.password, user.password)
                    .then(success => {
                        if (!success) { throw error; }

                        const token = jwt.sign({ username: data.username }, 'yqawv8nqi5');

                        return { id: user._id, token: token, role: user.post };
                    });
            });
    }

    self.getAll = login => {
        return checkAdmin({ username: login })
            .then(result => {
                if (!result.admin) { throw { message: 'No access.', status: 403 }; }

                return find('find', {}, 'UserSchemaModel')
                    .then(users => {
                        if (!users) { throw { message: 'Unknown error.', status: 500 }; }

                        return rebuildUserData(users, [
                                '_id',
                                'username',
                                'email',
                                'fullname',
                                'phone',
                                'post',
                                'rating',
                                'regDate'
                            ]);
                    });
            });
    }

    self.getOne = data => {
        return checkAdmin({ username: data.login })
            .then(result => {
                let id = data.id || result.id;

                if (!result.admin) { id = result.id; }

                return find('findOne', { _id: id }, 'UserSchemaModel')
                    .then(user => {                        
                        if (!user) { throw { message: 'Incorrect ID.', status: 400 }; }
                                        
                        return rebuildUserData(user, [
                                    '_id',
                                    'username',
                                    'email',
                                    'fullname',
                                    'phone',
                                    'post',
                                    'books',
                                    'rating',
                                    'regDate',
                                    'photo'
                                ]
                            );
                    });
            });
    }

    self.add = data => {
        const new_user = new self.UserSchemaModel(data);

        return createHashPassword(new_user)
            .then(user => {                        
                return user.save()
                    .then(user => {
                        if (!user) { throw { message: 'Unknown error.', status: 500 }; }

                        return rebuildUserData(user, [
                                '_id',
                                'username',
                                'email',
                                'fullname',
                                'phone',
                                'post',
                                'rating',
                                'regDate',
                                'books'
                            ]);
                    });
            });
    }

    self.update = data => {
        return createHashPassword(data)
            .then(user => {
                return checkAdmin({ username: data.login })
                    .then(result => {
                        let id = data.id;
                        if (!result.admin) { id = result.id; }

                        return update({ _id: id }, user, 'UserSchemaModel')
                            .then(user => {
                                if (!user) { throw { message: 'Incorrect ID.', status: 400 }; }
                                return { message: 'Ok' }
                            });
                    });
            });
    }

    self.delete = data => {        
        return checkAdmin({ username: data.login })
            .then(result => {
                let id = data.id;
                if (!result.admin) { id = result.id; }
                
                return self.UserSchemaModel.findOneAndRemove({ _id: id })
                    .then(() => { return { message: 'ok' } });
            });
    }

    self.updatePhoto = (data, photoName) => {
        return checkAdmin({ username: data.login })
            .then(result => {
                let id = data.id;
                if (!result.admin) { id = result.id; }

                return update(
                        { _id: id },
                        { photo: photoName },
                        'UserSchemaModel'
                    ).then(user => {
                        if (!user) { throw { message: 'Incorrect ID.', status: 400 }; }                
                        return { message: 'Ok' }
                    });
            });
    }

    function verifyPassword(password, _thisPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, _thisPassword, (err, isMatch) => {			
                if (err) { reject({ message: err.message, status: 500 }); }

                resolve(isMatch);
            });
        });
    }

    function createHashPassword(data) {
        return new Promise((resolve, reject) => {
            let user = data;
            
            if (data.password !== undefined && data.password.length !== 0) {
                if (!checkRegExpPassword(data.password)) {
                    reject({ message: "Incorrect password" }, 400);
                    return;
                }

                bcrypt.genSalt(5, (err, salt) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    bcrypt.hash(user.password, salt, null, (err, hash) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        user.password = hash;
                        resolve(user);
                    });
                });
            } else {
                resolve(user);
            }
        });
    };

    function find(findAllOrOne, query, SchemaModel) { return self[SchemaModel][findAllOrOne](query); }
    function update(query, data, SchemaModel) { return self[SchemaModel].findOneAndUpdate(query, data); }

    function checkAdmin(query) {
        return self.UserSchemaModel.findOne(query)
            .then(user => {
                let result = {
                    admin: true,
                    id: user._id
                };
                if (!user || user.post !== 'Administrator') { result.admin = false; }
                return result;
            });
    }

    function rebuildUserData(data, addField) {
        let user = [];

        if (data.length === undefined) {
            user = buildUserData(data, addField);
        } else {
            data.map(element => {
                user.push(buildUserData(element, addField));
            });
        }
        return user;
    }

    function buildUserData(data, addField) {
        let user = {};

        for (const index in data) {            
            addField.map((element) => {
                if (element === index) {
                    user[index]	= data[index];
                }
            });
        }
        return user;
    }

    function checkRegExpPassword(pass) { return /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/.test(pass) && pass.length > 7; }
}
