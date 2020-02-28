/**
 * Micro Express Server
 */
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/client'));

app.get('/*', function(req, res) {
  console.log(`[EC] Received a ping at ${Date.now()}!`)
  res.sendFile(path.join(__dirname+'/dist/client/index.html'));
});

app.listen(process.env.PORT || 8080);

console.log("Micro Express Server has started.")
