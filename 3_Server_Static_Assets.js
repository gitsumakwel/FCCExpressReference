/*
Serve Static Assets

An HTML server usually has one or more directories that are accessible by the user.
You can place there the static assets needed by your application (stylesheets, scripts, images).

In Express, you can put in place this functionality using the middleware express.static(path),
where the path parameter is the absolute path of the folder containing the assets.

If you don’t know what middleware is... don’t worry, we will discuss in detail later.
Basically, middleware are functions that intercept route handlers, adding some kind of information.
A middleware needs to be mounted using the method app.use(path, middlewareFunction).
The first path argument is optional. If you don’t pass it, the middleware will be executed for all requests.

Mount the express.static() middleware to the path /public with app.use().
The absolute path to the assets folder is __dirname + /public.

Now your app should be able to serve a CSS stylesheet.
Note that the /public/style.css file is referenced in the /views/index.html in the project boilerplate.
Your front-page should look a little better now!
*/

var express = require('express');
var app = express();

console.log("Hello World");
//to be called when specific route matched '/'
const handlerx = (req,res) => {

  //res.send('Hello Express');

  const absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
}
//use to include static assets needed by your application (stylesheets, scripts, images)
app.use('/public',express.static(__dirname + '/public'));
//setup route at root level
app.get("/",handlerx);

//app.listen(2887); //change for different challenge
