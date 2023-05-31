import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useRouter } from 'next/router';

const ForgetPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailScreen, setEmailScreen] = useState(true);

  const [authEmail, setAuthEmail] = useState('');
  const [otpScreen, setOtpScreen] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120);
  const [resendBtn, setResendBtn] = useState(false);
  const [newPasswordScreen, setNewPasswordScreen] = useState(false);
  const [passowrdError, setPasswordError] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailSubmit = async () => {
    const emailVer = emailValidator(email);
    if (emailVer) {
      await axios
        .post('http://localhost:8000/auth/email', { email })
        .then((result) => {
          if (result.data.Status === 'Success') {
            setAuthEmail(result.data.authEmail);
            console.log(result.data.authEmail);
            alert('Email Found');
            setEmailScreen(false);
            setOtpScreen(true);
            timeCountDown();
          } else {
            alert(result.data.Status);
            setEmailScreen(true);
            setOtpScreen(false);
          }
        })
        .catch((e) => {
          console.log('Axios error forgetPassword', e);
        });
    }
  };

  const handleDeleteOTP = async () => {
    await axios
      .post('http://localhost:8000/auth/resetOTP', {
        email,
      })
      .then((result) => {
        if (result.data.Status === 'Success') {
          setResendBtn(true);
        } else {
          setResendBtn(false);
        }
      })
      .catch((e) => {
        console.log('axios error resetOtp', e);
      });
  };

  const timeCountDown = () => {
    var timeleft = 120;
    var downloadTimer = setInterval(function () {
      timeleft--;
      setTimer(timeleft);
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        handleDeleteOTP();
      }
    }, 1000);
  };

  const handleOTP = async (e) => {
    e.preventDefault();
    const otpVer = otpValidation(otp);
    if (otpVer) {
      await axios
        .post('http://localhost:8000/auth/otpVer', {
          authEmail,
          otp,
        })
        .then((result) => {
          if (result.data.Status === 'Success') {
            setOtpScreen(false);
            setNewPasswordScreen(true);
          } else {
            alert(result.data.Status);
            setOtpScreen(true);
            setNewPasswordScreen(false);
          }
        });
    }
  };

  const otpValidation = (num) => {
    if (num.length < 4) {
      alert('OTP should be 4 digit');
      return false;
    } else {
      return true;
    }
  };

  //Email
  const emailValidator = (text) => {
    var exp1 =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!text) {
      setEmailError(true);
      return false;
    } else {
      if (!exp1.test(text)) {
        setEmailError(true);
        return false;
      } else {
        setEmailError(false);
        return true;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passVer = newPasswordValidation(newPassword);
    const matchVer = matchValidation(newPassword, confirmPassword);
    if (passVer && matchVer) {
      await axios
        .put('http://localhost:8000/auth/resetPassword', {
          email,
          newPassword,
        })
        .then((result) => {
          if (result.data.Status === 'Success') {
            alert('Password is Successfully updated Please login now!');
            router.push('/login');
          } else {
            alert(result.data.Status);
          }
        });
    }
  };

  const newPasswordValidation = (pass) => {
    const exp = /^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    if (!pass) {
      alert('Please fill all the input fields');
      return false;
    } else {
      if (!exp.test(pass)) {
        setPasswordError(true);
        return false;
      } else {
        setPasswordError(false);
        return true;
      }
    }
  };

  const matchValidation = (newPass, confirm) => {
    if (newPass === confirm) {
      return true;
    } else {
      alert('Confirm Pappsword should be same as New Password');
      return false;
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="forget-parent">
      <div className="forget-child">
        {emailScreen && (
          <>
            <h4>Enter your registered mail ID</h4>
            <input
              type="email"
              placeholder="example@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {emailError ? (
              <p style={{ color: 'red' }}>
                <i>Enter valid email ID!</i>
              </p>
            ) : null}
            <button onClick={handleEmailSubmit}>Submit</button>
          </>
        )}
        {otpScreen && (
          <>
            <p className="otpExpire">OTP expires in : {timer}</p>
            {resendBtn && <button className="resendBtn">Resend</button>}
            <h4 className="otph4">
              Enter OTP sent to your registered email ID
            </h4>

            <div className="forgetOtp">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <button className="otpButton" onClick={handleOTP}>
              Submit
            </button>
          </>
        )}
        {newPasswordScreen && (
          <>
            <h4 className="otph4">Enter New Password</h4>
            <div className="inputbox">
              <input
                className="newPass"
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <span className="placeholder_icon" onClick={handleTogglePassword}>
                <span className=" d-flex align-items-center">
                  {showPassword ? (
                    <>
                      <i class="fa-regular fa-eye"></i>
                    </>
                  ) : (
                    <>
                      <i class=" fa-regular fa-eye-slash"></i>
                    </>
                  )}
                </span>
              </span>
            </div>
            {passowrdError ? (
              <p style={{ color: 'red' }}>
                <i>
                  Password must containe at least 1 uppercase, 1 lowercase, 1
                  digit, 1 special character and have a length of at least of 10
                </i>
              </p>
            ) : null}
            <br />
            <div className="inputbox">
              <input
                className="newPass"
                type="password"
                placeholder="Confirm New Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <button onClick={handleSubmit} className="newPassbtn">
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
