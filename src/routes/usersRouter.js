const router = require('express').Router();

const { authentication } = require('../services/auth');
const {
  sendPhoneCode,
  checkPhoneCode,
  login,
  updateStatusToPositive,
} = require('../controllers/usersController');

router.post('/phone/sendcode', sendPhoneCode);
router.post('/phone/checkcode', checkPhoneCode);

router.post('/login', authentication, login);

router.put('/:id/positive', updateStatusToPositive);

module.exports = router;
