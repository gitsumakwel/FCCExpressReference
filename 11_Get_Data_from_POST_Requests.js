/*
Get Data from POST RequestsPassed

Mount a POST handler at the path /name. It’s the same path as before.
We have prepared a form in the html frontpage.
It will submit the same data of exercise 10 (Query string).
If the body-parser is configured correctly, you should find the parameters in the object req.body.
Have a look at the usual library example:

    route: POST '/library'
    urlencoded_body: userId=546&bookId=6754
    req.body: {userId: '546', bookId: '6754'}

Respond with the same JSON object as before: {name: 'firstname lastname'}.
Test if your endpoint works using the html form we provided in the app frontpage.

Tip: There are several other http methods other than GET and POST.
And by convention there is a correspondence between the http verb,
and the operation you are going to execute on the server.
The conventional mapping is:

POST (sometimes PUT) - Create a new resource using the information sent with the request,

GET - Read an existing resource without modifying it,

PUT or PATCH (sometimes POST) - Update a resource using the data sent,

DELETE => Delete a resource.

There are also a couple of other methods which are used to negotiate a connection with the server.
Except from GET, all the other methods listed above can have a payload (i.e. the data into the request body).
The body-parser middleware works with these methods as well.

*/

//dependencies:{"body-parser": "^1.15.2"}
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
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
const getlibraryhandler = (req,res,next) => {
  const first = req.query.first || "firstname";
  const last = req.query.last || "lastname";
  res.json({ name: `${first} ${last}`});
}
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
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/index.html",handler)
app.get("/",indexhandler); //root level of our webpage
app.get("/json",jsonhandler); //root/json - webpage/json
app.get("/now",settimehandler,gettimehandler); //root/now - webpage/now
//input from client
app.get("/:word/echo",echohandler);
//we are using the same route for different handler
//here we use GET and POST for route "/name"
app.route("/name").get(getlibraryhandler).post(postlibraryhandler);
//app.listen(1555); //change for different challenge 3000 is not allowed in fcc challenge
























 module.exports = app;
