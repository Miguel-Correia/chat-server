import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from './components/Messages';
import MessageInput from './components/MessageInput';
import Typography from '@mui/material/Typography';

import './App.css';

function App() {
	const [socket, setSocket] = useState(null);

  	useEffect(() => {
		const newSocket = io(`http://${window.location.hostname}:3000`);
  	  	setSocket(newSocket);
  	  	return () => newSocket.close();
  	}, [setSocket]);

  return (
    <div className="App">
		{ socket ? (
			<div className="chat-container">
				<Messages socket={socket} />
				<MessageInput socket={socket} />
			</div>
		) : 
		(
			<Typography variant="body2" color="text.secondary">
				Can't Connect
			</Typography>
		)}
    </div>
  );
}

export default App;