import React from "react";
import { ListItem } from '@mui/material';
import MessageBody from "./MessageBody";
import MessageAvatar from "./MessageAvatar";


function MessageBox({message, userInfo}){

    var messageOwner = message.user === userInfo;

    if (messageOwner){
        return (
            <ListItem
                key={message.id}
                sx={{
                    display: 'flex', 
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    marginLeft: 'auto',
                    maxWidth: '460px'
                }}
                title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
            >
                <MessageBody message={message} messageOwner={messageOwner} />
            </ListItem>
        );  
    } else {
        return (
            <ListItem
                key={message.id}
                sx={{
                    display: 'flex', 
                    flexDirection: 'row',
                    maxWidth: '460px'
                }}
                title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
            >
                <MessageAvatar message={message}/>
                <MessageBody message={message} messageOwner={messageOwner} />
            </ListItem>
        );
    }
    
}

export default MessageBox;