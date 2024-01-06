import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const NewMessage = ({socket}) => {
  const [value, setValue] = useState('');
  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('message', value);
    setValue('');
  };

  return (
      <Box 
        component="form"
        sx={{ 
          width: 1,
          bottom: 0,
          position: 'fixed',
          alignItems: 'center',
          justifyContent: 'center'
         }} 
        onSubmit={submitForm}
      >
        <TextField
          fullWidth 
          autoFocus
          value={value}
          placeholder="Type your message"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
      </Box>
  );
};

export default NewMessage;