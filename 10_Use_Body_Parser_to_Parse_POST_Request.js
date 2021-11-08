/*
Use body-parser to Parse POST Requests

Besides GET, there is another common HTTP verb, it is POST.
POST is the default method used to send client data with HTML forms.
In REST convention, POST is used to send data to create new items in the database (a new user, or a new blog post).
You don’t have a database in this project, but you are going to learn how to handle POST requests anyway.

In these kind of requests, the data doesn’t appear in the URL, it is hidden in the request body.
The body is a part of the HTTP request, also called the payload.
Even though the data is not visible in the URL, this does not mean that it is private.
To see why, look at the raw content of an HTTP POST request:

POST /path/subpath HTTP/1.0
From: john@example.com
User-Agent: someBrowser/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 20

name=John+Doe&age=25

As you can see, the body is encoded like the query string. This is the default format used by HTML forms.
With Ajax, you can also use JSON to handle data having a more complex structure.
There is also another type of encoding: multipart/form-data. This one is used to upload binary files.
In this exercise, you will use a urlencoded body.
To parse the data coming from POST requests, you have to install the body-parser package.
This package allows you to use a series of middleware, which can decode data in different formats.

Install the body-parser module in your package.json. Then, require it at the top of the file.
Store it in a variable named bodyParser.
The middleware to handle urlencoded data is returned by bodyParser.urlencoded({extended: false}).
Pass the function returned by the previous method call to app.use().
As usual, the middleware must be mounted before all the routes that depend on it.

Note: extended is a configuration option that tells body-parser which parsing needs to be used.
When extended=false it uses the classic encoding querystring library.
When extended=true it uses qs library for parsing.

When using extended=false, values can be only strings or arrays.
The object returned when using querystring does not prototypically inherit from the default JavaScript Object,
which means functions like hasOwnProperty, toString will not be available.
The extended version allows more data flexibility, but it is outmatched by JSON.

*/
//dependencies:{"body-parser": "^1.15.2"}
var express = require('express');
var app = express();
//import body-parser
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
  const first = req.query.first;
  const last = req.query.last;
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
app.use(express.urlencoded({ extended: true }));

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
