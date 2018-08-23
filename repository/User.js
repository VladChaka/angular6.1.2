let Core = require("../util/dataCore").Core,
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken'),
    user = require('./models/user');
    
Core.module('app').service('app.userRepository', UserRepository);

function UserRepository() {
    let self = this;

    self.UserSchema = user.UserSchema;
    self.UserSchemaModel = user.UserSchemaModel;

    self.login = data => {
        return new Promise((resolve, reject) => {
            find('findOne', { username: data.username }, 'UserSchemaModel')
            .then(user => {
                let error = { message: 'Authentication failed. Login or password wrong.' };
                if (!user) {
                    reject(error);                    
                    return;
                }
                
                self.UserSchema.methods.verifyPassword(
                    data.password,
                    (err, success) => {
                        if (err || !success) {
                            reject(error);
                            return;
                        }

                        const token = jwt.sign({ username: data.username }, 'yqawv8nqi5');

                        resolve({ id: user._id, token: token, role: user.post });
                    },
                    user.password
                );
            })
            .catch(() => reject({ message: 'Authentication failed. Login or password wrong.' }));
        });
    }

    self.findAll = login => {
        return new Promise((resolve, reject) => {
            find('findOne', { username: login }, 'UserSchemaModel')
            .then(user => {                
                if (user.post !== 'Administrator') {
                    reject({ message: 'No access.', status: 403 });
                    return;
                }
                self.UserSchemaModel.find({})
                .then(users => {
                    let data = rebuildUserData(
                        users,
                        [
                            '_id',
                            'username',
                            'email',
                            'fullname',
                            'phone',
                            'post',
                            'rating',
                            'regDate'
                        ]
                    );
                    resolve(data);
                })
                .catch(err => reject({ message: err.message }));
            })
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }

    self.getOne = (key, data) => {
        return new Promise((resolve, reject) => {
            findOne({ [key]: data })
            .then(user => {                
                let data = rebuildUserData(user, [
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
                resolve(data);
            })
            .catch(err => reject({ message: err.message, status: 400 }));
        });
    }

    self.add = data => {
        return new Promise((resolve, reject) => {
            findOne({ username: data.login })
            .then(user => {
                if (user.post !== 'Administrator') {
                    reject({ message: 'No access.', status: 403 });
                    return;
                }

                const new_user = new self.UserSchemaModel(data);

                self.createHashPassword(new_user)
                .then(user => {
                    user.save()
                    .then(user => {
                        let data = rebuildUserData(user, [
                                '_id',
                                'username',
                                'email',
                                'fullname',
                                'phone',
                                'post',
                                'rating',
                                'regDate',
                                'books'
                            ]
                        );					
                        resolve(data);
                    })
                    .catch(err => reject({ message: err.message, status: 500 }));
                })
                .catch(err => reject({ message: err.message, status: 500 }));
            })
            .catch(err => reject({ message: err.message, status: 500 }));  
        });
    }

    self.update = data => {
        return new Promise((resolve, reject) => {
            findOne({ username: data.login })
            .then(user => {
                if (user.post !== 'Administrator') {
                    reject({ message: 'No access.', status: 403 });
                    return;
                }

                self.createHashPassword(data)
                .then(user => {                    
                    findOneAndUpdate({ _id: user.id }, user)
                    .then(() => resolve({ message: 'Ok' }))
                    .catch(err => reject({ message: err.message, status: 400 }));
                })
                .catch(err => reject({ message: err.message, status: 500 }));
            })
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }

    self.updatePhoto = data => {
        return new Promise((resolve, reject) => {
            findOne({ username: data.login })
            .then(user => {
                if (user.post !== 'Administrator') {
                    reject({ message: 'No access.', status: 403 });
                    return;
                }

                findOneAndUpdate(
                    { username: data.name },
                    { photo: data.photo.name }
                )
                .then(() => resolve({ message: 'Ok' }))
                .catch(err => reject({ message: err.message, status: 500 }));
            })
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }

    self.delete = data => {
        return new Promise((resolve, reject) => {   
            findOne({ username: data.login })
            .then(user => {
                if (user.post !== 'Administrator') {
                    reject({ message: 'No access.', status: 403 });
                    return;
                }                
                self.UserSchemaModel.findOneAndRemove({ _id: data.id })
                .then(() => resolve({ message: 'ok' }))
                .catch(err => reject({ message: err.message, status: 500 }));
            })
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }

    self.UserSchema.methods.verifyPassword = (password, cb, _thisPassword) => {
        bcrypt.compare(password, _thisPassword, (err, isMatch) => {			
            if (err) {
                cb(err);
                return;
            }
            cb(null, isMatch);
        });
    };

    self.createHashPassword = data => {
        return new Promise((resolve, reject) => {
            const user = data;
            if (data.password !== undefined && data.password.length !== 0) {
                if (!checkRegExpPassword(data.password)) {
                    reject({ message: "Incorrect password" }, 400);
                    return;
                }
                bcrypt.genSalt(5, (err, salt) => {
                    if (err) {
                        reject({ message: err.message, status: 500 });
                        return;
                    }

                    bcrypt.hash(user.password, salt, null, (err, hash) => {
                        if (err) {
                            reject({ message: err.message, status: 500 });
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

    function findOne(query) {
        return new Promise((resolve, reject) => {            
            self.UserSchemaModel.findOne(query)
            .then(user => {
                resolve(user);
            })
            .catch(err => reject({ message: err.message, status: 400 }));
        });
    }







    function find(findAllOrOne, query, SchemaModel) {
        return new Promise((resolve, reject) => {
            if (query.options !== undefined) {
                self[SchemaModel][findAllOrOne](query.data, query.options)
                .then(result => resolve(result))
                .catch(err => reject({ message: err.message, status: 400 }));
            } else {
                self[SchemaModel][findAllOrOne](query)
                .then(result => resolve(result))
                .catch(err => reject({ message: err.message, status: 400 }));
            }
        });
    }
    function update(query, data, SchemaModel) {
        return new Promise((resolve, reject) => {
            self[SchemaModel].findOneAndUpdate(query, data)
            .then(result => resolve(result))
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }







    function findOneAndUpdate(query, data) {
        return new Promise((resolve, reject) => {
            self.UserSchemaModel.findOneAndUpdate(query, data)
            .then(user => resolve(user))
            .catch(err => reject({ message: err.message, status: 500 }));
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

    function checkRegExpPassword(pass) {
        return /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/.test(pass) && pass.length > 7;
    }
}
