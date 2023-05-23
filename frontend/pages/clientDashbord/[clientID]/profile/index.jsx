import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Invest = () => {
  const router = useRouter();
  const { clientID } = router.query;

  const [auth, setAuth] = useState(false);
  const [showData, setShowData] = useState(false);
  const [pageData, setPageData] = useState('');

  const [showInput, setShowInput] = useState(false);
  const [existingPassword, setExistingPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passowrdError, setPasswordError] = useState(false);

  axios.defaults.withCredentials = true;

  const fetchAPI2 = async (url) => {
    try {
      let hash = clientID.replace(/slash/g, '/');
      await axios
        .post(url, { authEmail: hash })
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);
            let hash = clientID.replace(/slash/g, '/');
            try {
              axios
                .post('http://localhost:8000/client/profile', {
                  authEmail: hash,
                })
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    setShowData(true);
                    setPageData(result.data.result);
                  } else {
                    setShowData(false);
                  }
                })
                .catch((e) => {
                  console.log('axios', e);
                });
            } catch (e) {
              console.log(e);
            }
          } else {
            setAuth(false);
            router.push('/auth/login');
          }
        })
        .catch((e) => {
          console.log('axios', e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!clientID) {
      return;
    }
    const API2 = 'http://localhost:8000/auth/auth';
    fetchAPI2(API2);
  }, [clientID]);

  const handleCred = () => {
    const existingVer = existingPasswordValidation(existingPassword);
    const newVer = newPasswordValidation(newPassword);
    const confirmVer = newPasswordValidation(confirmPassword);
    if (existingVer && newVer && confirmVer) {
      axios
        .put('http://localhost:8000/auth/update', {
          existingPassword,
          newPassword,
          confirmPassword,
          email: pageData.userEmail,
        })
        .then((result) => {
          if (result.data.Status === 'Success') {
            alert('Password Updated Successfully please login again');
            logout();
            window.location.reload(true);
          } else {
            alert(result.data.Status);
          }
        });
    } else {
      alert('Please fill all the input fields');
    }
  };

  const handleChangePasswordButton = () => {
    setShowInput(true);
  };

  const existingPasswordValidation = (pass) => {
    if (!pass) {
      return false;
    } else {
      return true;
    }
  };

  const newPasswordValidation = (pass) => {
    const exp = /^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    if (!pass) {
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

  const logout = async () => {
    await axios
      .post('http://localhost:8000/auth/logout')
      .then((res) => {
        console.log(res);
        if (res.data.Status === 'Success') {
          window.location.reload(true);
        } else {
          alert('failed to logout');
        }
      })
      .catch((e) => {
        console.log('logout axios error', e);
      });
  };

  return (
    <>
      {auth && (
        <>
          {showData ? (
            <>
              <h1>Profile</h1>
              <h4>{pageData.username}</h4>
              <h4>{pageData.userEmail}</h4>
              <button onClick={handleChangePasswordButton}>
                Change password
              </button>
              {showInput ? (
                <>
                  <input
                    type="password"
                    placeholder="Existing Password"
                    onChange={(e) => {
                      setExistingPassword(e.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                  <p><i>Password must containe at least 1 uppercase, 1 lowercase,
                      1 digit, 1 special character and have a length of at least
                      of 10</i></p>
                  {passowrdError ? (
                    <p style={{ color: 'red' }}>
                      Password must containe at least 1 uppercase, 1 lowercase,
                      1 digit, 1 special character and have a length of at least
                      of 10
                    </p>
                  ) : null}
                  <br />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <br />
                  <button onClick={handleCred}>Submit</button>
                </>
              ) : null}
              <button onClick={logout}>logout</button>
            </>
          ) : (
            'Loading...'
          )}
        </>
      )}
    </>
  );
};

export default Invest;
