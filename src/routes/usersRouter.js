const router = require('express').Router();

const { authentication } = require('../services/auth');
const { sendPhoneCode, checkPhoneCode, login } = require('../controllers/usersController');

router.route('/phone')
  .post('sendcode', sendPhoneCode)
  .post('checkcode', checkPhoneCode);

router.post('/login', authentication, login);

module.exports = router;
