var fs = require('fs');
var ebml = require('ebml');
var decoder = new ebml.Decoder();
//decoder.on('data', function(chunk) {
//  console.log(chunk);
//});

//fs.readFile('video/1464536547786', function(err, data) {
//  if (err)
//    throw err;
//  decoder.write(data);
//});
var reader = new FileReader();

reader.addEventListener('load', function(e){
  
  var ab = new Uint8Array(e.target.result);
  var view = new DataView(ab);
  console.log(view.getUint32(0, false));
});
fs.readFile('video/1464334215426', function(err, data) {
  if (err)
    throw err;
  console.log(data);

  reader.readAsArrayBuffer(data);
});
