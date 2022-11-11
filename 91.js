var express = require('express');
const { Socket } = require('socket.io');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.get('/', function(req, res) {
res.sendFile(__dirname + "/" + "91_chat.html");
});
users = [];
io.on('connection', function(socket) {
console.log('A user connected');
socket.on('createUser', function(data) {
console.log(data);
if (users.indexOf(data) >= 0) {
socket.emit('userExists', data + ' user already exists');
} else {
users.push(data);
socket.emit('setUser', { username: data });
}
});
socket.on('msg', function(data) {
io.emit('newmsg', data);
})
});
http.listen(2000, function() {
console.log('listening on localhost:2000');
});