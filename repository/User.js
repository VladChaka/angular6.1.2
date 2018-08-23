let mongoose = require("mongoose"),
    Core = require("../util/dataCore").Core,
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken'),
    Schema = mongoose.Schema;
    
Core.module('app').service('app.userRepository', UserRepository);

function UserRepository() {
    let self = this;

    self.UserSchema = new Schema({
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        post: {
            type: String
        },
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        fullname: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        regDate: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: true
        },
        books: [{
            bookname: String,
            dateReceiving: String,
            dateReturned: String
        }]
    });	

    self.SchemaModel = mongoose.model("User", self.UserSchema);

    self.login = (userData) => {
        return new Promise((resolve, reject) => {
            findOne({ username: userData.username })
            .then(user => {
                let error = { error: 'Authentication failed. Login or password wrong.' };
                if (!user) {
                    reject(error);                    
                    return;
                }

                self.UserSchema.methods.verifyPassword(
                    userData.password,
                    (err, success) => {
                        if (err || !success) {
                            reject(error);
                            return;
                        }
                        let admin = user.post === 'Administrator' ? true : false;
                        const token = jwt.sign({ username: userData.username }, 'yqawv8nqi5');
                        resolve({ id: user._id, token: token, admin: admin });
                    },
                    user.password
                );
            })
            .catch(() => reject({ error: 'Authentication failed. Login or password wrong.' }));
        });
    }

    self.getAll = (username) => {
        return new Promise((resolve, reject) => {
            findOne({ username: username })
            .then(user => {                
                if (user.post !== 'Administrator') {
                    reject({ error: 'No access.', status: 403 });
                    return;
                }

                self.SchemaModel.find({})
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
                .catch(err => reject({ error: err.message }));
            })
            .catch(err => reject({ error: err.message, status: 500 }));
        });
    }

    self.getOne = (key, data) => {
        return new Promise((resolve, reject) => {
            findOne({ [key]: data })
            .then(user => {                
                let userData = rebuildUserData(user, [
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
                resolve(userData);
            })
            .catch(err => reject({ error: err.message, status: 400 }));
        });
    }

    self.add = (userData) => {
        return new Promise((resolve, reject) => {
            findOne({ username: userData.login })
            .then(user => {
                // if (user.post !== 'Administrator') {
                //     reject({ error: 'No access.', status: 403 });
                //     return;
                // }

                const new_user = new self.SchemaModel(userData);

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
                    .catch(err => reject({ error: err.message, status: 500 }));
                })
                .catch(err => reject({ error: err.message, status: 500 }));
            })
            .catch(err => reject({ error: err.message, status: 500 }));  
        });
    }

    self.update = (userData) => {
        return new Promise((resolve, reject) => {
            findOne({ username: userData.login })
            .then(user => {
                if (user.post !== 'Administrator') {
                    reject({ error: 'No access.', status: 403 });
                    return;
                }

                self.createHashPassword(userData)
                .then(user => {                    
                    findOneAndUpdate({ email: user.email }, user)
                    .then(() => resolve({ message: 'Ok' }))
                    .catch(err => reject({ error: err.message, status: 400 }));
                })
                .catch(err => reject({ error: err.message, status: 500 }));
            })
            .catch(err => reject({ error: err.message, status: 500 }));
        });
    }

    self.updatePhoto = data => {
        return new Promise((resolve, reject) => {
            findOne({ username: data.login })
            .then(user => {
                if (user.post !== 'Administrator') {
                    reject({ error: 'No access.', status: 403 });
                    return;
                }

                findOneAndUpdate(
                    { username: data.name },
                    { photo: data.photo.name }
                )
                .then(() => resolve({ message: 'Ok' }))
                .catch(err => reject({ error: err.message, status: 500 }));
            })
            .catch(err => reject({ error: err.message, status: 500 }));
        });
    }

    self.delete = (userData) => {
        return new Promise((resolve, reject) => {   
            findOne({ username: userData.login })
            .then(user => {
                if (user.post !== 'Administrator') {
                    reject({ error: 'No access.', status: 403 });
                    return;
                }                
                self.SchemaModel.findOneAndRemove({ _id: userData.id })
                .then(() => resolve({ message: 'ok' }))
                .catch(err => reject({ error: err.message, status: 500 }));
            })
            .catch(err => reject({ error: err.message, status: 500 }));
        });
    }

    self.getBooks = id => {
        return new Promise((resolve, reject) => {
            findOne({
                _id: id,
                books: {
                    $elemMatch: {
                        dateReturned: ''
                    }
                }
            })
            .then((user) => {                
                if (!user) {
                    reject({ message: 'User don\'t have books.', status: 204 });
                } else {                    
                    resolve(user.books);
                }
            })
            .catch((err) => reject({ error: err.message, status: 500 }));
        });
    }

    self.takeBook = (userData, book) => {  
        return new Promise((resolve, reject) => {
            findOne({
                _id: userData.userId,
                books: {
                    $elemMatch: { 
                        bookname: book.bookname,
                        dateReturned: ''
                    }
                }
            })
            .then((user) => {
                if (user !== null) {
                    reject({ message: 'User have this book.', status: 204 });
                    return;
                } else {
                    findOneAndUpdate(
                        { _id: userData.userId },
                        { $push: {
                              books: {
                                  bookname: book.bookname,
                                  dateReceiving: Date.now(),
                                  dateReturned: ''
                              }
                          }
                        }
                    )
                    .then(() => resolve({ message: 'Ok' }))
                    .catch(err => reject({ error: err.message, status: 500 }));
                }
            })
            .catch(err => reject({ error: err.message, status: 500 }));
        });
    }

    self.returnBook = (userData, book) => {
        return new Promise((resolve, reject) => {
            findOne({
                _id: userData.userId,
                books: {
                    $elemMatch: {
                        bookname: book.bookname,
                        dateReturned: ''
                    }
                }
            })
            .then((user) => {
                if (user === null) {
                    reject({ message: 'User don\'t have this book.', status: 204 });
                    return;
                } else {
                    findOneAndUpdate({
                        _id: userData.userId,
                            books: {
                                $elemMatch: { 
                                    bookname: book.bookname,
                                    dateReturned: ''
                                }
                            } 
                        },
                        { $set: { "books.$.dateReturned": Date.now() } }
                    )
                    .then(() => resolve({ message: 'Ok' }))
                    .catch((err) => reject({ error: err.message, status: 500 }));
                }
            })
            .catch(err => reject({ error: err.message, status: 500 }));
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
                    reject({ error: "Incorrect password" }, 400);
                    return;
                }
                bcrypt.genSalt(5, (err, salt) => {
                    if (err) {
                        reject({ error: err.message, status: 500 });
                        return;
                    }

                    bcrypt.hash(user.password, salt, null, (err, hash) => {
                        if (err) {
                            reject({ error: err.message, status: 500 });
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
            self.SchemaModel.findOne(query)
            .then(user => {
                resolve(user);
            })
            .catch(err => reject({ error: err.message, status: 400 }));
        });
    }

    function findOneAndUpdate(query, data) {
        return new Promise((resolve, reject) => {
            self.SchemaModel.findOneAndUpdate(query, data)
            .then(user => resolve(user))
            .catch(err => reject({ error: err.message, status: 500 }));
        });
    }

    function rebuildUserData(userData, addField) {
        let user = [];

        if (userData.length === undefined) {
            user = buildUserData(userData, addField);
        } else {
            userData.map(element => {
                user.push(buildUserData(element, addField));
            });
        }
        return user;
    }

    function buildUserData(userData, addField) {
        let user = {};

        for (const index in userData) {            
            addField.map((element) => {
                if (element === index) {
                    user[index]	= userData[index];
                }
            });
        }
        return user;
    }

    function checkRegExpPassword(pass) {
        return /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/.test(pass) && pass.length > 7;
    }
}
