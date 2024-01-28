import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from './components/Messages';
import MessageInput from './components/MessageInput';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


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
			<div >
				<Grid container>
  					<Grid item xs={4}>
  					  	<div style={{backgroundColor: 'black'}}>sadasd</div>
  					</Grid>
  					<Grid item xs={8}>
					  	<Messages socket={socket} />
						<MessageInput socket={socket} />
  					</Grid>
				</Grid>
				
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