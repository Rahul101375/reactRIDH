import React, { memo } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
}));

export const UserProfileComponent = memo(({ provider, profile, onLogout }) => {
    const location = useLocation();
    const provider1 = location.state?.provider;
    const userInformation = location.state?.userInformation;
    const onLogout1 = location.state?.onLogout;
    console.log("profile",  onLogout1)
    const avatar =
        userInformation?.avatar ||
        userInformation?.profile_image_url ||
        userInformation?.avatar_url ||
        userInformation?.picture ||
        userInformation?.picture?.data?.url ||
        userInformation?.profile_image_url_https ||
        'https://maxcdn.icons8.com/Share/icon/p1em/users//gender_neutral_user1600.png'

    const getData = (stringValue, fieldName) => {
        const parsedObject = JSON.parse(stringValue);
        console.log(parsedObject);
        return parsedObject[fieldName];
    };
    return (
        <>
            <Grid container spacing={2}>
                <Grid Item sm={12}>
                    <Item>
                        <Typography style={{ textAlign: 'center',padding:10}}>
                            Provide By Information <strong>{provider1?.toUpperCase()}</strong>
                        </Typography>
                        <div className='card ' style={{ justifyContent: 'center', display: 'flex' }}>
                            <div className='avt' style={{ margin: '0px 10px', borderRadius: '50%', overflow: 'hidden', width: '50px', height: '50px' }}>
                                <img alt='141' src={avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            <div className='content'>
                                <div className='data'>
                                    {
                                        userInformation && (
                                            <>
                                                {
                                                    ['name', 'email'].map((el) => (
                                                        <div className='value' key={el} style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <strong>{getData(JSON.stringify(userInformation), el)}</strong>
                                                        </div>
                                                    ))
                                                }

                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', padding: 10 }}>
                            <Button type="submit" variant="contained" className='btnLogout' onClick={onLogout1} style={{ textAlign: 'center' }}>
                                Logout
                            </Button>
                        </div>
                    </Item>
                </Grid>
            </Grid>

        </>
    )
})
