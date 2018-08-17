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
            self.SchemaModel.findOne({ username: userData.username })
            .then(user => {
                let error = { message: 'Authentication failed. Login or password wrong.' };
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

                        const token = jwt.sign({ username: userData.username }, 'yqawv8nqi5');
                        resolve({ id: user._id, token: token });
                    },
                    user.password
                );
            })
            .catch(err => reject({ message: 'Authentication failed. Login or password wrong.' }));
        });
    }

    self.getAll = () => {
        return new Promise((resolve, reject) => {
            self.SchemaModel.find({})
            .then(users => {
                let data = rebuildUserData(users, [
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
        });
    }

    self.getOne = (key, data) => {
        return new Promise((resolve, reject) => {         
            self.SchemaModel.findOne({ [key]: data })
            .then(user => {
                let data = rebuildUserData(user, 
                        [
                            '_id',
                            'username',
                            'email',
                            'fullname',
                            'phone',
                            'post'
                        ]
                    );
                resolve(data);
            })
            .catch(err => reject({ message: err.message, status: 400 }));
        });
    }

    self.add = (userData) => {
        return new Promise((resolve, reject) => {
            const new_user = new self.SchemaModel(userData);

            self.createHashPassword(new_user)
            .then(user => {
                user.save()
                .then(user => {
                    let data = rebuildUserData(user);					
                    resolve(data);
                   })
                .catch(err => reject({ message: err.message, status: 500 }));
            })
            .catch(err => reject({ message: err.message, status: 500 }));  
        });
    }

    self.update = (userData) => {
        return new Promise((resolve, reject) => {
            self.getOne('username', userData.login)
            .then(user => {
                if (user.post !== 'Administrator') {
                    reject({ message: 'No access.', status: 403 });
                    return;
                }

                self.createHashPassword(userData)
                .then(user => {                    
                    self.SchemaModel.findOneAndUpdate({ email: user.email }, user)
                    .then(user => {                        
                        let data = rebuildUserData(user);                        					
                        resolve(data);
                    })
                    .catch(err => reject({ message: err.message, status: 400 }));
                })
                .catch(err => reject({ message: err.message, status: 500 }));
            })
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }

    self.updatePhoto = (pathToPhoto, username) => {
        return new Promise((resolve, reject) => {
            self.SchemaModel.findOneAndUpdate(
                { username: username },
                { photo: pathToPhoto }
            )
            .then(user => {
                let data = rebuildUserData(user);					
                resolve(data);
            })
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }

    self.delete = (username) => {
        return new Promise((resolve, reject) => {            
            self.SchemaModel.findOneAndRemove({ username: username })
            .then(() => {				
                resolve({ message: 'ok' });
            })
            .catch(err => reject({ message: err.message, status: 500 }));

        });
    }

    self.getBooks = (username) => {  
        return new Promise((resolve, reject) => {
            self.SchemaModel.findOne({ username: username })
            .then((user) => resolve({ books: user.books }))
            .catch((err) => reject({ message: err.message, status: 500 }));
        });
    }

    self.takeBook = (userData) => {  
        return new Promise((resolve, reject) => {
            self.SchemaModel.findOneAndUpdate(
                { username: userData.username },
                { $push: {
                      bookname: userData.bookname,
                      dateReceiving: Date.now()
                  }
                }
            )
            .then(() => resolve({ message: 'Ok' }))
            .catch((err) => reject({ message: err.message, status: 500 }));
        });
    }

    self.returnBook = (userData) => {
        return new Promise((resolve, reject) => {
            self.SchemaModel.findOne({
                books: {
                    bookname: { 
                        $all: userData.bookname 
                    }
                }
            })
            .then((user) => {console.log(user); reject({ message: 'User have this book.', status: 400 })})
            .catch(() => {
                self.SchemaModel.findOneAndUpdate(
                    { username: userData.username },
                    { books: {
                          bookreturned: Date.now()
                      } 
                    }
                )
                .then(() => resolve({ message: 'Ok' }))
                .catch((err) => reject({ message: err.message, status: 500 }));
            });

            
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

    function rebuildUserData(userData, addField, delField) {
        let user = [],
            standartUserFields = [
                '_id',
                'username',
                'email',
                'fullname',
                'phone',
                'post',
                'rating',
                'regDate',
                'photo'
            ];

        if (userData.length === undefined) {
            user = buildUserData(userData, standartUserFields, addField, delField);
        } else {
            userData.map(element => {
                user.push(buildUserData(element, standartUserFields, addField, delField));
            });
        }
        return user;
    }

    function buildUserData(userData, standartUserFields, addField, delField) {
        let user = {};
        for (const index in userData) {
            standartUserFields.map((element) => {
                if (element === index) {
                    user[index]	= userData[index];
                }
                if (addField !== undefined && addField !== null && addField[i] === index) {
                    user[index] = userData[index];
                }
            });
        }

        if (delField !== undefined && delField !== null && delField.length !== null) {
            delField.map((element) => {
                delete user[element];
            });
        }

        return user;
    }

    function checkRegExpPassword(pass) {
        return /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/.test(pass) && pass.length > 7;
    }
}
