const express            = require('express'),
      Core               = require("../repository/core/dataCore"),
      middleware         = require('../Middleware/index'),
      response           = middleware.response,
      userDataServise    = Core.userDataServise,
      libraryDataService = Core.libraryDataService,
      photoDataService   = Core.photoDataService,
      router             = express.Router();

/**
 * Token
 */

router.get('/token', (req, res) => {
    userDataServise.findOne('username', Zone.current.data.login)
        .then(user => response(res, user._id, false))
        .catch(err => response(res, err, true));
});

/**
 * Users
 */

router.post('/login', (req, res) => {
    const data = {
        username: Zone.current.data.username,
        password: Zone.current.data.password
    };
    
    userDataServise.login(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.get('/users', (req, res) => {
    userDataServise.findAll(Zone.current.data.login)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.get('/users/:userId', (req, res) => {
    userDataServise.findOne('_id', req.params.userId)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.post('/users', (req, res) => {
    const data = {
        username: Zone.current.data.username,
        email: Zone.current.data.email,
        post: Zone.current.data.post,
        phone: Zone.current.data.phone,
        password: Zone.current.data.password,
        fullname: Zone.current.data.fullname,
        rating: 0,
        regDate: Date.now(),
        photo: 'standart.png'
    };
    
    userDataServise.add(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.put('/users/:userId', (req, res) => {
    const data = {
        id: req.params.userId,
        login: Zone.current.data.login,
        username: Zone.current.data.username,
        email: Zone.current.data.email,
        post: Zone.current.data.post,
        phone: Zone.current.data.phone,
        password: Zone.current.data.password,
        fullname: Zone.current.data.fullname,
        rating: Zone.current.data.rating
    };
    
    userDataServise.update(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.delete('/users/:userId', (req, res) => {
    userDataServise.delete(req.params.userId)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

/**
 * Library
 */

router.get('/books', (req, res) => {
    libraryDataService.getAll()
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.get('/books/:bookId', (req, res) => {
    libraryDataService.getOne(req.params.bookId)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.delete('/books/:bookId', (req, res) => {
    libraryDataService.delete(req.params.userId)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.post('/books', (req, res) => {
    const data = {
        login: Zone.current.data.login,
        bookname: req.body.bookname,
        count: req.body.count,
        description: req.body.description,
        rating: 0,
        author: req.body.author,
        released: req.body.released,
        photo: 'standart.jpg'
    };
    
    libraryDataService.add(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.put('/books/:bookId', (req, res) => {
    const data = {
        bookid: req.params.bookId,
        bookname: req.body.bookname,
        count: req.body.count
    };    

    libraryDataService.update(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.get('/users/:userId/books', (req, res) => {
    libraryDataService.getUserBooks(req.params.userId)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.put('/users/:userId/books/:bookId', (req, res) => {
    const data = {
        login: Zone.current.data.login,
        userId: req.params.userId,
        bookId: req.params.bookId
    };    
    libraryDataService.takeBook(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.delete('/users/:userId/books/:bookId', (req, res) => {
    const data = {
        login: Zone.current.data.login,
        userId: req.params.userId,
        bookId: req.params.bookId
    };    
    libraryDataService.returnBook(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

/**
 * Photo
 */

router.get('/users/:userId/photo', (req, res) => {
    const data = {
        id: req.params.userId,
        user: true
    };
    photoDataService.getPhoto(data)
        .then(result => res.status(200).sendFile(`${result}`))
        .catch(err => response(res, err, true));
});

router.put('/users/:userId/photo', (req, res) => {
    if (!req.files) {
        return response(res, {
                message: 'No files uploaded.',
                status: 400 
            },
            true);
    }

    const data = {
        id: req.params.userId,
        photo: req.files.image,
        user: true
    };

    photoDataService.upadtePhoto(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.get('/books/:bookId/photo', (req, res) => {
    const data = {
        id: req.params.bookId,
        user: false
    };

    photoDataService.getPhoto(data)
        .then(result => res.status(200).sendFile(`${result}`))
        .catch(err => response(res, err, true));
});

router.post('/books/:bookId/photo', (req, res) => {
    if (!req.files) {
        return response(res, {
                message: 'No files uploaded.',
                status: 400 
            },
            true);
    }

    const data = {
        id: req.params.bookId,
        photo: req.files.image,
        user: false,
        login: Zone.current.data.login
    };
    
    photoDataService.upadtePhoto(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

module.exports.router = router;
