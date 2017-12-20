var pOut = document.getElementById('pOut');
pOut.innerHTML = 'test';

var socket = io('/colorConnect');

socket.on('connect', function() {
console.log("connected");
    socket.on('nUsers', function(data) {
        console.log("test")
        console.log(data.nUsers);
        socket.emit('hiFromCli', {colorChoice: 'rgb(255,0,0)'});
    });
});