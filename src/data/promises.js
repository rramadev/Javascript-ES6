let myPromise = (numToDouble) => {
  return new Promise((resolve, reject) => {
    // Fake waiting time, 5s...
    setTimeout( () => {      
      let double = numToDouble * 2;
      // Number successfully doubled, well done! now lets resolve the Promise...
      let itsDone = true;
      itsDone ? resolve('It´s done!: ' + double) : reject('I´m not ready yet...');    
    }, 5000);
  });
};

export default myPromise;