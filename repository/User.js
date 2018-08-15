let mongoose = require("mongoose"),
    Core = require("../util/dataCore").Core,
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken'),
    Schema = mongoose.Schema;
    
Core.module('app').service('app.userRepository', UserRepository);

function UserRepository(){
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
            type: String,
            required: true
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
        }
    });	

    self.SchemaModel = mongoose.model("User", self.UserSchema);

    self.login = () => {
        return new Promise((resolve, reject) => {
            self.SchemaModel.findOne({ username: Zone.current.data.username })
            .then((user) => {
                let error = { message: 'Authentication failed. Login or password wrong.' };
                
                if (!user) {
                    reject(error);                    
                    return;
                }
    
                self.UserSchema.methods.verifyPassword(
                    Zone.current.data.password,
                    (err, success) => {
                        if (err || !success) {
                            reject(error);
                            return;
                        }
    
                        const token = jwt.sign({ username: Zone.current.data.username }, 'yqawv8nqi5', { expiresIn: '1d' });
                        resolve({ id: user._id, token: token });
                    },
                    user.password
                );
            })
            .catch((err) => reject({ message: 'Authentication failed. Login or password wrong.' }));
        });
    }

    self.getAll = () => {
        return new Promise((resolve, reject) => {
            self.SchemaModel.find({})
            .then((users) => {
                let data = rebuildUserData(users, null, [
                        'password',
                        'phone',
                        'email'
                    ]);
                
                resolve(data);
            })
            .catch((err) => reject({ message: err.message }));
        });
    }

    self.getOne = () => {
        return new Promise((resolve, reject) => {         
            self.SchemaModel.findOne({ _id: Zone.current.data.id })
            .then((user) => {
                let data = rebuildUserData(user, null, [
                        'password',
                        'rating',
                        'regDate'
                    ]);
                resolve(data);
            })
            .catch((err) => reject({ message: err.message, status: 400 }));
        });
    }

    self.add = () => {
        const new_user = new self.SchemaModel(Zone.current.data);
        return new Promise((resolve, reject) => {
            self.createHashPassword(new_user)
            .then((user) => {
                user.save()
                .then((user) => {
                    let data = rebuildUserData(user);					
                    resolve(data);
                })
                .catch((err) => reject({ message: err.message, status: 500 }));
            })
            .catch((err) => reject({ message: err.message, status: 500 }));
        });
    }

    self.update = () => {
        return new Promise((resolve, reject) => {            
            self.createHashPassword(Zone.current.data)
            .then((user) => {
                self.SchemaModel.findOneAndUpdate({ username: user.username }, user)
                .then((user) => {
                    let data = rebuildUserData(user);					
                    resolve(data);
                })
                .catch((err) => reject({ message: err.message, status: 500 }));
            })
            .catch((err) => reject({ message: err.message, status: 500 }));
        });
    }

    self.updatePhoto = (pathToPhoto) => {
        return new Promise((resolve, reject) => {
            self.SchemaModel.findOneAndUpdate(
                { username: Zone.current.data.username },
                { photo: pathToPhoto })
                .then((user) => {
                    let data = rebuildUserData(user);					
                    resolve(data);
                })
                .catch((err) => reject({ message: err.message, status: 500 }));
        });
    }

    self.delete = () => {
        return new Promise((resolve, reject) => {            
            self.SchemaModel.findOneAndRemove({ username: Zone.current.data.username })
            .then((user) => {				
                resolve({ message: 'ok' });
            })
            .catch((err) => reject({ message: err.message, status: 500 }));

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

    self.createHashPassword = (data) => {
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
            userData.map((element) => {
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
