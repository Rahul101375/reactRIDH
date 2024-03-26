import React, { useState } from "react";
import CustomizedSnackbar from "../shared/common_snakebar";
import ApiCallComponent from '../apiService/common';
import LoaderComponent from '../shared/loader';
import './pages.css'
import { Typography, Box, Card, CardActions, CardContent, CardMedia, Button, Divider , Grid, Paper, styled} from '@mui/material';
import * as CommonMethod from '../apiService/common_method';
import DataTable from "../shared/common_tables";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const ResourceComponent = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const fromChildSnackbarClose = (e) => {
        setSnackbarOpen(e)
    }
     const tableHeading = [
          { field: 'id', headerName: 'ID', width: 190 },
          {
            field: 'term',
            headerName: 'Term',
            width: 350,
            editable: true,
          },
          {
            field: 'definition',
            headerName: 'Definition',
            width: 350,
            editable: true,
          },
          
          
        ];
    return (
        <>
            <Box component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                noValidate
                autoComplete="off"
            >
                <ApiCallComponent
                    endpoint='user/cms?sectionId=9'
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
                                                    <section className="aboutSection d-flex flex-column align-items-center justify-content-center mb-5" style={{ 'background-image': 'url(' + (data?.data[0]?.banner ? data?.data[0].banner : '') + ')' }}>
                                                        <div className="container-fluid">
                                                            <div className="row justify-content-center">
                                                                <div className="col-md-5">
                                                                    <div className="col text-center mt-3">
                                                                        <Typography variant="h3" className="text-black text-center">{data.data[0].title ? data.data[0].title : '---'}</Typography>
                                                                        <p className="text-black text-center" dangerouslySetInnerHTML={{ __html: CommonMethod.truncateText(data.data[0].subTitle, 500) }}></p>
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
                    endpoint='user/category?fetched=all'
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
                                                                    <Typography variant="h6" className="primaryTextColor fw-bold">Resource Center</Typography>
                                                                </div>
                                                                {
                                                                    data.data.map((el) => (
                                                                        <>
                                                                            <Card sx={{ maxWidth: 345 }} className="col-md-4 m-2">
                                                                                <CardMedia
                                                                                    sx={{ height: 140 }}
                                                                                    image={el?.image}
                                                                                    title={el?.name}
                                                                                    alt={el?.name}
                                                                                />
                                                                                <CardContent>
                                                                                    <Typography gutterBottom component="div" className="primaryTextColor">
                                                                                        {el?.name ? el?.name : '---'}
                                                                                    </Typography>
                                                                                </CardContent>
                                                                                <Divider style={{ background: 'black' }} />
                                                                                <CardActions className="justify-content-around">
                                                                                    <Button size="small">
                                                                                        {/* <Navigate to={`relatedStories/${el?.id}`} />R */}
                                                                                        View
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
                <section>
                    <ApiCallComponent
                        endpoint={`user/glossary?page=${pageNumber}`}
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
                                                    <Grid container className='my-3 justify-content-around'>
                                                        <Grid  item xs={10} sm={10} md={10}>
                                                            <Item>
                                                                <Typography variant="h6" className="primaryTextColor m-2 p-2">
                                                                  Glossary 
                                                                </Typography>
                                                                <div>
                                                                    <DataTable rows={data.data} columns={tableHeading}/>
                                                                </div>
                                                            </Item>
                                                        </Grid>
                                                    </Grid>
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }
                            </>
                        )}
                        method=""
                    />
                </section>
               
            </Box>
        </>
    )
}

export default ResourceComponent;