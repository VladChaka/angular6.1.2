let Core = require("../util/dataCore").Core,
    library = require('./models/library'),
    user = require('./models/user'),
    takenBook = require('./models/takenBook'),
    returnedBook = require('./models/returnedBook');

Core.module('app').service('app.libraryRepository', Library);
Library.$inject = ['app.userRepository'];

function Library(userRepository) {
    let self = this;

    self.BookSchemaModel = library.BookSchemaModel;
    self.UserSchemaModel = user.UserSchemaModel;
    self.TakenBookSchemaModel = takenBook.TakenBookSchemaModel;
    self.ReturnedBookSchemaModel = returnedBook.ReturnedBookSchemaModel;

    self.getAll = login => {
        return new Promise((resolve, reject) => {
            checkAdmin({ username: login })
            .then(admin => {
                let query = admin ? {} : { count: { $gt: 0 } };
                find('find', query, 'BookSchemaModel')
                .then(books => resolve(books))
                .catch(err => reject({ message: err.message, status: 400 }));
            })
            .catch(err => reject({ message: err.message, status: 400 }));
        });
    }

    self.getOne = id => {
        return new Promise((resolve, reject) => {
            find('findOne', { _id: id }, 'BookSchemaModel')
            .then(book => resolve(book))
            .catch(err => reject({ message: err.message, status: 400 }));
        });
    }

    self.add = data => {
        return new Promise((resolve, reject) => {
            add(data, 'BookSchemaModel', true)
            .then((result) => resolve(result))
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }

    self.update = data => {
        return new Promise((resolve, reject) => {
            checkAdmin({ username: data.login })
            .then(admin => {
                if (!admin) {
                    reject({ message: 'No access.', status: 403 });
                    return;
                }
                update(
                    { _id: data.bookid },
                    data,
                    'BookSchemaModel'
                )
                .then(book => resolve(book))
                .catch(err => reject({ message: err.message, status: 400 }));
            })
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }

    self.updatePhoto = data => {
        return new Promise((resolve, reject) => {
            checkAdmin({ username: data.login })
            .then(admin => {
                if (!admin) {
                    reject({ message: 'No access.', status: 403 });
                    return;
                }

                update(
                    { _id: data.id },
                    { photo: data.photo.name }
                )
                .then(() => resolve({ message: 'Ok' }))
                .catch(err => reject({ message: err.message, status: 500 }));
            })
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }

    self.getUserBooks = id => {
        return new Promise((resolve, reject) => {
            find('findOne', { userid: id }, 'TakenBookSchemaModel')
            .then(user => { 
                if (!user) {
                    reject({ message: 'User don\'t have books.', status: 204 });
                    return
                }
                resolve(user.books)
            })
            .catch(err => reject({ message: err.message, status: 400 }));
        });
    }

    self.takeBook = data => {  
        return new Promise((resolve, reject) => {
            find('findOne', { userid: data.userId }, 'TakenBookSchemaModel')
            .then(user => {
                if (!user) {
                    let newData = { 
                        login: data.login,
                        userid: data.userId,
                        books: [{
                            bookid: data.bookId,
                            dateReceived: Date.now()
                        }]
                    };

                    add(newData, 'TakenBookSchemaModel', true)
                    .then(() => {
                        take(data.bookId)
                        .then(() => resolve({ message: 'Ok' }))
                        .catch(err => reject({ message: err.message, status: 500 }));
                    })
                    .catch(err => reject({ message: err.message, status: 500 }));
                } else {
                    checkBook(data, { message: 'User have this book.', status: 204 })
                    .then(() => {
                        update(
                            { userid: data.userId },
                            { $push: {
                                  books: {
                                      bookid: data.bookId,
                                      dateReceived: Date.now()
                                  }
                              }
                            },
                            'TakenBookSchemaModel'
                        )
                        .then(() => {
                            take(data.bookId)
                            .then(() => resolve({ message: 'Ok' }))
                            .catch(err => reject(err));
                        })
                        .catch(err => reject({ message: err.message, status: 500 }));
                    })
                    .catch(err => reject({ message: err.message, status: 500 }));
                }
            })
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }

    self.returnBook = data => {
        return new Promise((resolve, reject) => {
            find('findOne', { 
                data:  {userid: data.userId, 
                books: {
                    $elemMatch: {
                        bookid: data.bookId
                    }
                }}, 
                options: 'books.dateReceived'
            }, 'TakenBookSchemaModel')
            .then(user => {                
                checkBook(data, { message: 'User have this book.', status: 204 })
                .then(() => {                    
                    find('findOne', { userid: data.userId }, 'ReturnedBookSchemaModel')
                    .then(succes => {                        
                        if (!succes) {
                            let newData = {
                                login: data.login,
                                userid: data.userId,
                                books: [{
                                    bookid: data.bookId,
                                    dateReceived: user.books[0].dateReceived,
                                    dateReturned: Date.now()
                                }]
                            };
                            add(newData, 'ReturnedBookSchemaModel', true)
                            .then(() => {
                                returned(data.bookId)
                                .then(() => {
                                    update(
                                        { userid: data.userId },
                                        { $pull: {
                                            books: {
                                                bookid: data.bookId
                                            }
                                          } 
                                        },
                                        'TakenBookSchemaModel'
                                    )
                                    .then(() => resolve({ message: 'Ok' }))
                                    .catch(err => reject({ message: err.message, status: 400 }));
                                })
                                .catch(err => reject({ message: err.message, status: 500 }));
                            })
                            .catch(err => reject({ message: err.message, status: 500 }));
                        } else {
                            update(
                                { userid: data.userId },
                                { $push: {
                                      books: {
                                          bookid: data.bookId,
                                          dateReceiving: user.books[0].dateReceived,
                                          dateReturned: Date.now()
                                      }
                                  }
                                },
                                'ReturnedBookSchemaModel'
                            )
                            .then(() => {
                                returned(data.bookId)
                                .then(() => {
                                    update(
                                        { userid: data.userId },
                                        { $pull: {
                                            books: {
                                                bookid: data.bookId
                                            }
                                          } 
                                        },
                                        'TakenBookSchemaModel'
                                    )
                                    .then(() => resolve({ message: 'Ok' }))
                                    .catch(err => reject({ message: err.message, status: 400 }));
                                })
                                .catch(err => reject({ message: err.message, status: 500 }));
                            })
                            .catch(err => reject({ message: err.message, status: 500 }));
                        }
                    })
                    .catch(err => reject({ message: err.message, status: 500 }));
                })
                .catch(err => reject({ message: err.message, status: 500 }));
            })
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }

    function take(id) {
        return new Promise((resolve, reject) => {
            find('findOne', { _id: id }, 'BookSchemaModel')
            .then(book => {                
                if (!book || book.count < 1) {
                    reject({ message: 'Not available.', status: 400 })
                    return;
                }
                update(
                    { _id: id },
                    { count: book.count - 1 },
                    'BookSchemaModel'
                )
                .then(book => resolve(book))
                .catch(err => reject({ message: err.message, status: 400 }));
            })
            .catch(err => reject({ message: err.message, status: 400 }));
            
        });
    }

    function returned(id) {
        return new Promise((resolve, reject) => {
            find('findOne', { _id: id }, 'BookSchemaModel')
            .then(book => {                
                update(
                    { _id: id },
                    { count: book.count + 1 },
                    'BookSchemaModel'
                )
                .then(book => resolve(book))
                .catch(err => reject({ message: err.message, status: 400 }));
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
    
    function checkAdmin(query) {
        return new Promise((resolve, reject) => {
            self.UserSchemaModel.findOne(query)
            .then(user => {
                let admin = true;
                if (!user || user.post !== 'Administrator') admin = false;
                resolve(admin);
            })
            .catch(err => reject({ message: err.message, status: 400 }));
        });
    }

    function update(query, data, SchemaModel) {
        return new Promise((resolve, reject) => {
            self[SchemaModel].findOneAndUpdate(query, data)
            .then(result => resolve(result))
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }

    function add(data, SchemaModel, isAdmin) {
        return new Promise((resolve, reject) => {
            const newData = new self[SchemaModel](data);
            if (isAdmin) {
                checkAdmin({ username: data.login })
                .then(admin => {
                    if (!admin) {
                        reject({ message: 'No access.', status: 403 });
                        return;
                    }
                    newData.save()
                    .then(result => resolve(result))
                    .catch(err => reject({ message: err.message, status: 500 }));
                })
                .catch(err => reject({ message: err.message, status: 500 }));
            } else {
                newData.save()
                .then(result => resolve(result))
                .catch(err => reject({ message: err.message, status: 500 }));
            }
        });
    }

    function checkBook(data, error) {
        return new Promise((resolve, reject) => {            
            find('findOne',{
                    _id: data.userId,
                    books: {
                        $elemMatch: { 
                            bookid: data.bookId,
                        }
                    }
                },
                'TakenBookSchemaModel'
            )
            .then(user => {
                if (user) {
                    reject(error);
                    return;
                }
                resolve();
            })
            .catch(err => reject({ message: err.message, status: 500 }));
        });
    }
}