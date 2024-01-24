import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CustomizedButtons from '../pages/button'

const HomeComponent = ()=>{
    const [userName,setUserName] = React.useState('');
    const [role,setRole] = React.useState('');

    React.useEffect(()=>{});
    const handlerForm = (e)=>{
        e.preventDefault();
        console.log("userForm",userName,role)
    }
    return (
        <>
        Home  component 

            <Box component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                noValidate
                autoComplete="off"
            >

                <form onSubmit={()=>handlerForm()}>
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            value={userName}
                            onChange={(e)=> setUserName(e.target.value)}
                        />
                    </div>

                    <div>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                required
                                value={role}
                                onChange={(e)=> setRole(e.target.value)}
                                label="Role"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Twenty</MenuItem>
                                <MenuItem value={21}>Twenty one</MenuItem>
                                <MenuItem value={22}>Twenty one and a half</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <CustomizedButtons buttonText="Create User" > </CustomizedButtons>
                    </div>
                </form>

            </Box>
        </>
    )
}

export default HomeComponent;