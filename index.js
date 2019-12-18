const uuid = require("uuid/v4");

module.exports.main = async () => {
  let resultPromises = [];

  for (let i = 0; i < 5; i++) {
    const resultPromise = getItems(i);
    resultPromises.push(resultPromise);
  };

  const firstAwaitedPromises = await Promise.all(resultPromises);
  const secondAwaitedPromises = await Promise.all(firstAwaitedPromises);
  console.log(`secondAwaitedPromises: ${JSON.stringify(secondAwaitedPromises)}`);

  console.log(`DONE`);
}

const getItems = async (i) => {
  await sleep();
  console.log(`i: ${i}`);

  return {
    Items: [
      {
        uuid: { S: uuid() },
        date: { S: new Date(new Date().setDate(new Date().getDate() - i)).toISOString() }
      }
    ]
  }
};

const sleep = async () => {
  const thePromise = new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * Math.floor(1000))));
  return thePromise;
}