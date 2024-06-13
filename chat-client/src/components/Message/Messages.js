import React, { useEffect, useState, useRef } from 'react';
import { Box, List } from '@mui/material';
import MessageBox from './MessageBox';

function Messages({ socket, userInfo }) {
	const [messages, setMessages] = useState({});
	const messagesEndRef = useRef(null);
	
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(() => {
		const messageListener = (message) => {
			setMessages((prevMessages) => {
				const newMessages = {...prevMessages};
				newMessages[message.id] = message;
				console.log(message);
				return newMessages;
			});
		};
	
		socket.on('message', messageListener);
		socket.emit('getMessages');

		return () => {
			socket.off('message', messageListener);
		};
	}, [socket]);

	useEffect(() => {
		scrollToBottom()
	}, [messages]);

	return (
		<Box
			component= 'div'
			sx={{
				height: '92vh',	
				overflowY: 'scroll',  
				overflowX: 'hidden',
				paddingBottom: 1
			}}
		>
				<List sx={{width:'100%'}} >
				{[...Object.values(messages)]
					.sort((a, b) => a.time - b.time)
					.map((message) => (
						<MessageBox message={message} userInfo={userInfo} />
					))
				}
			</List>
			<div ref={messagesEndRef} />
		</Box>

	);
}

export default Messages;