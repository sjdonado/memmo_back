module.exports = {
  server: {
    hostname: process.env.HOSTNAME,
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
  firebase: {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  },
};
