const uuidv4 = require('uuid').v4;

const messages = new Set();
const users = new Map();

const defaultUser = {
  	id: 'anon',
  	name: 'Anonymous',
};

class Connection {
    constructor(io, socket) {
      	this.socket = socket;
      	this.io = io;
		
      	socket.on('getMessages', () => this.getMessages());
      	socket.on('message', (data) => this.handleMessage(data));
      	socket.on('connect_error', (err) => {
      	  console.log(`connect_error due to ${err.message}`);
      	});
    }
    
    getMessages() {
      	messages.forEach((message) => this.sendMessage(message));
    }

    sendMessage(message) {
        console.log('message: ' + message.value);
        this.io.sockets.emit('message', message);
    }

    getLastMessage(msg){
      	var value = Array.from(msg).pop()
      	return value;
    }

    handleMessage(data) {
      	const message = {
      	  	id: uuidv4(),
      	  	user: data.userInfo || defaultUser,
      	  	value: data.value,
      	  	time: Date.now(), 
      	  	linked: false
      	};

      	var prevMessage = this.getLastMessage(messages)
      	//if (prevMessage != null && prevMessage.user.id == message.user.id)
        //	message.linked = true;

      	messages.add(message);
      	this.sendMessage(message);
    }

    disconnect() {
        console.log('user disconnected');
        users.delete(this.socket);
    }  
}

function chat(io) {
    io.on('connection', (socket) => {
      	console.log("New conection")
      	return new Connection(io, socket);   
    });
};
  
module.exports = chat;