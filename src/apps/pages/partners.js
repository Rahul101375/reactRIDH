import React, { useState } from "react";
import Box from '@mui/material/Box';
import CustomizedSnackbar from "../shared/common_snakebar";
import ApiCallComponent from '../apiService/common';
import LoaderComponent from '../shared/loader';
import './pages.css'
import { Grid, Typography, Paper, styled } from '@mui/material';
import * as CommonMethod from '../apiService/common_method'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));


const OurPartnerComponent = () => {
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
                    endpoint='user/cms?sectionId=4'
                    render={({ data, loading, error }) => (
                        <>
                            {
                                loading && (
                                    <LoaderComponent isLoader={loading} />
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
                                            data && data.data && data.data.length && (
                                                <>
                                                    <section className="partnerComp d-flex flex-column align-items-center justify-content-center mb-5">
                                                        <div className="container-fluid">
                                                            <div className="row justify-content-center">
                                                                <div className="col-md-5">
                                                                    <div className="col text-center mt-3">
                                                                        <Typography variant="h3" className="text-white text-center">{data.data[0].title}</Typography>
                                                                        <p className="text-white text-center" dangerouslySetInnerHTML={{ __html: CommonMethod.truncateText(data.data[0].subTitle, 500) }}></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </section>

                                                    <section>
                                                        <Grid>
                                                            {
                                                                data.data[0].data.map((item, key) => (
                                                                    <>
                                                                        <Grid item sm={12} key={key} className="my-2">
                                                                            <Item>
                                                                                {
                                                                                    key % 2 === 0 ? (
                                                                                        <>
                                                                                            <div className="row">
                                                                                                <div className="col-md-3 text-center">
                                                                                                    <img src={item.image} alt={item.title} className="partnerImg" />
                                                                                                </div>
                                                                                                <div className='col-md-9'>
                                                                                                    <Typography variant="h6" className="fw-bold text-center m-2" mattooltip={item.title}>{item.title}</Typography>
                                                                                                    <div className="m-3 fw-500">{item.description}</div>
                                                                                                </div>

                                                                                            </div>
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <div className="row">
                                                                                                <div className='col-md-9'>
                                                                                                    <Typography variant="h6" className="fw-bold text-center m-2" mattooltip={item.title}>{item.title}</Typography>
                                                                                                    <div className="m-4 fw-500">{item.description}</div>
                                                                                                </div>
                                                                                                <div className="col-md-3 text-center">
                                                                                                    <img src={item.image} alt={item.title} className="partnerImg" />
                                                                                                </div>
                                                                                            </div>
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            </Item>
                                                                        </Grid>
                                                                    </>
                                                                ))
                                                            }
                                                        </Grid>
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

export default OurPartnerComponent;