import React, { useState } from "react";
import { Typography, Box, Card, CardActions, CardContent, CardMedia, Button, Divider } from '@mui/material';
import ApiCallComponent from "../apiService/common";
import LoaderComponent from "../shared/loader"
import CustomizedSnackbar from "../shared/common_snakebar";
import * as CommonMethod from "../apiService/common_method";
// import { Navigate } from 'react-router-dom';

const ImpactStoriesComponent = () => {
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
                    endpoint='user/cms?sectionId=12'
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
                                                    <section className="aboutSection d-flex flex-column align-items-center justify-content-center mb-5" style={{ 'background-image': 'url(' + (data?.data[0].banner) + ')' }}>
                                                        <div className="container-fluid">
                                                            <div className="row justify-content-center">
                                                                <div className="col-md-5">
                                                                    <div className="col text-center mt-3">
                                                                        <Typography variant="h3" className="text-white text-center">{data.data[0].title}</Typography>
                                                                        <p className="text-white text-center" dangerouslySetInnerHTML={{ __html: data.data[0].subTitle }}></p>
                                                                    </div>
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

                <ApiCallComponent
                    endpoint='user/impactstories?fetched=all'
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
                                                    <section>
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <Typography variant="h6" className="primaryTextColor fw-bold">Impact Stories</Typography>
                                                                </div>
                                                                {
                                                                    data.data.map((el) => (
                                                                        <>
                                                                            <Card sx={{ maxWidth: 345 }} className="col-md-4 m-2">
                                                                                <CardMedia
                                                                                    sx={{ height: 140 }}
                                                                                    image={el?.banner}
                                                                                    title={el?.title}
                                                                                    alt={el?.title}
                                                                                />
                                                                                <CardContent>
                                                                                    <Typography gutterBottom variant="h5" component="div" className="primaryTextColor">
                                                                                        {el?.title ? el?.title :'---'}
                                                                                    </Typography>
                                                                                    <Typography variant="body2" color="text.secondary text-truncate" dangerouslySetInnerHTML={{ __html: CommonMethod.truncateText(el.description, 300) }}>
                                                                                       
                                                                                    </Typography>
                                                                                </CardContent>
                                                                                <Divider style={{background : 'black'}}/>
                                                                                <CardActions className="justify-content-around"> 
                                                                                    <Button size="small">
                                                                                    {/* <Navigate to={`relatedStories/${el?.id}`} />R */}
                                                                                    Read More
                                                                                    </Button>
                                                                                </CardActions>
                                                                            </Card>
                                                                        </>
                                                                    ))
                                                                }
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

export default ImpactStoriesComponent;