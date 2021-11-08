require('dotenv').config();
//you need to install dotenv 'npm install -g dotenv'
//create .env file inside root
//put  MESSAGE_STYLE=uppercase inside the '.env'   (made sure no space from the variable upto the value
//to use: process.env.MESSAGE_STYLE

/*
The .env file is a hidden file that is used to pass environment variables to your application.
This file is secret, no one but you can access it, and it can be used to store data that you want to keep private or hidden.
For example, you can store API keys from external services or your database URI.
You can also use it to store configuration options.
By setting configuration options, you can change the behavior of your application, without the need to rewrite some code.

The environment variables are accessible from the app as process.env.VAR_NAME.
The process.env object is a global Node object, and variables are passed as strings.
By convention, the variable names are all uppercase, with words separated by an underscore.
The .env is a shell file, so you don’t need to wrap names or values in quotes.
It is also important to note that there cannot be space around the equals sign when
you are assigning values to your variables, e.g. VAR_NAME=value.
Usually, you will put each variable definition on a separate line.



Let's add an environment variable as a configuration option.

Create a .env file in the root of your project directory,
and store the variable MESSAGE_STYLE=uppercase in it.

Then, in the /json GET route handler you created in the last challenge,
transform the response object's message to uppercase if process.env.MESSAGE_STYLE equals uppercase.
The response object should either be {"message": "Hello json"} or {"message": "HELLO JSON"},
depending on the MESSAGE_STYLE value.

Note: If you are using Replit, you cannot create a .env file.
Instead, use the built-in SECRETS tab to add the variable.

If you are working locally, you will need the dotenv package.
It loads environment variables from your .env file into process.env.
Install it with npm install dotenv.

Then, at the top of your myApp.js file,
import and load the variables with require('dotenv').config().

*/

var express = require('express');
var app = express();

//console.log("Hello World");

const handlerx = (req,res) => {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE==='uppercase') {
      message = message.toUpperCase();
  }
  res.json({"message": message});
  //const absolutePath = __dirname + '/views/index.html';
  //res.sendFile(absolutePath);
}

app.get("/json",handlerx);
//use to include static assets needed by your application (stylesheets, scripts, images)
app.use('/public',express.static(__dirname + '/public'));
//not needed in FCC Challenge
//app.listen(1555); //change for different challenge 3000 is not allowed in fcc challenge

module.exports = app;
