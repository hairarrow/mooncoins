const { db, timestamp } = require("../admin");

async function createList() {
  console.info("Checking Top Cryptos");
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
    await db.collection("Lists").add({ list, createdOn: timestamp() });

  console.info(`List was ${shouldUpdateList ? "" : "NOT"} updated.`);
  return { success: true, updatedList: shouldUpdateList };
}

module.exports = createList;
