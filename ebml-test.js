var fs = require('fs');
var ebml = require('ebml');
var decoder = new ebml.Decoder();
decoder.on('data', function(chunk) {
  console.log(chunk);
});

fs.readFile('video/1464618329295', function(err, data) {
  //decoder.write(data);
  console.log(data.readIntBE(14,2));
});
//var reader = new FileReader();
//
//reader.addEventListener('load', function(e){
//  
//  var ab = new Uint8Array(e.target.result);
//  var view = new DataView(ab);
//  console.log(view.getUint32(0, false));
//});
//fs.readFile('video/1464536542773', function(err, data) {
//  if (err)
//    throw err;
//  console.log(data);
//
//  //reader.readAsArrayBuffer(data);
//  //
//  //
//  console.log(data.readIntBE(0, 4).toString(16));
//});
