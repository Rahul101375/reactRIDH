import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CustomizedSnackbar from "../shared/common_snakebar";
import ApiCallComponent from '../apiService/common';
import LoaderComponent from '../shared/loader';
import './pages.css'
import { Typography } from '@mui/material';
import CustomizedButtons from './button';

const HomeComponent = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(true);

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
                                                data.data.map((el,key) => (
                                                    <section key={key} className={el.sectionId === 1 ? `section-${el.sectionId}` : `section-${el.sectionId} px-5`}>
                                                        <div className='container-fluid px-0 overflow-hidden'>
                                                            <div className='row justify-content-end align-items-center'>
                                                                <div className='col-sm-6'>
                                                                   <Typography className={el.sectionId === 1 ? 'text-white text-center' : 'primaryTextColor'}  variant="h4">{el.title}</Typography> 
                                                                   <small className={el.sectionId === 1 ? 'text-white text-center' : 'secondaryTextColor'} dangerouslySetInnerHTML={{ __html: truncateText(el.subTitle, 500) }}></small>
                                                                   {
                                                                    el.sectionId === 2 && (
                                                                        <CustomizedButtons buttonText={el.linkTitle} nextPage='about'/>
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
                                                                
              
                                                                {/* <img src={el.banner} class="img-fluid w-100 home-banner" alt="" /> */}
                                                                </div>
                                                            </div>
                                                        </div>
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