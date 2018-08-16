require('zone.js');
let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    getParam = require("./util/common"),
    port = getParam("port", 5000),
    dbMlab = "mongodb://admin:vlad12345@ds245170.mlab.com:45170/mydb",
    dbMlabTest = "mongodb://admin:vlad12345@ds121088.mlab.com:21088/unittest",
    jwt = require('jsonwebtoken'),
    token__module = require('./util/token/token'),
    test = require('express-fileupload'),
    db = getParam("local", dbMlab);

mongoose.connect(db, { useNewUrlParser: true }, err => {
    if (err) return console.log("Connection error: ", err.message);
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(test());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(__dirname));
// app.use(express.static(__dirname + '/public_chameleon47'));
// app.use((req, res, next) => {
//     if (req.path !== '/login') {
//         token__module(req, res, next);
//     } else {
//         next();
//     }
// });
app.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'],
          decoded = jwt.decode(token) || '';

    Zone.current.fork({}).run(() => {
        Zone.current.data = {
            id: req.body.id || req.query.id,
            username: req.body.username || decoded.username,
            email: req.body.email || '',
            phone: req.body.phone || '',
            password: req.body.password || '',
            fullname: req.body.fullname || ''
        }
        next();
    });
});

// app.use((req, res, next) => {
//     const token = req.body.token || req.query.token || req.headers['x-access-token'],
//           decoded = jwt.decode(token) || '';
//     console.log(token);
    
//     console.log(req.body.username);
//     console.log(decoded);
//     console.log('========================');
    
//     Zone.current.fork({}).run(() => {
//         Zone.current.data = {
//             id: req.body.id || req.query.id,
//             login: req.body.username || decoded.username,
//             // email: req.body.email || '',
//             phone: req.body.phone || '',
//             password: req.body.password || '',
//             fullname: req.body.fullname || '',
            
//         }
//         next();
//     });
// });

//route
app.use('/', require(__dirname + '/controller/index').router);

app.use((req, res, next) => {
    res.status(404);
    console.log(`Not found URL: ${req.url}`);
    res.send({ error: 'Not found' });
    next();
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(`Internal error(${res.statusCode}): ${err.message}`);
    res.send({ error: err.message });
    return;
});

app.listen(port, () => {
    console.log(`Start server on ${port} port`);
});
