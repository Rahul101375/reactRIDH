import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { globalInfoData } from '../layout/header';
import CommonFormMaterial from './common_forms';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

export default function CommonFormDialog() {

  const { isOpenDialog, openCommonPop, closeDialog } = React.useContext(globalInfoData);
  const handleClickOpen = () => {
    openCommonPop();
  };

  const handleClose = () => {

  };
  const handleFormSubmit = (formData) => {
    // Handle form submission logic specific to this component
    console.log('Form submitted:', formData);
  };
  const commonFormFields = [
    { name: 'firstName', label: 'First Name', type: 'text',placeholder:'Enter Your First Name' },
    { name: 'lastName', label: 'Last Name', type: 'text' ,placeholder:'Enter Your Last Name'},
    { name: 'email', label: 'Email', type: 'email' ,placeholder:'Example@gmial.com'},
    { name: 'password', label: 'Password', type: 'password' ,placeholder:'Enter Your Password'},
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' ,placeholder:'Confirm Password'},
    { name: 'descriptions', label: 'Descriptions', type: 'text' ,placeholder:'Descriptions'},
    { name: 'birthDate', label: 'Birth Date', type: 'date' ,placeholder:'Enter Date'},
    { name: 'gender', label: 'Gender', type: 'radio-group', options: ['Male', 'Female', 'Other'] ,placeholder:'Chose Your Gender'},
    { name: 'interests', label: 'Interests', type: 'checkbox', options: ['Reading', 'Sports', 'Music'] ,placeholder:'Select Your Hobby'},
    { name: 'country', label: 'Country', type: 'select', options: ['USA', 'Canada', 'UK', 'Australia'] ,placeholder:'Enter Your Country'},
  ];
  return (
    <React.Fragment>
      <globalInfoData.Consumer>
        {(value) => (
          <>

            <Dialog
              open={value?.isOpenDialog}
              onClose={handleClose}
              PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  const email = formJson.email;
                  console.log(email);
                  handleClose();
                },
              }}
              maxWidth="md" fullWidth
            >
              <Typography align='right' style={{padding:'0px 10px',cursor:'pointer'}}>
                <ClearRoundedIcon onClick={()=>openCommonPop('')}>Cancel</ClearRoundedIcon>
              </Typography>
              <DialogTitle sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' ,padding:'0px'}}>
                {
                  value?.imageIcon && (
                    <Avatar alt="Remy Sharp" src='' style={{margin:'0px 5px'}}/> 
                  )
                }
                <strong>
                {value?.title}
                </strong>
                
              </DialogTitle>
              <Typography align="center">
                {value?.subTitle}
              </Typography>
            
              <Divider sx={{ my: 2 }} />
              <DialogContent>
                <CommonFormMaterial fields={value?.commonFormFields} onSubmit={handleFormSubmit} buttonText={value?.buttonText} openCommonPop={openCommonPop}/>
              </DialogContent>
              <DialogActions>
                {/* <Button onClick={openCommonPop}>Cancel</Button> */}
                {/* <Button type="submit" onClick={handleClickOpen}>Subscribe</Button> */}
              </DialogActions>
            </Dialog>
          </>
        )
        }
      </globalInfoData.Consumer>


    </React.Fragment>
  );
}