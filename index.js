require('zone.js');
const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      getParam   = require("./util/common"),
      middleware = require('./Middleware/index'),
      upload     = require('express-fileupload'),
      port       = getParam("port", 4000),
      dbMlab     = "mongodb://admin:vlad12345@ds245170.mlab.com:45170/mydb",
      dbMlabTest = "mongodb://admin:vlad12345@ds121088.mlab.com:21088/unittest",
      db         = getParam("local", dbMlab);

mongoose.connect(db, { useNewUrlParser: true }, err => {
    if (err) return console.log("Connection error: ", err.message);
});

app.use(express.static(__dirname + '/public_chameleon47'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload());

app.use(middleware.token);
app.use(middleware.zone);

//route
app.use('/', require(__dirname + '/controller/index').router);

app.use(middleware.notFoundUrl);
app.use(middleware.internalError);

app.listen(port, () => {
    console.log(`Start server on ${port} port`);
});
