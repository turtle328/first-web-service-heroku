const randomNumberJSON = (max = 2) => {
  let max2 = Number(max);
  max2 = !max2 ? 1 : max2;
  max2 = max2 < 1 ? 1 : max2;
  const number = Math.random() * max2;
  const responseObj = {
    timestamp: new Date(),
    number,
  };
  return JSON.stringify(responseObj);
};

const getRandomNumberResponse = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(randomNumberJSON(params.get('max')));
  response.end();
};

module.exports.getRandomNumberResponse = getRandomNumberResponse;
