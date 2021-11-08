/*
Get Query Parameter Input from the Client

Another common way to get input from the client is by encoding the data
after the route path, using a query string. The query string is delimited by
a question mark (?), and includes field=value couples.
Each couple is separated by an ampersand (&).
Express can parse the data from the query string, and populate the object req.query.
Some characters, like the percent (%), cannot be in URLs and
have to be encoded in a different format before you can send them.
If you use the API from JavaScript, you can use specific methods to encode/decode these characters.

    route_path: '/library'
    actual_request_URL: '/library?userId=546&bookId=6754'
    req.query: {userId: '546', bookId: '6754'}

Build an API endpoint, mounted at GET /name. Respond with a JSON document,
taking the structure { name: 'firstname lastname'}.
The first and last name parameters should be encoded in a query string
e.g. ?first=firstname&last=lastname.

Note: In the following exercise you are going to receive data from a POST request,
at the same /name route path.

If you want, you can use the method app.route(path).get(handler).post(handler).
This syntax allows you to chain different verb handlers on the same path route.
  You can save a bit of typing, and have cleaner code.

*/
//need to install if you are planning to have a POST request
//dependencies:{"body-parser": "^1.15.2"}
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

//GET request with Client input
//sample:  webpage?first=value&last=value
const getlibraryhandler = (req,res,next) => {
  const first = req.query.first;
  const last = req.query.last;
  res.json({ name: `${first} ${last}`});
}
//POST request with Client input
//using express.urlencoded to true
const postlibraryhandler = (req,res) => {
  const first = req.body.first;
  const last = req.body.last;
  res.json({ name: `${first} ${last}`});
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
// will be called for any request
app.use(posthandler);

// use for 'POST' request
app.use(express.urlencoded({ extended: true }));

app.get("/index.html",handler)
app.get("/",indexhandler); //root level of our webpage
app.get("/json",jsonhandler); //root/json - webpage/json
app.get("/now",settimehandler,gettimehandler); //root/now - webpage/now
//input from client
app.get("/:word/echo",echohandler);
app.route("/name").get(getlibraryhandler).post(postlibraryhandler);
//app.listen(1555); //change for different challenge 3000 is not allowed in fcc challenge
























 module.exports = app;
