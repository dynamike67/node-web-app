// server.js

var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/insert_item.html', function (req, res) {
   res.sendFile( __dirname + "/" + "insert_item.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log("Going to write into existing file");
      fs.writeFile( __dirname + "/" + "input.json", JSON.stringify(response),  function(err) {
         if (err) {
            return console.error(err);
         }
   
      console.log("Data written successfully!");
      console.log("Let's read newly written data");
      fs.readFile( __dirname + "/" + "input.json", function (err, data) {
         if (err) {
            return console.error(err);
         }
      console.log("Asynchronous read: " + data.toString());
   });
});
   console.log(response);
   res.end(JSON.stringify(response));
})

// GET /
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   //res.send('Hello GET');
   res.sendFile( __dirname + "/" + "index.html" );
})

// POST /
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// GET /list_user
app.get('/list_item', function (req, res) {
   console.log("Got a GET request for /list_item");
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

// PUT /insert_item
app.put('/insert_item', function(req, res) {
   console.log("Got a PUT request for /insert_item");
   res.send('Page Pattern Match');
})

// DELETE /delete_item
app.delete('/delete_item', function (req, res) {
   console.log("Got a DELETE request for /delete_item");
   res.send('Hello DELETE');
})

var server = app.listen(8080, function () {
  
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
