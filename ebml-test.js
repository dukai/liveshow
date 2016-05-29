var fs = require('fs');
var ebml = require('ebml');
var decoder = new ebml.Decoder();
decoder.on('data', function(chunk) {
  console.log(chunk);
});

fs.readFile('video/1464536547786', function(err, data) {
  if (err)
    throw err;
  decoder.write(data);
});
