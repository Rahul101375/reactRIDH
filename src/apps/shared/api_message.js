import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function MessageInfoComponent({type,message}) {
    console.log(type,message)
    function capitalizeFirstLetter(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={type}>
        <AlertTitle>{capitalizeFirstLetter(type)}</AlertTitle>
        {message}
      </Alert>
    </Stack> 
  );
  
}