'use strict'

const Core         = require("./core/dataCore").Core,
      library      = require('./models/library'),
      user         = require('./models/user'),
      takenBook    = require('./models/takenBook'),
      returnedBook = require('./models/returnedBook');

Core.module('app').service('app.libraryRepository', Library);
Library.$inject = ['app.userRepository'];

function Library(userRepository) {
    const self = this;

    self.UserSchemaModel         = user.UserSchemaModel;
    self.BookSchemaModel         = library.BookSchemaModel;
    self.TakenBookSchemaModel    = takenBook.TakenBookSchemaModel;
    self.ReturnedBookSchemaModel = returnedBook.ReturnedBookSchemaModel;

    self.getAll = () => {
        return find('find', {}, 'BookSchemaModel')
            .then(books => {
                if (!books) { throw { message: 'Unknown error.', status: 500 }; }

                return books;
            });
    }

    self.getOne = id => {
        return find('findOne', { _id: id }, 'BookSchemaModel')
            .then(book => {
                if (!book) { throw { message: 'Incorrect ID.', status: 400 }; }

                return book;
            });
    }

    self.add = data => {
        checkAdmin({ username: data.username })
            .then(result => {
                if (!result.admin) { throw { message: 'No access.', status: 403 }; }

                return add(data, 'BookSchemaModel', true).then(result => { return result });
            })
    }

    self.update = data => {
        return checkAdmin({ username: data.login })
            .then(result => {
                if (!result.admin) { throw { message: 'No access.', status: 403 }; }

                update(
                    { _id: data.bookid },
                    data,
                    'BookSchemaModel'
                )
                .then(book => {
                    if (!book) { throw { message: 'Incorrect ID.', status: 400 }; }
                    return book;
                });
            });
    }

    self.updatePhoto = (data, photoName) => {
        return checkAdmin({ username: data.login })
            .then(result => {
                let id = data.id;
                if (!result.admin) { id = result.id; }

                return update({ _id: id }, { photo: photoName }, 'BookSchemaModel'
                    ).then(book => {
                        if (!book) { throw { message: 'Incorrect ID.', status: 400 }; }

                        return { message: 'Ok' };
                    });
            });
    }

    self.getUserBooks = data => {        
        return checkAdmin({ username: data.login })
            .then(result => {
                let id = data.id;
                if (!result.admin) { id = result.id; }

                return find('findOne', { userid: id }, 'TakenBookSchemaModel')
                    .then(user => {
                        if (!user) { throw { message: 'User don\'t have books.', status: 204 }; }

                        return user.books
                    });
            });
    }

    self.delete = data => {
        return checkAdmin({ username: data.login })
            .then(result => {
                if (!result.admin) { throw { message: 'No access.', status: 403 }; }
                
                return find('findOne', { 
                            books: {
                                $elemMatch: {
                                    bookid: data.id
                                }
                            } 
                        },
                        'TakenBookSchemaModel'
                    ).then(book => {
                        if (book) { throw { message: 'This book have one or more users.', status: 400 }; }
                        
                        return self.BookSchemaModel.findOneAndRemove({ _id: data.id })
                            .then(() => { return { message: 'ok' } });
                    });
            });
    }

    self.takeBook = data => {
        return find('findOne', { userid: data.userid }, 'TakenBookSchemaModel')
            .then(user => {
                if (!user) {
                    const newData = { 
                        login: data.login,
                        userid: data.userid,
                        books: [{
                            bookid: data.bookid,
                            dateReceived: Date.now()
                        }]
                    };
                    
                    return createLibraryCard(newData)
                }

                return addBookInLibraryCard(data);
            })
    }

    self.returnBook = data => {
        return find('findOne', { 
                    data:  { 
                        userid: data.userid, 
                        books: {
                            $elemMatch: {
                                bookid: data.bookid
                            }
                        }
                    }, 
                    options: 'books.dateReceived'
                }, 
                'TakenBookSchemaModel'
            ).then(user => {
                if (!user) { throw { message: 'Incorrect ID.', status: 400 }; }

                return checkBook(data, { message: 'User have this book.', status: 400 }, false)
                    .then(() => { return deletBookInLibraryCard(data, user.books[0].dateReceived); });
            });
    }

    function createLibraryCard(data) {
        return take(data.books[0].bookid)
            .then(() => {
                return add(data, 'TakenBookSchemaModel', false)
                    .then(result => { 
                        if (!result) { throw { message: 'Unknown error.', status: 500 }; }

                        const newData = {
                            userid: data.userid,
                            books: []
                        };

                        return add(newData, 'ReturnedBookSchemaModel', false)
                            .then(result => { 
                                if (!result) { throw { message: 'Unknown error.', status: 500 }; }

                                return { message: 'Ok' }
                            });
                    });
            });
    }

    function addBookInLibraryCard(data) {
        return checkBook(data, { message: 'User have this book.', status: 400 }, true)
            .then(() => {       
                return take(data.bookid)
                    .then(() => { 
                        return update(
                            { userid: data.userid },
                            { $push: {
                                  books: {
                                      bookid: data.bookid,
                                      dateReceived: Date.now()
                                  }
                              }
                            },
                            'TakenBookSchemaModel'
                        ).then(() => { return { message: 'Ok' } });
                    });
            })
    }

    function deletBookInLibraryCard(data, dateReceived) {
        return returned(data.bookid)
            .then(() => {
                return update(
                        { userid: data.userid },
                        { $push: {
                            books: {
                                bookid: data.bookid,
                                dateReceived: dateReceived,
                                dateReturned: Date.now()
                            }
                          }
                        },
                        'ReturnedBookSchemaModel'
                    ).then(() => {
                        return update(
                                { userid: data.userid },
                                { $pull: {
                                    books: {
                                        bookid: data.bookid
                                    }
                                } 
                                },
                                'TakenBookSchemaModel'
                            ).then(() => { return { message: 'Ok' } });
                    });
            });
    }

    function take(id) {
        return find('findOne', { _id: id }, 'BookSchemaModel')
            .then(book => {                
                if (!book) { throw { message: 'Incorrect ID.', status: 400 }; }
                if (book.count < 1) { throw { message: 'Not available.', status: 400 }; }
                
                return update(
                        { _id: id },
                        { count: book.count - 1 },
                        'BookSchemaModel'
                    ).then(book => {
                        if (!book) { throw { message: 'Incorrect ID.', status: 400 }; }

                        return book;
                    });
            });
    }

    function returned(id) {
        return find('findOne', { _id: id }, 'BookSchemaModel')
            .then(book => {
                if (!book) { throw { message: 'Incorrect ID.', status: 400 }; }

                return update(
                        { _id: id },
                        { count: book.count + 1 },
                        'BookSchemaModel'
                    ).then(result => {
                        if (!result) { throw { message: 'Incorrect ID.', status: 400 }; }

                        return result;
                    });
            });
    }

    function find(findAllOrOne, query, SchemaModel) {
        if (query.options !== undefined) {
            return self[SchemaModel][findAllOrOne](query.data, query.options);
        }

        return self[SchemaModel][findAllOrOne](query);
    }
    
    function checkAdmin(query) {        
        return self.UserSchemaModel.findOne(query)
            .then(user => {                
                let data = {
                    admin: true,
                    id: user._id
                };

                if (!user || user.post !== 'Administrator') { data.admin = false; }
                
                return data;
            });
    }

    function update(query, data, SchemaModel) {
        return self[SchemaModel].findOneAndUpdate(query, data, { multi: true });
    }

    function add(data, SchemaModel, isAdmin) {
        const newData = new self[SchemaModel](data);
        if (isAdmin) {
            return checkAdmin({ username: data.login })
                .then(result => {
                    if (!result.admin) { throw { message: 'No access.', status: 403 }; }

                    return newData.save()
                        .then(book => {                     
                            if (!book) { throw { message: 'Unknown error.', status: 500 }; }

                            return book;
                        });
                });
        }

        return newData.save()
            .then(book => {
                if (!book) { throw { message: 'Unknown error.', status: 500 }; }
                return book;
            });
    }

    function checkBook(data, error, takeBook) {
        return find('findOne', {
                    userid: data.userid,
                    books: {
                        $elemMatch: { 
                            bookid: data.bookid,
                        }
                    }
                },
                'TakenBookSchemaModel'
            ).then(user => {
                console.log(user);
                
                if (takeBook && user) {
                    throw error;
                } else if (!takeBook && !user) {
                    throw error;
                }

                return user;
            });
    }
}