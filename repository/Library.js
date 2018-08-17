let mongoose = require("mongoose"),
    Core = require("../util/dataCore").Core,
    Schema = mongoose.Schema;

Core.module('app').service('app.libraryRepository', Library);

function Library(){
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
        }
    });	

    self.SchemaModel = mongoose.model("Book", self.BookSchema);

    self.getAll = () => {
        return new Promise((resolve, reject) => {            
            self.SchemaModel.find({ count: { $gt: 0 } })
            .then((books) => resolve(books))
            .catch((err) => reject({ message: err.message, status: 400 }));
        });
    }

    self.getOne = (book) => {
        return new Promise((resolve, reject) => {
            self.SchemaModel.findOne({ bookname: book })
            .then((book) => resolve(book))
            .catch((err) => reject({ message: err.message, status: 400 }));
        });
    }

    self.add = (bookData) => {
        return new Promise((resolve, reject) => {
            const new_book = new self.SchemaModel(bookData);
            console.log(new_book);
            
            new_book.save()
            .then(book => resolve(book))
            .catch(err => {console.log(err.message); reject({ message: err.message, status: 500 })});
        });
    }

    self.update = (bookData) => {
        return new Promise((resolve, reject) => {
            self.SchemaModel.findOneAndUpdate(
                { bookname: bookData.bookname },
                bookData
            )
            .then((book) => resolve(book))
            .catch((err) => reject({ message: err.message, status: 400 }));
        });
    }

    self.take = (bookname) => {
        return new Promise((resolve, reject) => {
            self.SchemaModel.findOne({ bookname: bookname })
            .then((book) => {
                self.SchemaModel.findOneAndUpdate(
                    { bookname: book.bookname },
                    { count: book.count - 1 }
                )
                .then((book) => resolve(book))
                .catch((err) => reject({ message: err.message, status: 400 }));
            })
            .catch((err) => reject({ message: err.message, status: 400 }));
            
        });
    }

    self.return = (bookname) => {
        return new Promise((resolve, reject) => {
            self.SchemaModel.findOne({ bookname: bookname })
            .then((book) => {
                self.SchemaModel.findOneAndUpdate(
                    { bookname: book.bookname },
                    { count: book.count + 1 }
                )
                .then((book) => resolve(book))
                .catch((err) => reject({ message: err.message, status: 400 }));
            })
            .catch((err) => reject({ message: err.message, status: 400 }));
            
        });
    }
}
