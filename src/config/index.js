module.exports = {
  server: {
    port: process.env.PORT,
    secret: process.env.APP_SECRET,
    pagination: {
      defaultLimit: 10,
    },
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    serviceVerifySid: process.env.TWILIO_SERVICE_VERIFY_SID,
    serviceNotificationSid: process.env.TWILIO_SERVICE_NOTIFICATION_SID,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },
};
