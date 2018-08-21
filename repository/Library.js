let mongoose = require("mongoose"),
    Core = require("../util/dataCore").Core,
    Schema = mongoose.Schema;

Core.module('app').service('app.libraryRepository', Library);

function Library() {
    let self = this;

    self.BookSchema = new Schema({
        bookname: {
            type: String,
            unique: true,
            required: true
        },
        count: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        released: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: true
        },
        rating: {
            type: String,
            required: true
        }
    });	

    self.SchemaModel = mongoose.model("Book", self.BookSchema);

    self.getAll = () => {
        return new Promise((resolve, reject) => {          
            self.SchemaModel.find({ count: { $gt: 0 } })
            .then((books) => resolve(books))
            .catch((err) => reject({ error: err.message, status: 400 }));
        });
    }

    self.getOne = id => {
        return new Promise((resolve, reject) => {
            findOne({ _id: id })
            .then(book => resolve(book))
            .catch(err => reject({ error: err.message, status: 400 }));
        });
    }

    self.add = bookData => {
        return new Promise((resolve, reject) => {
            findOne({ username: bookData.login })
            .then(user => {
                if (user.post !== 'Administrator') {
                    reject({ error: 'No access.', status: 403 });
                    return;
                }

                const new_book = new self.SchemaModel(bookData);

                new_book.save()
                .then(book => resolve(book))
                .catch(err => reject({ error: err.message, status: 500 }));
            })
            .catch(err => reject({ error: err.message, status: 500 }));
        });
    }

    self.update = bookData => {
        return new Promise((resolve, reject) => {
            findOne({ username: bookData.login })
            .then(user => {
                if (user.post !== 'Administrator') {
                    reject({ error: 'No access.', status: 403 });
                    return;
                }

                findOneAndUpdate(
                    { bookname: bookData.bookname },
                    bookData
                )
                .then(book => resolve(book))
                .catch(err => reject({ error: err.message, status: 400 }));
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
                    { bookname: data.bookname },
                    { photo: data.photo.name }
                )
                .then(() => resolve({ message: 'Ok' }))
                .catch(err => reject({ error: err.message, status: 500 }));
            })
            .catch(err => reject({ error: err.message, status: 500 }));
        });
    }

    self.take = id => {
        return new Promise((resolve, reject) => {
            findOne({ _id: id })
            .then(book => {                
                if (book.count === 0 || book.count < 1) {
                    reject({ error: 'Not available.', status: 400 })
                } else {
                    findOneAndUpdate([
                        { bookname: book.bookname },
                        { count: book.count - 1 }
                    ])
                    .then(book => resolve(book))
                    .catch(err => reject({ error: err.message, status: 400 }));
                }
            })
            .catch(err => reject({ error: err.message, status: 400 }));
            
        });
    }

    self.return = id => {
        return new Promise((resolve, reject) => {
            findOne({ _id: id })
            .then(book => {
                findOneAndUpdate(
                    { bookname: book.bookname },
                    { count: book.count + 1 }
                )
                .then(book => resolve(book))
                .catch(err => reject({ error: err.message, status: 400 }));
            })
            .catch(err => reject({ error: err.message, status: 400 }));
            
        });
    }

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
}
