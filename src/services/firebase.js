const admin = require('firebase-admin');
const GeoFire = require('geofire');

// eslint-disable-next-line node/no-unpublished-require
const serviceAccount = require('../../service_account.json');

const { firebase } = require('../config');

admin.initializeApp({
  databaseURL: `https://${firebase.projectID}.firebaseio.com`,
  credential: admin.credential.cert(serviceAccount),
});

// const storage = admin.storage().bucket(`gs://${firebase.projectID}.appspot.com`);

const db = admin.database().ref();
const geoFire = new GeoFire(db);

const getDistance = (userLocation, location) =>
  GeoFire.distance(
    [userLocation.lat, userLocation.lng],
    [location.lat, location.lng]
  ) * 1000;

module.exports = {
  db,
  firebase,
  geoFire,
  getDistance,
};
