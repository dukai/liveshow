var socket = io();


window.MediaSource = window.MediaSource || window.WebKitMediaSource;
if (!!!window.MediaSource) {
  alert('MediaSource API is not available');
}

var videoElem = document.getElementById("video");

var mediaSource = new MediaSource();
var sourceBuffer;
var buffers = [];
var updating = false;
var bufferCount = 0;
var startedPlay = false;

videoElem.src = URL.createObjectURL(mediaSource);
//var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
var mimeCodec = 'video/webm; codecs="vp8,vorbis"';


var notify = function(){
  if(updating || buffers.length == 0){
    return false;
  }
  updating = true;
  var buffer = buffers.shift();
  sourceBuffer.appendBuffer(buffer);
}

mediaSource.addEventListener('sourceopen', function(event){
  sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  sourceBuffer.addEventListener('updateend', function(){
    updating = false;
    if(!startedPlay){
      bufferCount += 1;
      if(bufferCount > 2){
        startedPlay = true;
        videoElem.play();
      }
    }
    notify();
  });

  setTimeout(function(){
    sourceOpened();
  }, 100);
});


var sourceOpened = function(){
//  socket.on('welcome', function(msg){
//    console.log(msg);
//    buffers.push(msg.data);
//    notify();
//  });

  socket.on('live', function(msg){
    console.log(msg);
    sourceBuffer.appendBuffer(msg.data);
    buffers.push(msg.data);
    notify();
  });
}
