let myPromise = new Promise((resolve, reject) => {
  let itsDone = true;
  itsDone ? resolve('It´s done!') : reject('I´m not ready yet...');
});

export default myPromise;