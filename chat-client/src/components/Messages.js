import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

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
    <Box
      component= 'div'
      sx={{
        height: 600,
        backgroundColor: 'gray',
        overflow: 'scroll'
      }}
    >
        <List sx={{width:'100%'}} >
        {[...Object.values(messages)]
          .sort((a, b) => a.time - b.time)
          .map((message) => (
            <ListItem
              key={message.id}
              sx={{display: 'flex', flexDirection: 'row'}}
              title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
            >
              <ListItemAvatar>
                <Avatar alt="Anonymous" />
              </ListItemAvatar>
              <ListItemText
                primary={message.user.name}
                secondary={
                  <div>
                    <span className="date">{new Date(message.time).toLocaleTimeString()}-</span>
                    <Typography
                      className="message"
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body1"
                      color="text.primary"
                    >{message.value}</Typography>
                  </div>
                }
              />
            </ListItem>
          ))
        }
      </List>
    </Box>

  );
}

export default Messages;