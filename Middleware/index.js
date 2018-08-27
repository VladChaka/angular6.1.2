let jwt = require('jsonwebtoken');

function Middleware () {
    let self = this;

    self.cors = (req, res, next) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    }

    self.token = (req, res, next) => {
        if (req.path === '/login') {
            next();
            return;
        }
        
        const token = req.body.token || req.query.token || req.headers['x-access-token'];	
        if (token) {
            jwt.verify(token, "yqawv8nqi5", function(err, decoded) {
                if (err) {
                    return res.status(403).json({ error: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(401).json({ error: 'No token provided.' });
        }
    }
    
    self.zone = (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers['x-access-token'],
              decoded = jwt.decode(token) || '';

        Zone.current.fork({}).run(() => {
            Zone.current.data = {
                username: req.body.username || '',
                login: decoded.username || '',
                email: req.body.email || '',
                phone: req.body.phone || '',
                post: req.body.post || '',
                password: req.body.password || '',
                fullname: req.body.fullname || ''
            }
            next();
        });
    }

    self.notFoundUrl = (req, res, next) => {
        res.status(404);
        console.log(`Not found URL: ${req.url}`);
        res.send({ error: 'Not found' });
        next();
    }

    self.internalError = (err, req, res, next) => {
        res.status(err.status || 500);
        console.log(`Internal error(${res.statusCode}): ${err.message}`);
        res.send({ error: err.message });
        return;
    }
}

module.exports = new Middleware();