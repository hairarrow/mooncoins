const functions = require("firebase-functions");
const request = require("request-promise");
const createList = require("../list/createList");
const { db } = require("../admin");
const env = functions.config();

async function sync() {
  const qs = {
    start: "1",
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
  .schedule("every 1 minutes")
  .onRun(sync);
