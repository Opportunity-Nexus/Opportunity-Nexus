import React from 'react';    
import '../Styles/Login.css';
import LeftPanelImage from '../Assets/loginImage3.png';
import Gmail from "../Assets/Gmail.png";
import Microsoft from "../Assets/Microsoft.png";
import Yahoo from "../Assets/Yahoo.png";
import Facebook from "../Assets/Facebook.png";
import Apple from "../Assets/Apple.png";
import PasswordIcon from "../Assets/PasswordIcon.png";


export default function Login(){
  return (
    <div className="default">
      <div className="forget-password">Forget Password?</div>
      <div className="not-registered-create-container">
        <span>
          <span>Not registered?</span>
        </span>
        <span className="create-an-account">
          <span>{` `}</span>
          <b className="create-an-account1">Create an account</b>
        </span>
      </div>
      <b className="login-to-your">Login to your account</b>
      <div className="welcome-back-container">
        <span>Welcome back!</span>
        <span className="span"> 👋</span>
      </div>
      <div className="left-side-panel">
        <div className="left-side-panel-child" />
        <img className="image-3-icon" alt="" src={LeftPanelImage}/>
      </div>
      <div className="sign-in-using-panel">
        <div className="login-using">Login using</div>
        <div className="logos">
          <div className="gmail">
            <img className="image-2-icon" alt="" src={Gmail} />
          </div>
          <div className="microsoft">
            <img className="image-2-icon" alt="" src={Microsoft}/>
          </div>
          <div className="yahoo">
            <img className="image-2-icon" alt="" src={Yahoo} />
          </div>
          <div className="apple">
            <img className="image-2-icon" alt="" src={Apple} />
          </div>
          <div className="facebook">
            <img className="image-2-icon" alt="" src={Facebook} />
          </div>
        </div>
      </div>
      <div className="or-divider">
        <div className="or-divider-child" />
        <div className="or-wrapper">
          <div className="or">Or</div>
        </div>
      </div>
      <div className="cta">
        <b className="label">Login</b>
      </div>
      <div className="password">
        <div className="login-using">Password</div>
        <div className="password-placeholder">
          <div className="placeholder">Enter password</div>
          <img className="icon" alt="" src={PasswordIcon} />
        </div>
      </div>
      <div className="email">
        <div className="login-using">Email</div>
        <div className="enter-email-placeholder">
          <div className="placeholder">Please enter your email</div>
        </div>
      </div>
    </div>
  );
};
