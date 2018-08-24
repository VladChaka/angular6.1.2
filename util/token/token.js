const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
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
};

