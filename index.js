/**
 * Created by Administrator on 2016/4/6.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('./'));


var videoList = [];
var ebml = null;
var last = null;

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('welcome', {
    embl: embl,
    last: last.data
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });


  socket.on('video', function(msg){
    if(!ebml){
      ebml = msg.data;
    }
    videoList.push(msg);
    last = msg;
    require('fs').writeFileSync(__dirname + '/video/' + msg.time, msg.data);

    socket.emit('live', {
      last: msg.data
    });
  });

  socket.on('live', function(){
    console.log('some user require to live show');
  });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
