// CommonFormMaterial.js
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import GoogleLoginComponent from './socialMediaLogin/google';
import FaceBookLoginComponent from './socialMediaLogin/facebook';
import TwitterLoginComponent from './socialMediaLogin/twitter';
import InstagramLoginComponent from './socialMediaLogin/instrgram';
import LinkedInLoginComponent from './socialMediaLogin/linkedIn';
import GithubLoginComponent from './socialMediaLogin/github';
import { useForm } from 'react-hook-form';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
}));



const CommonFormMaterial = ({ fields, onSubmit ,buttonText,openCommonPop}) => {
    const { register,handleSubmit, formState: { errors } } = useForm();
    const [formData, setFormData] = useState({});
    const handleChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCheckboxChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    const handleLogin = ()=>{
      openCommonPop('Login')
    }
    const handleRegister = ()=>{
        openCommonPop('XXXX')
    }
    
    const renderField = (field,register, errors) => {
        switch (field.type) {
            case 'text':
            case 'password':
            case 'email':
                return (
                    <TextField
                    {...register(field.name, { required: field.isRequired })}
                    error={!!errors[field.name]}
                    helperText={errors[field.name] ? `${field.label} is required` : ''}
                        type={field.type}
                        id={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        required={field.isRequired}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        fullWidth
                        />
                );
            case 'date':
                return (
                    <DatePicker
                    {...register(field.name, { required: field.isRequired })}
                    error={!!errors[field.name]}
                    helperText={errors[field.name] ? `${field.label} is required` : ''}
                        label={field.label}
                        value={formData[field.name] || null}
                        placeholder={field.placeholder}
                        onChange={(value) => handleChange(field.name, value)}
                        renderInput={(params) => <TextField {...params} />}
                        fullWidth
                        required={field.isRequired}
                    />
                );
            case 'select':
                return (

                    <Select
                    {...register(field.name, { required: field.isRequired })}
                    error={!!errors[field.name]}
                    helperText={errors[field.name] ? `${field.label} is required` : ''}
                        label={field.label}
                        value={formData[field.name] || ''}
                        placeholder={field.placeholder}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        fullWidth
                        required={field.isRequired}
                       
                    >
                        {field.options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                );
            case 'checkbox':
                return (
                    <FormControlLabel 
                    fullWidth
                    
                        control={
                            <Checkbox
                            {...register(field.name, { required: field.isRequired })}
                            error={!!errors[field.name]}
                             helperText={errors[field.name] ? `${field.label} is required` : ''}
                                checked={formData[field.name] || false}
                                placeholder={field.placeholder}
                                onChange={(e) => handleCheckboxChange(field.name, e.target.checked)}
                                required={field.isRequired}
                                
                            />
                        }
                        style={{padding:"8px"}}
                        label={field.label}
                    />
                );
            case 'radio-group':
                return (
                    <RadioGroup
                    {...register(field.name, { required: field.isRequired })}
                    error={!!errors[field.name]}
                     helperText={errors[field.name] ? `${field.label} is required` : ''}
                        name={field.name}
                        value={formData[field.name] || ''}
                        placeholder={field.placeholder}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        fullWidth
                        required={field.isRequired
                        }
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 5px',padding:'8px' }}>
                            {field.options.map((option) => (

                                <div>
                                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                                </div>

                            ))}
                        </div>
                    </RadioGroup>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
           
            <form onSubmit={handleSubmitForm}>
                <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} >
                    {
                        fields.map((field) => (
                            <Grid item xs={12} sm={6} md={6} key={field.name} style={{ marginBottom: '16px' }}>
                                <Item>
                                    {renderField(field,register, errors)}
                                    
                                </Item>
                            </Grid>
                        ))
                    }
                   {
                    buttonText && (
                        <Grid item xs={12} style={{textAlign:'center'}}>
                        <Button type="submit" variant="contained" >
                            {buttonText}
                        </Button>
                        <Typography spacing={2} style={{padding:'10px'}}>
                            {
                               
                                buttonText === 'Login' ?
                                    <>
                                         New User  ?  <strong variant="primary" style={{ cursor: 'pointer' }} onClick={()=>openCommonPop('Join Now')}>Register</strong>

                                    </>
                                    :
                                    <>
                                        Existing User ? <strong variant="primary" style={{ cursor: 'pointer' }} onClick={()=>openCommonPop('Login')}>Login</strong>
                                    </>

                            }
                        </Typography>
                       
                    </Grid>
                    )
                   }
                </Grid>
                {
                    buttonText === 'Login' && (
                        <Grid container justifyContent="center">
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Item style={{ margin: '0px' }}>
                                    <div style={{display:'flex',justifyContent:'center',padding:'5px'}}>
                                    <GoogleLoginComponent />
                                    <FaceBookLoginComponent />
                                    <TwitterLoginComponent />
                                    <InstagramLoginComponent />
                                    <LinkedInLoginComponent />
                                    <GithubLoginComponent />
                                    </div>
                                </Item>
                            </Grid>
                        </Grid>
                    )
                }
            </form>

        </Box>

    );
};

export default CommonFormMaterial;
