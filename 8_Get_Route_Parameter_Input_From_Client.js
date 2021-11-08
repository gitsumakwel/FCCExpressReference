/*
Get Route Parameter Input from the ClientPassed

When building an API, we have to allow users to communicate to us what they want to get from our service.
For example, if the client is requesting information about a user stored in the database,
they need a way to let us know which user they're interested in.
One possible way to achieve this result is by using route parameters.
Route parameters are named segments of the URL, delimited by slashes (/).
Each segment captures the value of the part of the URL which matches its position.
The captured values can be found in the req.params object.

    route_path: '/user/:userId/book/:bookId'
    actual_request_URL: '/user/546/book/6754'
    req.params: {userId: '546', bookId: '6754'}

Build an echo server, mounted at the route GET /:word/echo.
Respond with a JSON object, taking the structure {echo: word}.
You can find the word to be repeated at req.params.word.
You can test your route from your browser's address bar,
visiting some matching routes, e.g. your-app-rootpath/freecodecamp/echo.
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
const settimehandler = (req,res,next) => {
  req.time = new Date().toString();
  next();
}
const gettimehandler = (req,res) => {
  res.json({time: req.time});
}
//handle input from client
const echohandler = (req,res) => {
  res.json({echo: req.params.word});
}

//takes 3 arguments
//request object, response object, next function
const posthandler = (req,res,next) => {
    //log the request
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    // you need to declare, coz your server will get stuck
    next();
}


//app.use - only for GET request
//use to include static assets needed by your application (stylesheets, scripts, images)
app.use('/public',express.static(__dirname + '/public'));
//
app.use(posthandler);

//setup routes and handlers for each route
app.get("/index.html",handler)
app.get("/",indexhandler); //root level of our webpage
app.get("/json",jsonhandler); //root/json - webpage/json
app.get("/now",settimehandler,gettimehandler); //root/now - webpage/now
app.get("/:word/echo",echohandler); //root/:word/echo - webpage/:word/echo
//app.listen(1555); //change for different challenge 3000 is not allowed in fcc challenge
























 module.exports = app;
