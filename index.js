const uuid = require("uuid/v4");

module.exports.main = async () => {
  let getItemsPromises = [];

  for (let i = 0; i < 5; i++) {
    getItemsPromises.push(getItems(i));
  };

  const resolvedGetItemsPromises = await Promise.all(getItemsPromises);
  const items = resolvedGetItemsPromises
    .flatMap(result => result.Items)
    .map(item => {
      return {
        uuid: item.uuid.S,
        date: new Date(item.date.S)
      }
    });

  const itemsByMostRecent = items.sort((a, b) => b.date - a.date);
  console.log(`itemsByMostRecent: ${JSON.stringify(itemsByMostRecent)}`);
}

const getItems = async (i) => {
  await sleep(2000);
  console.log(`i: ${i}`);

  return {
    Items: [{
      uuid: { S: uuid() },
      date: { S: getRandomDateString(60) }
    }]
  };
};

const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, getRandomNumber(ms)));
};

const getRandomDateString = (daysBackTo) => {
  return new Date(new Date().setDate(new Date().getDate() - getRandomNumber(daysBackTo))).toISOString();
};

const getRandomNumber = (upTo) => {
  return Math.floor(Math.random() * Math.floor(upTo));
};