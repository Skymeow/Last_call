const router      = require('express').Router();
const AuthService = require('../../services/auth');
const controller  = require('./controller');

// GET Routes

router.get('/', controller.index);

router.get('/new', controller.new);

router.get('/login', controller.login);

router.get('/:id', controller.show);

router.get('/restricted', controller.authorizeToken);

// POST Routes

router.post('/authenticate', controller.process_login);

router.post('/', controller.create);

module.exports = router;
