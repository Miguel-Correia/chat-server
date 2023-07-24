import React, { useState } from 'react';
import CardActions from '@mui/material/CardActions';
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
    <CardActions disableSpacing>
      <Box 
        component="form"
        sx={{ width: 1 }} 
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
    </CardActions>
  );
};

export default NewMessage;