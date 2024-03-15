import React,{useState} from "react";
import CustomizedSnackbar from "../shared/common_snakebar";
import ApiCallComponent from '../apiService/common';
import LoaderComponent from '../shared/loader';
import './pages.css'
// import { Grid, Typography, Paper, styled } from '@mui/material';
import Box from '@mui/material/Box';


// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(0),
//     textAlign: 'left',
//     color: theme.palette.text.secondary,
// }));


const AboutComponent = ()=>{
    const [snackbarOpen, setSnackbarOpen] = useState(true);
    const fromChildSnackbarClose = (e) => {
        setSnackbarOpen(e)
    }
    return (
        <>
           <Box component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                noValidate
                autoComplete="off"
            >
                <ApiCallComponent
                    endpoint='user/cms?sectionId=2'
                    render={({ data, loading, error }) => (
                        <>
                         {
                            loading && (
                                <LoaderComponent isLoading={loading} />
                            )
                         }
                         {
                                error && (
                                    <CustomizedSnackbar open={snackbarOpen} type="error" message={error?.response?.data?.message} duration={3000} snackbarClose={(e) => { fromChildSnackbarClose(e) }} />
                                )
                            }
                        {
                            data && (
                                <>
                                <CustomizedSnackbar open={snackbarOpen} type="success" message={data?.message} duration={3000} snackbarClose={(e) => { fromChildSnackbarClose(e) }} />
                                {
                                    data && data?.data && data?.data.length && (
                                        <>
                                          <pre>
                                            {data}
                                          </pre>
                                        </>
                                        )
                                    }
                                    </>
                            )
                        }
                        </>
                    )}
                    method=''
                    />
            </Box>
        </>
    )
}

export default AboutComponent;