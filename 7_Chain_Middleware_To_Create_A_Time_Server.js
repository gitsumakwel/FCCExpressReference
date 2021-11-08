/*
Chain Middleware to Create a Time ServerPassed

Middleware can be mounted at a specific route using app.METHOD(path, middlewareFunction).
Middleware can also be chained inside route definition.

Look at the following example:

app.get('/user', function(req, res, next) {
  req.user = getTheUserSync();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.send(req.user);
});

This approach is useful to split the server operations into smaller units.
That leads to a better app structure, and the possibility to reuse code in different places.
This approach can also be used to perform some validation on the data.
At each point of the middleware stack you can block the execution of the current chain
and pass control to functions specifically designed to handle errors.
Or you can pass control to the next matching route, to handle special cases.
We will see how in the advanced Express section.

In the route app.get('/now', ...) chain a middleware function and the final handler.
In the middleware function you should add the current time to the request object in the req.time key.
You can use new Date().toString(). In the handler, respond with a JSON object, taking the structure {time: req.time}.

Note: The test will not pass if you don’t chain the middleware.
If you mount the function somewhere else, the test will fail, even if the output result is correct.

*/


var express = require('express');
var app = express();

console.log("Hello World");

//will send a text message if the user will guess to input index.html in the URL
// webpage/index.html
const handler = (req,res) => {
  res.send('Hello Express');
}
//will show or respond with index.html
// webpage
const indexhandler = (req,res) => {
  const absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
}
// will respond with a json message
// webpage/json
const jsonhandler = (req,res,next) => {

  let message = "Hello json";

  if (process.env.MESSAGE_STYLE==='uppercase') {
      message = message.toUpperCase();
  }
  res.json({"message": message});
  //const absolutePath = __dirname + '/views/index.html';
  //res.sendFile(absolutePath);
}
//settimehandler & gettimehandler
//to demonstrate chain middleware
// we need to invoke next(), to fireup next handler
const settimehandler = (req,res,next) => {
  req.time = new Date().toString();
  next();
}
const gettimehandler = (req,res) => {
  res.json({time: req.time});
}

//takes 3 arguments
//request object, response object, next function
const posthandler = (req,res,next) => {
    //log the request
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    // you need to declare next(), coz your server will get stuck to this function
    next();
}

//app.use
//use to include static assets needed by your application (stylesheets, scripts, images)
// will be invoke for /public request
app.use('/public',express.static(__dirname + '/public'));
// will be called for any request
app.use(posthandler);
// setup routes and handler for each route
app.get("/index.html",handler) //handler will be called for /index.html request
app.get("/",indexhandler); //root level of our webpage, will invoke at root level request
app.get("/json",jsonhandler); //root/json - webpage/json, will invoke at /json request
app.get("/now",settimehandler,gettimehandler) //root/now - webpage/now, will invoket at /now request

//app.listen(1555); //change for different challenge 3000 is not allowed in fcc challenge
























 module.exports = app;
