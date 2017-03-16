const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const User = require('../../models/user');

const controller = {};

controller.index = (req, res) => {
  User
    .findAll()
    .then((data) => res.json({ user: data }))
    .catch((err) => console.log('ERROR', err));
};

controller.new = (req, res) => {
  res.render('users/new');
};

controller.authorizeToken = (req, res) => {
  jwt.verify(req.headers.authorization, "taco cat", (err, decoded) => {
    if (err) {
      res
      .status(401)
      .json({ error: err.message });
    } else {
      res.json({ message: "This is restricted content coming from the Node Server."})
    }
  });
}

controller.show = (req, res) => {
  User
    .findById(req.params.id)
    .then((data) => {
      res.render('users/show', { users: data });
      console.log(data);
    })
    .catch((err) => console.log('ERROR', err));
};

controller.create = (req, res) => {
  User
    .create(req.body.user)
    .then((data) => {
      res.status(201)
      .json({ user: data })
    })
    .catch(err => console.log('ERROR', err));
};

controller.login = (req, res) => {
  const error = {};
  // if error exists
  if (req.query.error) error.message = 'Incorrect Login Credentials';
  // send back to login page and render error message
  res.render('users/login', { message: error.message });
}

controller.process_login = (req, res) => {
  User
    .findByEmail(req.body.user)
    .then((user) => {
      // if user exists
      if (user) {
        // compare password with hashed password - will return boolean
        const isAuthed = bcrypt.compareSync(req.body.user.password, user.password_digest);
        if (isAuthed) {
          // create JWT with email from user record with options
          const token = jwt.sign({ email : user.email }, 'taco cat', { expiresIn: '7d' });
          // respond with token
          res.json({ token: token });

        } else {
          // else send user back to login view
          res.sendStatus(401);
        }
      } else {
        res.status(404)
        .json({ error: "No user found "});
      }
    });
}


module.exports = controller;
