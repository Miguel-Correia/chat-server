import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from './components/Message/Messages';
import MessageInput from './components/Message/MessageInput';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Login from './components/Login/Login';
import './App.css';
import ContactBar from './components/ContactBar/ContactBar';

function App() {
	const [socket, setSocket] = useState(null);
	const [token, setToken] = useState();

  	useEffect(() => {
		const newSocket = io(`http://${window.location.hostname}:3000`);
  	  	setSocket(newSocket);
  	  	return () => newSocket.close();
  	}, [setSocket]);

	if(!token){
		return <Login setToken={setToken} />
	}

  	return (
    	<div>
			{ socket ? (
				<div >
					<Grid container>
  						<Grid item xs={4}>
  						  	<ContactBar />
  						</Grid>
  						<Grid item xs={8}>
						  	<Messages socket={socket} userInfo={token.userName} />
							<MessageInput socket={socket} userInfo={token.userName} />
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