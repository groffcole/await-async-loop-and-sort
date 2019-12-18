const uuid = require("uuid/v4");

module.exports.main = async () => {
  let resultPromises = [];

  for (let i = 0; i < 5; i++) {
    const resultPromise = getTwoUuids(i);
    resultPromises.push(resultPromise);
  };

  await Promise.all(resultPromises);

  console.log(`DONE`);
}

const getTwoUuids = async (i) => {
  await sleep();
  console.log(`i: ${i}`);

  return {
    Items: [
      { uuid: { S: uuid() } },
      { uuid: { S: uuid() } }
    ]
  }
};

const sleep = async () => {
  const thePromise = new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * Math.floor(1000))));
  return thePromise;
}