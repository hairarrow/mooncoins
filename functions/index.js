const functions = require("firebase-functions");
const admin = require("firebase-admin");
const request = require("request-promise");

admin.initializeApp();
const env = functions.config();
const db = admin.firestore();

async function createList() {
  const { docs: Lists } = await db
    .collection("Lists")
    .orderBy("createdOn", "desc")
    .limit(1)
    .get();
  const { docs: Currencies } = await db
    .collection("Currencies")
    .orderBy("quote.USD.percent_change_24h", "desc")
    .limit(10)
    .get();
  const list = [...Currencies].map(({ id }) =>
    db.collection("Currencies").doc(id)
  );

  let shouldUpdateList = true;

  if (Lists.length) {
    const { list: latestList } = await Lists[0].data();
    shouldUpdateList = latestList
      .map(({ id }, idx) => {
        return id === list[idx].id;
      })
      .every(changed => !changed);
  }

  if (shouldUpdateList)
    await db
      .collection("Lists")
      .add({ list, createdOn: admin.firestore.Timestamp.fromDate(new Date()) });
  return { success: true, updatedList: shouldUpdateList };
}

exports.createList = functions.https.onRequest(async (_, res) => {
  try {
    const { success, updatedList } = await createList();
    res.status(200).send({ success, updatedList });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, error });
  }
});

async function sync() {
  const qs = {
    start: "1",
    // convert: "USD,EUR,BTC", // Current plan is limited to 1 conversion
    convert: "USD",
    sort: "percent_change_24h",
    sort_dir: "desc"
  };
  const options = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    headers: {
      "X-CMC_PRO_API_KEY": env.coinmk.key
    },
    json: true,
    gzip: true,
    qs
  };

  const { data } = await request(options);

  await Promise.all(
    data.map(async c => {
      const { id, ...coinData } = c;
      const { exists } = await db
        .collection("Currencies")
        .doc(String(id))
        .get();
      const Coin = db.collection("Currencies").doc(String(id));
      if (exists) await Coin.update({ ...coinData });
      else await Coin.create({ ...coinData });
    })
  );
  await createList();

  return { success: true };
}

exports.sync = functions.https.onRequest(async (_, res) => {
  try {
    const { success } = await sync();
    res.status(200).send({ success });
  } catch (error) {
    console.error(error);
    res.status(400).send({ success: false, error });
  }
});

exports.scheduledSync = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(() => sync);
