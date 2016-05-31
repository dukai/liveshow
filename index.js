/**
 * Created by Administrator on 2016/4/6.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('./'));


var videoList = [];
var ebml = {data: null, time: null};
var last = null;

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('live', {
    data: ebml.data,
    time: ebml.time,
    timecode: 0,
    type: 'ebml'
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });


  socket.on('video', function(msg){
    videoList.push(msg);
    last = msg;
    require('fs').writeFileSync(__dirname + '/video/' + msg.time, msg.data);

    console.log(msg.data.readIntBE(0, 4).toString(16));
    if(msg.data.readIntBE(0, 4).toString(16) == '1a45dfa3') {
      ebml = msg;
      io.emit('live', {
        type: 'ebml',
        data: msg.data,
        time: msg.time,
        timecode: 0
      });
    }
    if(msg.data.readIntBE(0, 4).toString(16) == '1f43b675') {
      console.log('trigger');
      io.emit('live', {
        type: 'cluster',
        data: msg.data,
        time: msg.time,
        timecode: msg.data.readIntBE(14, 2)
      });
    }
  });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
