import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export default function ToggleButtonComponent(props) {
    let { tabName ,childToParentSendDataMethod} = props;
    const [alignment, setAlignment] = React.useState('');
    console.log("toggle-botton", props)

    const handleChange = (event, newAlignment) => {
        tabName = tabName?.map((el)=>{
            if(['overAll','worker Welfare','womenEmpowerment','ohs'].includes(newAlignment)){
                el.isSubChecked = el?.id === newAlignment
            }
            else if(['energy','water','chemical'].includes(newAlignment)){
                el.isSubChecked = el?.id === newAlignment
            }
            el.isChecked = el?.id === newAlignment
            return el
        })
      console.log("handle", tabName,event?.value)
        setAlignment(newAlignment);
        childToParentSendDataMethod(tabName);
    };

    return (
        <React.Fragment>
            <CssBaseline />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Item>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={alignment}
                                    exclusive
                                    onChange={handleChange}
                                    aria-label="Platform"
                                >


                                    {
                                        tabName.map((el) => (
                                            <ToggleButton key={el?.label} value={el?.id} selected={el?.isChecked || el?.isSubChecked}>
                                                {el?.label}
                                            </ToggleButton>
                                        ))
                                    }

                                </ToggleButtonGroup>
                            </Item>
                        </Grid>
                    </Grid>
        </React.Fragment>


    );
}