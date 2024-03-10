import React from 'react';
import { LoginSocialTwitter } from 'reactjs-social-login';
import { TwitterLoginButton } from 'react-social-login-buttons';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import './social_style.css';
import { useNavigate } from 'react-router-dom';
import { globalInfoData } from '../../layout/header';

export default function TwitterLoginComponent() {
    const {openCommonPop } = React.useContext(globalInfoData);
    const REDIRECT_URI = "http://localhost:3000"
    const onLoginStart = React.useCallback(() => {
      alert('login start');
    }, []);
    const navigate = useNavigate();
    const onLogout = React.useCallback(() => {
        console.log("social login")
        navigate('/home')
    }, []);
  
  
    const onResolve = async ({ provider, data }) => {
      try {
        // Exchange authorization code for access token
        const response = await axios.post('https://oauth2.googleapis.com/token', {
          code: data.code,
          redirect_uri: REDIRECT_URI,
          client_id: environment?.twitterAppId,
          client_secret: environment?.twitterAppSecret, // Replace with your client secret
          grant_type: 'authorization_code',
        });
    
        const accessToken = response.data.access_token;
    
        // Use the access token to fetch user information
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
    
        const userInformation = userInfoResponse.data;
        console.log('User Information:', userInformation);
        setTimeout(()=>{
            navigate('/profile', {
                state: {
                  provider,
                  userInformation,
                  // Avoid passing non-serializable values like functions
                },
                onLogout, // Pass functions separately, outside of the state
              });
              
        },100)
        openCommonPop("")
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
  
  
    return (
      <>
     
  
  <LoginSocialTwitter
    client_id={environment?.twitterAppId}
    onLoginStart={onLoginStart}
    redirect_uri={REDIRECT_URI}
    scope="openid profile email"
    discoveryDocs="claims_supported"
    access_type="offline"
    onResolve={({ provider, data }) => {
      console.log("provider",provider,data)
      onResolve({provider,data})
    }}
    onReject={err => {
      console.log("err",err);
    }}
  >
    <div className="icon-only-google-button">
      <TwitterLoginButton />
    </div>
  </LoginSocialTwitter>
          
      </>
    );
  }