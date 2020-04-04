const { User } = require('../database/models');
const { sendVerificationTokenToPhone, checkVerificationToken } = require('../services/twilio');
const { signToken } = require('../services/auth');

const sendPhoneCode = ({ body }, res, next) => {
  try {
    const { phone } = body;
    const status = sendVerificationTokenToPhone(phone);
    res.json({
      status,
    });
  } catch (err) {
    next(err);
  }
};

const checkPhoneCode = async ({ body }, res, next) => {
  try {
    const { phone, code } = body;
    const status = await checkVerificationToken(phone, code);

    const data = {
      status: status === 'approved',
      token: null,
    };

    if (data.status) {
      const [{ id }] = await User.findOrCreate({
        where: { phone },
        defaults: { phone },
      });

      Object.assign(data, {
        token: signToken(id),
      });
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
};

const login = async ({ user, body }, res, next) => {
  try {
    const { dni } = body;
    if (!dni) {
      await user.update({
        dni,
      });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sendPhoneCode,
  checkPhoneCode,
  login,
};
