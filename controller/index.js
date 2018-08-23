let express = require('express'),
    Core = require("../util/dataCore"),
    userDataServise = Core.userDataServise,
    libraryDataService = Core.libraryDataService,
    photoDataService = Core.photoDataService,
    router = express.Router(),
    token__module = require('../util/token/token'),
    path = require('path');

router.get('/token', token__module, (req, res) => res.status(200).json({ status: 'ok' }));

/**
 * Users
 */

router.post('/login', (req, res) => {
    const data = {
        username: Zone.current.data.username,
        password: Zone.current.data.password
    };
    userDataServise.login(data)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json({ error: err.message }));
});

router.get('/users', (req, res) => {
    let username = Zone.current.data.login; 
    userDataServise.findAll(username)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/users/:userId', (req, res) => {
    userDataServise.findOne(req.params.userId)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.post('/users', (req, res) => {
    let data = {
        username: Zone.current.data.username,
        email: Zone.current.data.email,
        post: Zone.current.data.post,
        phone: Zone.current.data.phone,
        password: Zone.current.data.password,
        fullname: Zone.current.data.fullname,
        rating: '0',
        regDate: Date.now(),
        photo: 'standart.png'
    };
    
    userDataServise.add(data)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.put('/users/:userId', (req, res) => {
    let data = {
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
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.delete('/users/:userId', (req, res) => {
    let data = {
        id: req.params.userId,
        login: Zone.current.data.login
    };    
    userDataServise.delete(data)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

/**
 * Library
 */

router.get('/users/:userId/books', (req, res) => {
    libraryDataService.getUserBooks(req.params.userId)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.put('/users/:userId/books/:bookId', (req, res) => {
    let data = {
        login: Zone.current.data.login,
        userId: req.params.userId,
        bookId: req.params.bookId
    };    
    libraryDataService.takeBook(data)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.delete('/users/:userId/books/:bookId', (req, res) => {
    let data = {
        login: Zone.current.data.login,
        userId: req.params.userId,
        bookId: req.params.bookId
    };    
    libraryDataService.returnBook(data)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.get('/books', (req, res) => {
    libraryDataService.getAll()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/books/:bookId', (req, res) => {
    libraryDataService.getOne(req.params.bookId)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.post('/books', (req, res) => {
    let data = {
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
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.put('/books/:bookId', (req, res) => {
    let data = {
        bookname: req.body.bookname,
        count: req.body.count
    };    
    libraryDataService.update(data)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

/**
 * Photo
 */

router.get('/users/:userId/photo', (req, res) => {
    let data = {
        id: req.params.userId,
        user: true
    };
    photoDataService.getPhoto(data)
    .then(result => res.status(200).sendFile(`${result}`))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.put('/users/:userId/photo', (req, res) => {
    if (!req.files) return res.status(400).json({ error: 'No files uploaded.' });
    let data = {
        name: Zone.current.data.username,
        login: Zone.current.data.login,
        photo: req.files.image,
        user: true
    };
    photoDataService.upadtePhoto(data)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.get('/books/:bookId/photo', (req, res) => {
    let data = {
        id: req.params.bookId,
        user: false
    };
    photoDataService.getPhoto(data)
    .then(result => res.status(200).sendFile(`${result}`))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

router.put('/books/:bookId/photo', (req, res) => {
    if (!req.files) return res.status(400).json({ error: 'No files uploaded.' });
    let data = {
        name: req.body.bookname,
        photo: req.files.image,
        user: false,
        login: Zone.current.data.login
    };
    photoDataService.upadtePhoto(data)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status).json({ error: err.message }));
});

module.exports.router = router;
