let express = require('express'),
    Core = require("../util/dataCore"),
    userDataServise = Core.userDataServise,
    libraryDataService = Core.libraryDataService,
    router = express.Router(),
    token__module = require('../util/token/token'),
    path = require('path');

router.get('/token', token__module, (req, res) => res.status(200).json({ status: 'ok' }));

/**
 * Users
 */

router.post('/login', (req, res) => {
    const userData = {
        username: Zone.current.data.username,
        password: Zone.current.data.password
    };
    userDataServise.login(userData)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json({ error: err.message }));
});

router.get('/users', (req, res) => {
    userDataServise.findAll()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/users/:userId', (req, res) => {
    userDataServise.findOne(req.params.userId)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.post('/users', (req, res) => {
    let userData = {
        username: Zone.current.data.username,
        email: Zone.current.data.email,
        post: Zone.current.data.post,
        phone: Zone.current.data.phone,
        password: Zone.current.data.password,
        fullname: Zone.current.data.fullname,
        rating: '0',
        regDate: Date.now(),
        photo: path.join(__dirname, '..', 'tmp', 'users', 'standart.png')
    };
    
    userDataServise.add(userData)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.put('/users/:userId', (req, res) => {
    let userData = {
        login: Zone.current.data.login,
        username: Zone.current.data.username,
        email: Zone.current.data.email,
        post: Zone.current.data.post,
        phone: Zone.current.data.phone,
        password: Zone.current.data.password,
        fullname: Zone.current.data.fullname,
        rating: Zone.current.data.rating
    };
    
    userDataServise.update(userData)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.post('/users/:userId/photo', (req, res) => {
        if (!req.files) return res.status(400).json({ error: 'No files uploaded.' });
        let username = Zone.current.data.username,
            photo = req.files.image,
            pathToPhoto = path.join(__dirname, '..', 'tmp', 'users', `${username}.${photo.name}`);

        photo.mv(pathToPhoto)
        .then(() => {
            userDataServise.upadtePhoto(pathToPhoto, username)
            .then(() => res.status(200).json(result))
            .catch(err => res.status(err.status).json({ error: err.message }));
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/users/:userId', (req, res) => {
    let userData = {
        id: req.params.userId,
        login: Zone.current.data.login
    };    
    userDataServise.delete(userData)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.get('/users/:userId/books', (req, res) => {
    userDataServise.getBooks(req.params.userId)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.post('/users/:userId/books/:bookId', (req, res) => {
    let userData = {
        userId: req.params.userId,
        bookId: req.params.bookId
    };    
    userDataServise.takeBook(userData)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.put('/users/:userId/books/:bookId', (req, res) => {
    let userData = {
        userId: req.params.userId,
        bookId: req.params.bookId
    };
    userDataServise.returnBook(userData)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

/**
 * Library
 */

router.get('/books', (req, res) => {
    libraryDataService.findAll()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/books/:bookId', (req, res) => {
    libraryDataService.findOne(req.body.bookname)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.post('/books', (req, res) => {
    let bookData = {
        bookname: req.body.bookname,
        count: req.body.count,
        description: req.body.description,
        rating: 0,
        author: req.body.author,
        released: req.body.released,
        photo: path.join(__dirname, '..', 'tmp', 'books', 'standart.png')
    };
    
    libraryDataService.add(bookData)
    .then(result => res.status(200).json(result))
    .catch(err => {console.log(err.message); res.status(err.status).json({ error: err.message })});
});

router.post('/books/:bookId/photo', (req, res) => {
    if (!req.files) return res.status(400).json({ error: 'No files uploaded.' });
    let id = req.params.bookId,
        photo = req.files.image,
        pathToPhoto = path.join(__dirname, '..', 'tmp', 'books', `${id}.${photo.name}`);

    photo.mv(pathToPhoto)
    .then(() => {
        libraryDataService.upadtePhoto(pathToPhoto, id)
        .then(() => res.status(200).json(result))
        .catch(err => res.status(err.status).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.put('/books/:bookId', (req, res) => {
    let bookData = {
        bookname: req.body.bookname,
        count: req.body.count
    };    
    libraryDataService.update(bookData)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

module.exports.router = router;
