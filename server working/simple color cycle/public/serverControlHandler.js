
function shutdownServer() {
    if(confirm("you are about to shutdown the server\nthis will destroy any unsaved data\nand kick anyone currently connected (including you)")) {
        io.emit('shutdown', {pword: "jk no passwords here XD"});
    }
}

function restartServer() {
    
}

function saveServer() {
    io.emit('save');
}