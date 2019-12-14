// Create an object using keys and values obtained from command line.  Output
// object in JSON format and as URI encoded text

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var done = false;
var json_object = {};

const getJsonValues = async () => {
  let i = 1;
  let key,
    value = '';
  let urlArray = [];

  while (!done) {
    if (i % 2) {
      key = await getResponse('Enter object key or "q" when finished:');
    } else {
      value = await getResponse('Enter value:');
    }
    i++;

    if (key === 'q' || value === 'q') {
      done = true;
    } else {
      if (value === 'array') {
        let arrayDone = false;
        while (!arrayDone) {
          arrayVal = await getResponse(
            'Enter array value or "q" when finished:'
          );
          if (arrayVal === 'q') {
            arrayDone = true;
          } else {
            urlArray.push(arrayVal);
          }
        }
      }

      if (key && value) {
        if (value === 'array') {
          json_object[key] = urlArray;
          urlArray = [];
        } else {
          json_object[key] = value;
        }
        key = '';
        value = '';
      }
    }
  }
  rl.close();

  console.log(JSON.stringify(json_object));
  console.log(encodeURI(JSON.stringify(json_object)));
};

async function getResponse(prompt) {
  const response = await new Promise((resolve, reject) => {
    rl.question(prompt + '\n', response => {
      resolve(response);
    });
  });
  return response;
}

getJsonValues();
