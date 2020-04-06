/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
const models = require('../database/models');
const {
  geocollection,
  coordinatesCollection,
} = require('../services/firebase');

models.sequelize.authenticate();
models.sequelize.sync();

async function updateInteractions() {
  try {
    const snapshot = await coordinatesCollection.get();
    let docs = snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
    let i = 0;
    let nearSnapshot;
    let docsRemoved;
    const newInteractions = [];
    while (docs.length > 0) {
      if (docs[i].data.d) {
        const { coordinates, timestamp, userId } = docs[i].data.d;
        nearSnapshot = await geocollection
          .near({
            center: coordinates,
            radius: 0.002,
          })
          .get();

        const nearDocs = nearSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        docsRemoved = [];
        await Promise.all(
          nearDocs.map(async (doc) => {
            const interaction = await models.Interaction.create({
              lat: coordinates.latitude,
              lng: coordinates.longitude,
              date: timestamp.toDate(),
              firstUserId: userId,
              secondUserId: doc.data.userId,
            });
            newInteractions.push(interaction);
            docsRemoved.push(doc.id);
            await coordinatesCollection.doc(doc.id).delete();
          })
        );
        console.log('docsRemoved =>', docsRemoved);
        docs = docs.filter(({ id }) => !docsRemoved.includes(id));
      }
      await coordinatesCollection.doc(docs[i].id).delete();
      i += 1;
    }
    return newInteractions.length;
  } catch (err) {
    return err;
  }
}

if (typeof require !== 'undefined' && require.main === module) {
  updateInteractions()
    .then((res) => console.log('res =>', res))
    .catch((err) => console.log(err));
}

module.exports = updateInteractions;
