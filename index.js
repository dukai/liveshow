/**
 * Created by Administrator on 2016/4/6.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('./'));


var videoList = [];

io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit("welcome", "welcome");

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });


    socket.on('video', function(msg){
        console.log(msg);
        videoList.push(msg);

        require('fs').writeFileSync(__dirname + '/video/' + msg.time, msg.data);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
