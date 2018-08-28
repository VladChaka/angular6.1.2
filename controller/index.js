const express            = require('express'),
      Core               = require("../repository/core/dataCore"),
      response           = Core.middleware.response,
      userDataServise    = Core.userDataServise,
      libraryDataService = Core.libraryDataService,
      photoDataService   = Core.photoDataService,
      router             = express.Router();

/**
 * Token
 */

router.get('/token', (req, res) => {
    const data = { login: Zone.current.data.login };

    userDataServise.getOne(data)
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
    userDataServise.getAll(Zone.current.data.login)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.get('/users/:userid', (req, res) => {
    let data = {
        login: Zone.current.data.login,
        id: req.params.userid  
    };
    
    userDataServise.getOne(data)
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

router.put('/users/:userid', (req, res) => {
    const data = {
        id: req.params.userid,
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

router.delete('/users/:userid', (req, res) => {
    const data = {
        login: Zone.current.data.login,
        id: req.params.userid
    };

    userDataServise.delete(data)
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

router.get('/books/:bookid', (req, res) => {
    libraryDataService.getOne(req.params.bookid)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.delete('/books/:bookid', (req, res) => {
    const data = {
        id: req.params.bookid,
        login: Zone.current.data.login
    };
    
    libraryDataService.delete(data)
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

router.put('/books/:bookid', (req, res) => {
    const data = {
        bookid: req.params.bookid,
        bookname: req.body.bookname,
        count: req.body.count
    };    

    libraryDataService.update(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.get('/users/:userid/books', (req, res) => {
    let data = {
        login: Zone.current.data.login,
        id: req.params.userid
    };
    
    libraryDataService.getUserBooks(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.put('/users/:userid/books/:bookid', (req, res) => {
    const data = {
        login: Zone.current.data.login,
        userid: req.params.userid,
        bookid: req.params.bookid
    };

    libraryDataService.takeBook(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.delete('/users/:userid/books/:bookid', (req, res) => {
    const data = {
        login: Zone.current.data.login,
        userid: req.params.userid,
        bookid: req.params.bookid
    };

    libraryDataService.returnBook(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

/**
 * Photo
 */

router.get('/users/:userid/photo', (req, res) => {
    const data = {
        login: Zone.current.data.login,
        id: req.params.userid,
        user: true
    };

    photoDataService.getPhoto(data)
        .then(result => res.status(200).sendFile(`${result}`))
        .catch(err => response(res, err, true));
});

router.put('/users/:userid/photo', (req, res) => {
    if (!req.files) { return response(res, { message: 'No files uploaded.', status: 400 }, true); }

    const data = {
        login: Zone.current.data.login,
        id: req.params.userid,
        photo: req.files.image,
        user: true
    };

    photoDataService.upadtePhoto(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});

router.get('/books/:bookid/photo', (req, res) => {
    const data = {
        login: Zone.current.data.login,
        id: req.params.bookid,
        user: false
    };

    photoDataService.getPhoto(data)
        .then(result => res.status(200).sendFile(`${result}`))
        .catch(err => response(res, err, true));
});

router.post('/books/:bookid/photo', (req, res) => {
    if (!req.files) { return response(res, { message: 'No files uploaded.', status: 400 }, true); }

    const data = {
        login: Zone.current.data.login,
        id: req.params.bookid,
        photo: req.files.image,
        user: false
    };

    photoDataService.upadtePhoto(data)
        .then(result => response(res, result, false))
        .catch(err => response(res, err, true));
});



router.delete('/test/:userid/test/:bookid', (req, res) => {
    const data = {
        userid: req.params.userid,
        bookid: req.params.bookid
    };
    
    libraryDataService.test(data)
});

module.exports.router = router;
