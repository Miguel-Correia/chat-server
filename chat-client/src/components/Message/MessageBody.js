import React from "react";
import { ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';

function MessageBody({message}){
  	return (
      	<ListItemText
      	    sx={{
      	        outline: "2px solid #4c8cba",
      	        borderRadius: "8px",
      	        padding: '10px',
      	        backgroundColor: '#4c8cba'
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