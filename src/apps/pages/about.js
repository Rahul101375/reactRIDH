import React, { useState } from "react";
import CustomizedSnackbar from "../shared/common_snakebar";
import ApiCallComponent from '../apiService/common';
import LoaderComponent from '../shared/loader';
import './pages.css'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';


// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(0),
//     textAlign: 'left',
//     color: theme.palette.text.secondary,
// }));


const AboutComponent = () => {
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
                                                    <section className="aboutSection d-flex flex-column align-items-center justify-content-center" style={{ 'background-image': 'url(' + (data?.data[0].banner) + ')' }}>
                                                        <div className="container-fluid">
                                                            <div className="row justify-content-center align-items-center">
                                                                <div className="col-md-5">
                                                                    <Typography variant="h3" className="text-white text-center">{data.data[0].title}</Typography>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>

                                                    <section>
                                                        <div className="container">
                                                            <div className="row justify-content-center">
                                                                <div className="col-md-8">
                                                                <p className="text-black text-center" dangerouslySetInnerHTML={{ __html: data.data[0].subTitle}}></p>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
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