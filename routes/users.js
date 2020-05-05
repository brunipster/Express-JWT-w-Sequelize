var express = require('express');
var bcrypt = require('../utils/crypt')
var security = require('../middlewares/security')
var jwt = require('../utils/jwt')
var router = express.Router();

const db = require('./../models');


/* GET users listing. */
router.get('/me', security.validateJWT, function (req, res, next) {
  const { jwt } = req
  try {
    db.User.findOne({
      where: {
        id: jwt.id
      }
    }).then((user) => {
      res.status(200).send(user);
    }).catch(err => {
      res.status(500).send(err);
    })
  } catch (error) {
    res.status(500).send(error);
  }

});

router.post('/register', function (req, res, next) {
  const { body } = req
  try {
    const { firstName, lastName, email, phone, password, confirmationPassword } = body
    if (firstName && lastName && email && phone && password && confirmationPassword) {
      if (password != confirmationPassword) {
        res.status(400).send("password confirmation not valid");
      } else {
        bcrypt.hashPassword(password).then(hashPassword => {
          db.User.create({ firstName, lastName, email, phone, password: hashPassword }).then(user => {
            if (user) res.status(201).send("user created")
            else res.status(500).send("user not created")
          }).catch(err => {
            res.status(500).send(err);
          })
        })
      }
    } else {
      res.status(400).send("Malformed Request Body");
    }
  } catch (error) {
    res.status(500).send(err);
  }
});

router.post('/auth', function (req, res, next) {
  const { body } = req
  try {
    db.User.findOne({
      attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'password'],
      where: {
        email: body.email
      }
    }).then((user) => {
      if (user) {
        bcrypt.comparePassword(body.password, user.password).then(result => {
          if (result) {
            jwt.generateJWT({
              expiresIn: 60,
              id: user.id
            }).then(rest => {
              res.status(200).send({ token: rest });
            }).catch(err => {
              res.status(500).send("error on generate token");
            });
          } else {
            res.status(401).send("invalid user");
          }
        }).catch(err => {
          res.status(401).send("invalid user");
        })
      } else {
        res.status(401).send("invalid user");
      }

    }).catch((err) => {
      res.status(500).send(err);
    })
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }


});

module.exports = router;
