import React, { useEffect, useState, useRef } from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import MessageAvatar from './MessageAvatar';
import MessageBody from './MessageBody';

function Messages({ socket }) {
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
				height: '95vh',
				backgroundColor: '#292929',
				overflowY: 'scroll',  
				overflowX: 'hidden',
				paddingBottom: 5
			}}
		>
				<List sx={{width:'100%', maxWidth:'460px'}} >
				{[...Object.values(messages)]
					.sort((a, b) => a.time - b.time)
					.map((message) => (
						<ListItem
							key={message.id}
							sx={{display: 'flex', flexDirection: 'row'}}
							title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
						>
							<MessageAvatar message={message}/>
							<MessageBody message={message}/>
						</ListItem>
					))
				}
			</List>
			<div ref={messagesEndRef} />
		</Box>

	);
}

export default Messages;