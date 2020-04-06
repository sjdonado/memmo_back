const admin = require('firebase-admin');
const { GeoFirestore } = require('geofirestore');

const { firebase } = require('../config');

admin.initializeApp({
  databaseURL: `https://${firebase.project_id}.firebaseio.com`,
  credential: admin.credential.cert(firebase),
});

const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

const geofirestore = new GeoFirestore(firestore);
const coordinatesCollection = firestore.collection('coordinates');
const geocollection = geofirestore.collection('coordinates');

module.exports = {
  firestore,
  geocollection,
  coordinatesCollection,
};
