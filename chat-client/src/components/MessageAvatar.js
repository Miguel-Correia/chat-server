import React from 'react';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

function MessageAvatar({ message }) {
    return (
        <ListItemAvatar>
        	<Avatar alt="Anonymous" />
        </ListItemAvatar>
    );
}

export default MessageAvatar;