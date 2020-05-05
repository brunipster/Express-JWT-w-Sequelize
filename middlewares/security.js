var jwt = require('../utils/jwt')

const validateJWT = (req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
        try {
            jwt.verifyJWT(token).then(decoded => {
                req.jwt = decoded;
                next();
            }).catch(err => {
                return res.status(401).json({ mensaje: 'Unauthorized' });
            });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }

    } else {
        res.send({
            mensaje: 'Token no proveída.'
        });
    }
}

module.exports = { validateJWT }