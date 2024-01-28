import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
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
          width: 2/3,
          bottom: 0,
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
            if(e.key == 'Enter'){
              submitForm(e)
            }
          }}
        />
      </Box>
  );
};

export default NewMessage;