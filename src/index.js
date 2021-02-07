const http = require('http');
const jsonHandler = require('./jsonResponses.js');
const htmlHandler = require('./htmlResponses.js');

// console.log('First web service starting up ...');

// 1 - pull in the HTTP server module

// 2 - pull in URL and query modules (for URL parsing)
// const url = require('url');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndexResponse,
  '/random-number': jsonHandler.getRandomNumberResponse,
  notFound: htmlHandler.get404Response,
};

// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  const baseUrl = `http://${request.headers.host}/`;
  const parsedUrl = new URL(request.url, baseUrl);
  const params = parsedUrl.searchParams;
  const { pathname } = parsedUrl;

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
