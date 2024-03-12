import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbar({open,type,message,duration,snackbarClose}) {
  setTimeout(()=>{
    snackbarClose(false)
  },duration)
  
   return (
    <div>
      <Snackbar open={open} autoHideDuration={duration}>
        <Alert
          severity={type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message} !
        </Alert>
      </Snackbar>
    </div>
  );
}