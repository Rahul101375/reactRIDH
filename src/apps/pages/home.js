import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CustomizedSnackbar from "../shared/common_snakebar";
import ApiCallComponent from '../apiService/common';
import LoaderComponent from '../shared/loader';
import './pages.css'
import { Grid, Typography, Paper, styled } from '@mui/material';
import CustomizedButtons from './button';
import CommonFormMaterial from '../shared/common_forms';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const HomeComponent = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(true);
    const homeFormFields = [
        { name: 'userName', label: 'Name', type: 'text', placeholder: 'Name' ,isRequired:true},
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Example@gmial.com',isRequired:true },
        { name: 'message', label: 'Message', type: 'text', placeholder: 'Enter your Message' ,isRequired:true}
    ];
    const [homePayload,setHomePayload] = useState({
        userName:'',
        email:'',
        message:''
    })
    const fromChildSnackbarClose = (e) => {
        setSnackbarOpen(e)
    }
    function truncateText(text, maxLength) {
        if (text && text.length > maxLength) {
            return text.slice(0, maxLength) + '...'; // Truncate and add ellipsis
        } else {
            return text; // No truncation needed
        }
    }
    const handleFormSubmit = (e) => {
       
        console.log("homePayload",homePayload,e)
        setHomePayload(e)
    }

    return (
        <>
            <Box component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                noValidate
                autoComplete="off"
            >
                <ApiCallComponent endpoint={'user/cms'} render={({ data, loading, error }) => (
                    <>
                        {loading && (
                            <LoaderComponent isLoader={loading}></LoaderComponent>
                        )
                        }
                        {error && (
                            <CustomizedSnackbar open={snackbarOpen} type="error" message={error?.response?.data?.message} duration={3000} snackbarClose={(e) => { fromChildSnackbarClose(e) }} />
                        )}
                        {data && (
                            <>
                                <CustomizedSnackbar open={snackbarOpen} type="success" message={data?.message} duration={3000} snackbarClose={(e) => { fromChildSnackbarClose(e) }} />
                                {
                                    data && data.data && data.data.length && (
                                        <>
                                            {
                                                data.data.map((el, key) => (
                                                    <section key={key} className={el.sectionId === 1 ? `section-${el.sectionId}` : `section-${el.sectionId} px-5`}>
                                                        {
                                                            [1, 2].includes(el.sectionId) ? (
                                                                <>
                                                                    <div className='container-fluid px-0 overflow-hidden'>
                                                                        <div className='row justify-content-end align-items-center'>
                                                                            <div className='col-sm-6'>
                                                                                <Typography className={el.sectionId === 1 ? 'text-white text-center' : 'primaryTextColor'} variant="h4">{el.title}</Typography>
                                                                                <small className={el.sectionId === 1 ? 'text-white text-center' : 'secondaryTextColor'} dangerouslySetInnerHTML={{ __html: truncateText(el.subTitle, 500) }}></small>
                                                                                {
                                                                                    el.sectionId === 2 && (
                                                                                        <CustomizedButtons buttonText={el.linkTitle} nextPage='about' />
                                                                                    )
                                                                                }
                                                                            </div>
                                                                            <div className='col-md-6 pe-0 text-end'>
                                                                                {
                                                                                    el.sectionId !== 1 ? (
                                                                                        <div class="colored-box position-relative">
                                                                                            <div class="hover-image">
                                                                                                <img src={el.banner} class="img-fluid" alt="" />
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <img src={el.banner} class="img-fluid w-100 home-banner" alt="" />
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Grid container key={key} className='my-3 justify-content-around'>
                                                                        {
                                                                            el.sectionId === 3 ? (
                                                                                <>
                                                                                    <Grid item xs={10} sm={10} md={10}>
                                                                                        <Item>
                                                                                            <img src={el.banner} class="img-fluid w-100 home-banner" alt="" />
                                                                                        </Item>
                                                                                    </Grid>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {
                                                                                        el.sectionId === 6 ? (
                                                                                            <>
                                                                                                <ApiCallComponent
                                                                                                    endpoint="user/impactstories?fetched=all"
                                                                                                    render={({ data, loading, error }) => (
                                                                                                        <>
                                                                                                            {loading && (
                                                                                                                <LoaderComponent isLoader={loading}></LoaderComponent>
                                                                                                            )
                                                                                                            }

                                                                                                            {error && (
                                                                                                                <CustomizedSnackbar open={snackbarOpen} type="error" message={error?.response?.data?.message} duration={3000} snackbarClose={(e) => { fromChildSnackbarClose(e) }} />
                                                                                                            )}
                                                                                                            {data && (
                                                                                                                <>
                                                                                                                    <CustomizedSnackbar open={snackbarOpen} type="success" message={data?.message} duration={3000} snackbarClose={(e) => { fromChildSnackbarClose(e) }} />
                                                                                                                    {data.data && data.data.length > 0 && (
                                                                                                                        <>

                                                                                                                            <Grid container key={key} className='my-3 justify-content-around'>
                                                                                                                                <Grid item xs={10} sm={10} md={10}>
                                                                                                                                    <Item>
                                                                                                                                        <div className='row'>
                                                                                                                                            {data.data.map((item, cardIndex) => (
                                                                                                                                                <div key={item.id} className='col-md-4 pe-0'>
                                                                                                                                                    <Typography className="secondaryTextColor text-center fw-500 p-2 m-2 text-truncate" variant='h6' mattooltip={item.title ? item.title : ""}>{item.title ? item.title : "---"}</Typography>
                                                                                                                                                    <div class="colored-box position-relative mx-3">
                                                                                                                                                        <div class="hover-image">
                                                                                                                                                            <img src={item.banner} class="img-fluid" alt={item.title} />
                                                                                                                                                        </div>
                                                                                                                                                    </div>

                                                                                                                                                    <span className='secondaryTextColor p-2 text-center' dangerouslySetInnerHTML={{ __html: truncateText(item.description, 150) }}></span>

                                                                                                                                                    {item.categoryId && (
                                                                                                                                                        <div className='text-center p-2'>
                                                                                                                                                            <CustomizedButtons buttonText='Read More' nextPage={`impactStory/${item.categoryId}`} />
                                                                                                                                                        </div>
                                                                                                                                                    )}



                                                                                                                                                </div>
                                                                                                                                            ))}
                                                                                                                                        </div>

                                                                                                                                    </Item>
                                                                                                                                </Grid>
                                                                                                                            </Grid>

                                                                                                                        </>
                                                                                                                    )}

                                                                                                                </>
                                                                                                            )}
                                                                                                        </>
                                                                                                    )}
                                                                                                    method=''
                                                                                                />
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                {
                                                                                                    el.sectionId === 7 ? (
                                                                                                        <>
                                                                                                            <Grid container className='my-3 justify-content-around'>
                                                                                                                <Grid item xs={10} sm={10} md={10}>
                                                                                                                    <Item>
                                                                                                                        <div className='row'>
                                                                                                                            {
                                                                                                                                el.data && el.data.length > 0 && (
                                                                                                                                    el.data.map((teamData, teamKey) => (
                                                                                                                                        <div className='col-3' key={teamKey}>
                                                                                                                                            <img src={teamData.profile} alt={teamData.name} style={{ width: '100%', height: '264.4px' }} />
                                                                                                                                            <Typography variant='h6' className='m-2 text-truncate'>{teamData.name}</Typography>
                                                                                                                                            <p className='mx-2'>{teamData.designation}</p>
                                                                                                                                        </div>
                                                                                                                                    ))
                                                                                                                                )
                                                                                                                            }
                                                                                                                        </div>
                                                                                                                    </Item>
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        <>
                                                                                                            {
                                                                                                                el.sectionId === 8 ? (
                                                                                                                    <>
                                                                                                                        <Grid container className='my-3 justify-content-around' spacing={2}>
                                                                                                                            <Grid item xs={6} sm={10} md={10}>
                                                                                                                                <Item>
                                                                                                                                    <div className='row'>
                                                                                                                                        <div className='col-6'>
                                                                                                                                            <Typography gutterBottom variant="h5" component="div" className='primaryTextColor text-center py-2'>
                                                                                                                                                <strong>{el.title}</strong>
                                                                                                                                            </Typography>
                                                                                                                                            <CommonFormMaterial fields={homeFormFields} onSubmit={(e) => handleFormSubmit(e)} buttonText="Submit"></CommonFormMaterial>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </Item>
                                                                                                                            </Grid>
                                                                                                                        </Grid>
                                                                                                                    </>
                                                                                                                ) : (
                                                                                                                    <>
                                                                                                                        <Grid item xs={10} sm={10} md={10}>
                                                                                                                            <Item>
                                                                                                                                <Typography gutterBottom variant="h5" component="div" className='primaryTextColor text-center'>
                                                                                                                                    <strong>{el.title}</strong>
                                                                                                                                </Typography>
                                                                                                                                <span className='mx-5 text-center' dangerouslySetInnerHTML={{ __html: el.subTitle }}></span>

                                                                                                                                <div className="col-12">
                                                                                                                                    <div id={'container-' + el.sectionId}>
                                                                                                                                        <div className="photoBanner mb-3">
                                                                                                                                            {
                                                                                                                                                el?.data && el?.data?.length && el?.data.map((innerData, innerKey) => (

                                                                                                                                                    <img className="mx-5 partnerImg" src={innerData.image} key={innerKey} alt='homePartnerImage' />

                                                                                                                                                ))
                                                                                                                                            }
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                                {
                                                                                                                                    el.sectionId === 4 && (
                                                                                                                                        <div className='col-12 text-center py-3'>
                                                                                                                                            <CustomizedButtons buttonText={el.linkTitle} nextPage='ourPartner' />
                                                                                                                                        </div>
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            </Item>
                                                                                                                        </Grid>
                                                                                                                    </>
                                                                                                                )
                                                                                                            }
                                                                                                        </>
                                                                                                    )
                                                                                                }

                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                </>
                                                                            )
                                                                        }
                                                                    </Grid>
                                                                </>
                                                            )
                                                        }
                                                    </section>
                                                ))
                                            }
                                        </>
                                    )
                                }

                            </>
                        )}
                    </>
                )} method='' />

            </Box>
        </>
    )
}

export default HomeComponent;