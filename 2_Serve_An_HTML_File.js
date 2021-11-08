/*
Serve an HTML File

You can respond to requests with a file using the res.sendFile(path) method.
You can put it inside the app.get('/', ...) route handler.
Behind the scenes, this method will set the appropriate headers to instruct your
browser on how to handle the file you want to send, according to its type.
Then it will read and send the file. This method needs an absolute file path.
We recommend you to use the Node global variable __dirname to calculate the path like this:

absolutePath = __dirname + relativePath/file.ext

Send the /views/index.html file as a response to GET requests to the / path.
If you view your live app, you should see a big HTML heading
(and a form that we will use later…), with no style applied.

Note: You can edit the solution of the previous challenge or create a new one.
If you create a new solution, keep in mind that Express evaluates routes from top to bottom,
and executes the handler for the first match. You have to comment out the preceding solution,
or the server will keep responding with a string.
*/
var express = require('express');
var app = express();

console.log("Hello World");

const handlerx = (req,res) => {
  //res.send('Hello Express');

  //__dirname is the path to the folder holding this file
  const absolutePath = __dirname + '/views/index.html';

  //respond with a File, mentioned in the absolutePath
  res.sendFile(absolutePath);
}

//will invoke handlerx for every '/' root level route
app.get("/",handlerx);

//use to include static assets needed by your application (stylesheets, scripts, images)
//app.use('/public',express.static(__dirname + '/public'));

//app.listen(2886); //change for different challenge
