"use strict";

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
});

var reader = new FileReader();
reader.addEventListener('load', function(e){
  console.log(new Uint8Array(e.target.result));
  buffers.push(new Uint8Array(e.target.result));
  //sourceBuffer.appendBuffer(new Uint8Array(e.target.result));
  notify();
});

navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);


navigator.getUserMedia({video: true},function(stream){
  var mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.addEventListener('dataavailable', function(event){
    //console.log(event.data);
    reader.readAsArrayBuffer(event.data);
  });

  mediaRecorder.start(5000);
	//videoElem.src = URL.createObjectURL(stream);
	//videoElem.play();
}, function(error){
	console.log(error);
});

