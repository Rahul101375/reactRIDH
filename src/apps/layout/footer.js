import React, { useState } from "react";
import './footer.css';
import Typography from '@mui/material/Typography';
import CommonFormMaterial from "../shared/common_forms";
import ApiCallComponent from "../apiService/common";
import CustomizedSnackbar from "../shared/common_snakebar";

const FooterComponent = () => {
    const footerFormFields = [
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Example@gmial.com' }];
    const [email, setEmail] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(true);
    
    const fromChildSnackbarClose = (e)=>{
        setSnackbarOpen(e)
    }

    const handleFormSubmit = (e) => {
        setEmail(e)
        console.log("footer", e)
    }
    return (
        <>
            <div className="footer">
                <div className="d-flex justify-content-around">
                    <div>
                        <Typography className="text">Get started with INSTEP</Typography>
                        <small>Subscribe to us</small>
                    </div>
                    <div>
                        <CommonFormMaterial fields={footerFormFields} onSubmit={(e) => handleFormSubmit(e)}></CommonFormMaterial>
                    </div>
                </div>

                {
                    email && (
                        <ApiCallComponent endpoint={'user/subscribe'} render={({ data, loading, error }) => (
                            <div>
                                {loading && <p>Loading...</p>}
                                {error && (
                                    // <p>Error: {} {error?.response?.data?.success}</p>
                                    <CustomizedSnackbar open={snackbarOpen} type="error" message={error?.response?.data?.message} duration={3000} snackbarClose={(e)=>{fromChildSnackbarClose(e)}}/>
                                )}
                                {data && (
                                    <>
                                      <CustomizedSnackbar open={snackbarOpen} type="success" message={data?.message} duration={3000} snackbarClose={(e)=>{fromChildSnackbarClose(e)}}/>

                                    </>
                                )}
                            </div>
                        )} />
                    )
                }
                <div>

                </div>
            </div>

        </>
    )
}

export default FooterComponent;