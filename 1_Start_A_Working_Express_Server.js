/*
Start a Working Express Server

In the first two lines of the file myApp.js, you can see how easy it is
to create an Express app object. This object has several methods,
and you will learn many of them in these challenges.
One fundamental method is app.listen(port).
 It tells your server to listen on a given port, putting it in running state.
 For testing reasons, we need the app to be running in the background
 so we added this method in the server.js file for you.

Let’s serve our first string! In Express, routes takes the following structure: app.METHOD(PATH, HANDLER).
METHOD is an http method in lowercase. PATH is a relative path on the server (it can be a string, or even a regular expression).
HANDLER is a function that Express calls when the route is matched.
Handlers take the form function(req, res) {...}, where req is the request object,
and res is the response object. For example, the handler

function(req, res) {
  res.send('Response String');
}

will serve the string 'Response String'.

Use the app.get() method to serve the string "Hello Express" to GET requests matching the / (root) path.
 Be sure that your code works by looking at the logs, then see the results in the preview if you are using Replit.

Note: All the code for these lessons should be added in between the few lines of code we have started you off with.
*/
var express = require('express');
var app = express();

console.log("Hello World");

//req = request Object
//res = response Object
const handlerx = (req,res) => {
  //respond with a text message
  res.send('Hello Express');

  //__dirname is the path to the folder holding this file
  //const absolutePath = __dirname + '/views/index.html';

  //respond with a File, mentioned in the absolutePath
  //res.sendFile(absolutePath);
}

//app.METHOD(PATH,HANDLER)
//METHOD - http method in lowercase
//PATH - relative path in the server
//HANDLER - Function to be called when route is matched
// here at root level route '/'
app.get("/",handlerx);

//use to include static assets needed by your application (stylesheets, scripts, images)
//app.use('/public',express.static(__dirname + '/public'));

//tells your server of what port to listen
//not needed in FCC Challenge
//app.listen(2886); //change for different challenge
