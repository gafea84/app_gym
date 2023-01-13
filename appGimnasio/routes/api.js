const router = require('express').Router();

const { checkToken } = require('../helpers/middlewares');

router.use('/clients', checkToken, require('./api/clients'));
router.use('/users', require('./api/users'));

module.exports = router;