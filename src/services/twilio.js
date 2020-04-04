const twilio = require('twilio');
const config = require('../config');

const {
  accountSid,
  authToken,
  serviceVerifySid,
  serviceNotificationSid,
  phoneNumber,
} = config.twilio;

const client = twilio(accountSid, authToken);

const sendVerificationTokenToPhone = async (to) => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  const verification = await client.verify.services(serviceVerifySid)
    .verifications
    .create({ to, channel: 'sms' });

  return verification.status;
};

const checkVerificationToken = async (to, code) => {
  if (process.env.NODE_ENV === 'development') {
    return code === '123456' ? 'approved' : 'unapproved';
  }
  const verificationCheck = client.verify.services(serviceVerifySid)
    .verificationChecks
    .create({ to, code });
  return (await verificationCheck).status;
};

const sendCustomSMS = (phone, body) => {
  if (process.env.NODE_ENV === 'development') {
    return { sid: 'test' };
  }
  return client.messages.create({
    messagingServiceSid: serviceNotificationSid,
    from: phoneNumber,
    body,
    to: phone.replace(/\s/g, ''),
  });
};

module.exports = {
  sendVerificationTokenToPhone,
  checkVerificationToken,
  sendCustomSMS,
};
