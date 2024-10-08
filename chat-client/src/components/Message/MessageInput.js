import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const NewMessage = ({socket, userInfo}) => {
  	const [value, setValue] = useState('');
  	const submitForm = (e) => {
    	e.preventDefault();
    	socket.emit('message', {userInfo, value});
    	setValue('');
  	};


  	return (
  	    <Box 
  	      component="form"
  	      sx={{ 
  	        width: 2/3,
			bottom: 1,
  	        position: 'fixed',
  	        alignItems: 'center',
  	        justifyContent: 'center'
  	       }} 
  	      onSubmit={submitForm}
  	    >
  	      <TextField
  	        sx={{
  	          backgroundColor: 'white',
  	        }}
  	        fullWidth
  	        autoFocus
  	        multiline
  	        maxRows={4}
  	        variant="filled"
  	        value={value}
  	        placeholder="Type your message"
  	        onChange={(e) => {
  	          setValue(e.currentTarget.value);
  	        }}
  	        onKeyDown={(e) => {
  	          if(e.key === 'Enter'){
  	            submitForm(e)
  	          }
  	        }}
  	      />
  	    </Box>
  	);
};

export default NewMessage;