import React from "react";
import { Box, List, ListItem, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';

function MessageBody({message}, {prevMessage}){
    // Mensagens de utilizadores diferentes
    console.log(prevMessage)
    console.log(message)
    if (prevMessage != null && message.user.id != prevMessage.user.id){
        return (
            <ListItemText
                sx={{
                  outline: "2px solid #84b2a9",
                  borderRadius: "8px",
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
        );
    }

    return (
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
    );
}

export default MessageBody;