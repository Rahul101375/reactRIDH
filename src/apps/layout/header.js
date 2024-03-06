import  React,{createContext, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom';
import CommonFormDialog from '../shared/common_dailog';
import MessageInfoComponent from '../shared/api_message';
import CommonMatMenuComponent from '../shared/common_mat_menu';

const globalInfoData = createContext()


const drawerWidth = 240;
const navItems = [
  {label:"Home",path:""},
  {label:"Dashboard",path:"dashboard"},
  {label:"Resources",path:"resources"},
  {label:"Impact Stories",path:"impact-stories"},
  {label:"About Us",path:"about"},
  {label:"Our Partners",path:"ourpartners"},
  {label:"Join Now",path:""},
  {label:"Login",path:""},
  // {label:"Profile",path:""},
  // {label:"Class Component",path:"class-component"}
];
const dialogOpen = ['Join Now','Login','Profile'];





function HeaderComponent(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [types, setTypes] = React.useState('');
  const successMessage = 'This is a success message.';
  const joinNowFormFields = [
    { name: 'name', label: 'Name', type: 'text',placeholder:'Enter Your Name' },
    { name: 'email', label: 'Email', type: 'email' ,placeholder:'Example@gmial.com'},
    { name: 'country', label: 'Country', type: 'select', options: ['USA', 'Canada', 'UK', 'Australia'] ,placeholder:'Enter Your Country'},
    { name: 'mobileNumber', label: 'Mobile Number', type: 'text' ,placeholder:'Enter Your Mobile Number'},
    { name: 'type', label: 'I am a', type: 'select', options: ['Government official', 'Researcher', 'Researcher', 'Other'] ,placeholder:'Enter Your Profession'},
    { name: 'password', label: 'Password', type: 'password' ,placeholder:'Enter Your Password'},
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' ,placeholder:'Confirm Password'},
    // { name: 'descriptions', label: 'Descriptions', type: 'text' ,placeholder:'Descriptions'},
    // { name: 'birthDate', label: 'Birth Date', type: 'date' ,placeholder:'Enter Date'},
    // { name: 'gender', label: 'Gender', type: 'radio-group', options: ['Male', 'Female', 'Other'] ,placeholder:'Chose Your Gender'},
    // { name: 'interests', label: 'Interests', type: 'checkbox', options: ['Reading', 'Sports', 'Music'] ,placeholder:'Select Your Hobby'},
    // { name: 'country', label: 'Country', type: 'select', options: ['USA', 'Canada', 'UK', 'Australia'] ,placeholder:'Enter Your Country'},
  ];
  const loginFormFields = [
    { name: 'email', label: 'Email', type: 'email' ,placeholder:'Example@gmial.com'},
    { name: 'password', label: 'Password', type: 'password' ,placeholder:'Enter Your Password'},
    { name: 'captch', label: 'Captcha', type: 'text',placeholder:'Enter Captcha' },

  ];
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [isOpenDialog,setIsOpenDialog] = useState(false)

const openCommonPop=(type)=>{
  setIsOpenDialog(type !== 'Profile' ? (type == '' ? !isOpenDialog : true) : true);
  setTypes(type);
}
const transforData = (item)=>{
  console.warn(item)
}

const contextValue =  types !== 'Profile' ? {
  isOpenDialog:isOpenDialog,
  openCommonPop,
  commonFormFields : types === 'Login' ? loginFormFields : joinNowFormFields,
  title: types === 'Login' ? 'Welcome to IDH-INSTEP' : 'New Member',
  subTitle: types === 'Login' ? 'Existing Members' : 'Please fill up the form to sign up',
  imageIcon: true,
  buttonText : types === 'Login' ? "Login" : "Signup"
} : {
   isProfile : isOpenDialog
}

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
<List>
  {navItems.map((item) => (
    <ListItem key={item?.label} disablePadding>
      <ListItemButton sx={{ textAlign: 'center' }}>
      <ListItemText primary={item?.label} />
      </ListItemButton>
    </ListItem>
  ))}
</List>


    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <globalInfoData.Provider value={contextValue}>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item?.label} sx={{ color: '#000' }}>


                  {
                    item.label === 'Home' ? (
                      <NavLink to="/" className="nav-bar-link">{item.label}</NavLink>
                    ) : (
                      dialogOpen.includes(item?.label) ? (
                        <Button variant="outlined" onClick={() => openCommonPop(item?.label)} style={{ color: '#fff' }}>{item?.label}</Button>

                      ) : (
                        <NavLink to={`${item.path}`} className="nav-bar-link">{item.label}</NavLink>

                      )
                    )
                  }

                </Button>
              ))}
            </Box>
            <CommonFormDialog></CommonFormDialog>
            <CommonMatMenuComponent />
          </globalInfoData.Provider>
          
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        
      </Box>
    {
      isOpenDialog && (

  <MessageInfoComponent type="success" message={successMessage} ></MessageInfoComponent>
      )
    }
    </Box>
  );
}

HeaderComponent.propTypes = {
  window: PropTypes.func,
};

export default HeaderComponent;
export {globalInfoData}