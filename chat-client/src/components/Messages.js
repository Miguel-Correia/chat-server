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
        backgroundColor: '#48455b',
        overflowY: 'scroll',  
        overflowX: 'hidden'
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
              <ListItemAvatar>
                <Avatar alt="Anonymous" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  outline: "2px solid #84b2a9",
                  borderRadius: "8px",
                  padding: '10px',
                  backgroundColor: '#84b2a9'
                }}
                primary={
                  <React.Fragment>
                    {message.user.name} -
                    <Typography 
                      className="date"
                      component="span"
                      variant="caption" 
                    >
                      {' ' + new Date(message.time).toLocaleTimeString()}
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <div>
                    <Typography
                      className="message"
                      sx={{ display: 'inline', overflowWrap: 'break-word'}}
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