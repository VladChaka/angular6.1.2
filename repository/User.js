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
        return find('findOne', { username: data.username }, 'UserSchemaModel')
            .then(user => {
                let error = { message: 'Authentication failed. Login or password wrong.' };
                if (!user) {
                    reject(error);                    
                    return;
                }

                return verifyPassword(data.password, user.password)
                    .then(success => {
                        if (!success) {
                            return error;
                        }

                        const token = jwt.sign({ username: data.username }, 'yqawv8nqi5');

                        return { id: user._id, token: token, role: user.post };
                    });
            })
            .catch(err => {console.log(err); reject({ message: 'Authentication failed. Login or password wrong.' })});
    }

    self.findAll = login => {
        return find('findOne', { username: login }, 'UserSchemaModel')
            .then(user => {                
                if (user.post !== 'Administrator')
                    return { message: 'No access.', status: 403 };

                return self.UserSchemaModel.find({})
                    .then(users => {
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
                    })
                    .catch(err => { return { message: err.message } });
            })
            .catch(err => { return { message: err.message, status: 500 } });
    }

    self.getOne = id => {
        return new Promise((resolve, reject) => {
            find('findOne', { _id: id }, 'UserSchemaModel')
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
            find('findOne', { username: data.login }, 'UserSchemaModel')
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
            find('findOne', { username: data.login }, 'UserSchemaModel')
            .then(user => {
                if (user.post !== 'Administrator') {
                    reject({ message: 'No access.', status: 403 });
                    return;
                }

                self.createHashPassword(data)
                .then(user => {                    
                    update({ _id: user.id }, user, 'UserSchemaModel')
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
            find('findOne', { username: data.login }, 'UserSchemaModel')
            .then(user => {
                if (user.post !== 'Administrator') {
                    reject({ message: 'No access.', status: 403 });
                    return;
                }

                update(
                    { username: data.name },
                    { photo: data.photo.name },
                    'UserSchemaModel'
                )
                .then(() => resolve({ message: 'Ok' }))
                .catch(err => reject({ message: err.message, status: 500 }));
            })
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }

    self.delete = data => {
        return new Promise((resolve, reject) => {   
            find('findOne', { username: data.login }, 'UserSchemaModel')
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

    // function verifyPassword(password, _thisPassword) {
    //     return bcrypt.compare(password, _thisPassword)
    //         .then(isMatch => {
    //             console.log('isMatch',isMatch);
                
    //             return isMatch;
    //         })
    //         .cathe(err => {
    //             console.log('err',err);
    //             return err;
    //         });
    // }

    function verifyPassword(password, _thisPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, _thisPassword, (err, isMatch) => {			
                if (err) 
                    reject({ message: err.message, status: 500 });

                resolve(isMatch);
            });
        });
    }

    // self.UserSchema.methods.verifyPassword = (password, cb, _thisPassword) => {
    //     bcrypt.compare(password, _thisPassword, (err, isMatch) => {			
    //         if (err) {
    //             cb(err);
    //             return;
    //         }
    //         cb(null, isMatch);
    //     });
    // };

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

    function find(findAllOrOne, query, SchemaModel) {
        return self[SchemaModel][findAllOrOne](query)
            .then(result => { return result })
            .catch(err => { return { message: err.message, status: 400 } });
    }
    function update(query, data, SchemaModel) {
        return new Promise((resolve, reject) => {
            self[SchemaModel].findOneAndUpdate(query, data)
            .then(result => resolve(result))
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
