import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';


function Messages({ socket }) {
  const [messages, setMessages] = useState({});

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

  return (
    <div className="message-list">
      <CardContent sx={{backgroundColor: "#ffe9ec"}}>
        {[...Object.values(messages)]
          .sort((a, b) => a.time - b.time)
          .map((message) => (
            <div
              key={message.id}
              className="message-container"
              title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
            >
              <span className="user">{message.user.name}:</span>
              <span className="message">{message.value}</span>
              <span className="date">{new Date(message.time).toLocaleTimeString()}</span>
            </div>
          ))
        }
      </CardContent>
    </div>
  );
}

export default Messages;