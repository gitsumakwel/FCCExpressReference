/*
Serve JSON on a Specific RoutePassed

While an HTML server serves HTML, an API serves data.
A REST (REpresentational State Transfer) API allows data exchange in a simple way,
without the need for clients to know any detail about the server.
The client only needs to know where the resource is (the URL),
and the action it wants to perform on it (the verb).
The GET verb is used when you are fetching some information,
without modifying anything. These days,
the preferred data format for moving information around the web is JSON.
Simply put, JSON is a convenient way to represent a JavaScript object as a string,
so it can be easily transmitted.

Let's create a simple API by creating a route that responds with JSON at the path /json.
You can do it as usual, with the app.get() method.
Inside the route handler, use the method res.json(), passing in an object as an argument.
This method closes the request-response loop, returning the data.
Behind the scenes, it converts a valid JavaScript object into a string,
then sets the appropriate headers to tell your browser that you are serving JSON,
and sends the data back.

A valid object has the usual structure {key: data}. data can be a number, a string, a nested object or an array.
data can also be a variable or the result of a function call,
in which case it will be evaluated before being converted into a string.

*/
var express = require('express');
var app = express();

console.log("Hello World");
//to be called when specific route matched '/json'
const jsonhandler = (req,res) => {
  //res.send('Hello Express');
  //respond with json
  res.json({'message': "Hello json"});
  //const absolutePath = __dirname + '/views/index.html';
  //res.sendFile(absolutePath);
}

//use to include static assets needed by your application (stylesheets, scripts, images)
app.use('/public',express.static(__dirname + '/public'));

//setup route at root level
app.get("/json",jsonhandler);
//not needed for FCC Challenge
//app.listen(2887); //change for different challenge
