import React from 'react';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import './social_style.css';
import { useNavigate } from 'react-router-dom';
import { globalInfoData } from '../../layout/header';
const FB = window.FB;

const initializeFacebookSDK = () => {
  window.fbAsyncInit = function () {
    FB.init({
      appId: environment?.facebookAppId,
      cookie: true,
      xfbml: true,
      version: 'v13.0'
    });
  };

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};

export default function FaceBookLoginComponent() {
  const { openCommonPop } = React.useContext(globalInfoData);
  console.log("props", openCommonPop)
  const REDIRECT_URI = "http://localhost:3000";
  const onLoginStart = React.useCallback(() => {
    alert('login start');
  }, []);
  const navigate = useNavigate();
  const onLogout = React.useCallback(() => {
    console.log("social login")
    navigate('/home');
  }, []);

  // Ensure proper initialization before rendering the component
  initializeFacebookSDK();

  const onResolve = async ({ provider, data }) => {
    try {
      // Exchange authorization code for access token
      const response = await axios.get('https://graph.facebook.com/v13.0/oauth/access_token', {
        params: {
          client_id: environment?.facebookAppId,
          client_secret: environment?.facebookAppSecret,
          redirect_uri: REDIRECT_URI,
          code: data.code,
        },
      });

      const accessToken = response.data.access_token;

      // Use the access token to fetch user information
      const userInfoResponse = await axios.get('https://graph.facebook.com/v13.0/me', {
        params: {
          fields: 'id,name,email,picture',
          access_token: accessToken,
        },
      });

      const userInformation = userInfoResponse.data;
      console.log('User Information:', userInformation);

      setTimeout(() => {
        navigate('/profile', {
          state: {
            provider,
            userInformation,
          },
          onLogout,
        });
      }, 100);

      openCommonPop("");
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  return (
    <>
      <LoginSocialFacebook
        client_id={environment?.facebookAppId}
        onLoginStart={onLoginStart}
        redirect_uri={REDIRECT_URI}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        version="v13.0"
        onResolve={({ provider, data }) => {
          console.log("provider", provider, data);
          onResolve({ provider, data });
        }}
        onReject={err => {
          console.log("err", err);
        }}
      >
        <div className="icon-only-google-button">
          <FacebookLoginButton />
        </div>
      </LoginSocialFacebook>
    </>
  );
}
