const admin = require('firebase-admin');
const GeoFire = require('geofire');

const { firebase } = require('../config');

admin.initializeApp({
  databaseURL: `https://${firebase.project_id}.firebaseio.com`,
  credential: admin.credential.cert(firebase),
});

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

const Coordinate = db.collection('coordinates');

const getDistance = (userLocation, location) =>
  GeoFire.distance(
    [userLocation.lat, userLocation.lng],
    [location.lat, location.lng]
  ) * 1000;

module.exports = {
  db,
  Coordinate,
  getDistance,
};
