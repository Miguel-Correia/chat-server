import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from './components/Messages';
import MessageInput from './components/MessageInput';
import Grid from '@mui/system/Unstable_Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function App() {
	const [socket, setSocket] = useState(null);

  	useEffect(() => {
		const newSocket = io(`http://${window.location.hostname}:3000`);
  	  	setSocket(newSocket);
  	  	return () => newSocket.close();
  	}, [setSocket]);

  return (
    <div className="App">
		<Grid container justifyContent="center">
			<Card variant="outlined" sx={{ width: 1/2}} >
      		  	{ socket ? (
      		    	<div className="chat-container">
      		      		<Messages socket={socket} />
      		      		<MessageInput socket={socket} />
      		    	</div>
      		  	) : (
      		    	<CardContent>
      		      		<Typography variant="body2" color="text.secondary">
							Can't Connect
      		      		</Typography>
      		    	</CardContent>
      		  	)}
      		</Card>
		</Grid>
    </div>
  );
}

export default App;