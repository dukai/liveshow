"use strict";

window.MediaSource = window.MediaSource || window.WebKitMediaSource;
if (!!!window.MediaSource) {
  alert('MediaSource API is not available');
}

var videoElem = document.getElementById("video");

var mediaSource = new MediaSource();
var sourceBuffer;

videoElem.src = URL.createObjectURL(mediaSource);
//var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
var mimeCodec = 'video/webm; codecs="vp8,vorbis"';

mediaSource.addEventListener('sourceopen', function(event){
  sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  sourceBuffer.addEventListener('updateend', function(){
    videoElem.play();
  });
});

var reader = new FileReader();
reader.addEventListener('load', function(e){
  sourceBuffer.appendBuffer(new Uint8Array(e.target.result));
});

navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);


navigator.getUserMedia({video: true},function(stream){
  var mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.addEventListener('dataavailable', function(event){
    //console.log(event.data);
    reader.readAsArrayBuffer(event.data);
  });

  mediaRecorder.start(200);
	//videoElem.src = URL.createObjectURL(stream);
	//videoElem.play();
}, function(error){
	console.log(error);
});

//navigator.mediaDevices.getUserMedia(
//  { video: true }
//).then(
//  function(stream) {
//    //videoElem.play();
//
//    var mediaRecorder = new MediaRecorder(stream);
//    mediaRecorder.addEventListener('dataavailable', function(event){
//      console.log(event);
//      reader.readAsArrayBuffer(event.data);
//    });
//
//    mediaRecorder.start(2000);
//  }
//);
