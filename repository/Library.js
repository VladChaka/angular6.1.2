let mongoose = require("mongoose"),
    Core = require("../util/dataCore").Core,
    Schema = mongoose.Schema;

Core.module('app').service('app.libraryRepository', Library);

function Library(){
    let self = this;

    self.BookSchema = new Schema({
        username: {
            type: String,
            unique: true,
            required: true
        },
        bookname: {
            type: String,
            required: true
        },
        dateReceiving: {
            type: String,
            required: true
        }
    });	

    self.SchemaModel = mongoose.model("Book", self.BookSchema);

    self.take = () => {
        let new_book = new self.SchemaModel({
            username: Zone.current.data.username,
            bookname: Zone.current.data.bookname,
            dateReceiving: Date.now() + ''

        });
                
        return new Promise((resolve, reject) => {
            new_book.save()
            .then(() => resolve({ message: 'Ok' }))
            .catch((err) => reject({ message: err.message, status: 500 }));

        });
    }

    self.return = () => {
        return new Promise((resolve, reject) => {
            self.getOne()
            .then((user) => {
                if (user.booknnme === Zone.current.data.bookname) {
                    reject({ message: 'User don\'t  have this book.', status: 400 });
                    return;
                }

                self.SchemaModel.findOneAndRemove({ username: Zone.current.data.username })
                .then(() => resolve({ message: 'Ok' }))
                .catch((err) => reject({ message: err.message, status: 500 }));
            })
            .catch((err) => reject({ message: err.message, status: 400 }));
        });
    }

    self.getOne = () => {
        return new Promise((resolve, reject) => {            
            self.SchemaModel.findOne({ username: Zone.current.data.username })
            .then((user) => {
                resolve(user);
            })
            .catch((err) => reject({ message: err.message, status: 400 }));
        });
    }
}
