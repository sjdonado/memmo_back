const moment = require('moment');
const { User, Interaction } = require('../database/models');
const {
  sendVerificationTokenToPhone,
  checkVerificationToken,
  sendCustomSMS,
} = require('../services/twilio');
const { signToken } = require('../services/auth');
const { ACCOUNT_STATUSES } = require('../utils/enums');

const sendPhoneCode = async ({ body }, res, next) => {
  try {
    const { phone } = body;
    const status = await sendVerificationTokenToPhone(phone);
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
    const { firstName, lastName, dniType, dni } = body;
    await user.update({
      status: ACCOUNT_STATUSES[1],
      firstName,
      lastName,
      dniType,
      dni,
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateStatusToPositive = async ({ params }, res, next) => {
  try {
    const { id } = params;
    const user = await User.findByPk(id);
    const interactions = await Interaction.findAll({
      where: {
        $or: [
          {
            firstUserId: {
              $eq: id,
            },
          },
          {
            secondUserId: {
              $eq: id,
            },
          },
        ],
      },
      individualHooks: true,
    });
    const body =
      'Memmo: Ha marcado positivo una persona que ha estado a menos de 2 metros de ti en los úlitmos 14 días, favor tomar las precauciones pertinentes.';
    await Promise.all(
      interactions.map(async (interaction) => {
        let phone;
        if (moment().diff(interaction.date, 'days') >= 14) {
          if (interaction.firstUser.id === id) {
            phone = interaction.secondUser.phone;
          }
          if (interaction.secondUser.id === id) {
            phone = interaction.firstUser.phone;
          }
          await sendCustomSMS(phone, body);
        }
      })
    );
    await user.update({
      status: ACCOUNT_STATUSES[2],
    });
    res.json(interactions);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sendPhoneCode,
  checkPhoneCode,
  login,
  updateStatusToPositive,
};
