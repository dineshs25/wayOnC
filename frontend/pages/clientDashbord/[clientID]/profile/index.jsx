import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ClientSidebar from '../../../../components/client/ClientSideBar';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import Load from '../../../../components/common/Loading';

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
  const [profileImage, setProfileImage] = useState('');
  const [ID, setID] = useState('');

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
                .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/client/profile`, {
                  authEmail: hash,
                })
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    setShowData(true);
                    setPageData(result.data.result);
                    setProfileImage(result.data.image);
                    setID(result.data.clientID)
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
            router.push('/login');
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
    const API2 = `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/auth`;
    fetchAPI2(API2);
  }, [clientID]);

  const handleCred = async (e) => {
    e.preventDefault();
    const existingVer = existingPasswordValidation(existingPassword);
    const newVer = newPasswordValidation(newPassword);
    if (existingVer && newVer) {
      if (newPassword === confirmPassword) {
        await axios
          .put(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/update`, {
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
          })
          .catch((e) => {
            alert('Failed to change password');
          });
      } else {
        alert('New Password and Confirm Password are not matching');
      }
    }
  };

  const handleChangePasswordButton = () => {
    if (showInput === false) {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
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

  const logout = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`)
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
            <div className="adminDashbord-parent">
              <div className="child-sidebar">
                <ClientSidebar
                  userID={clientID}
                  name={pageData.username}
                  email={pageData.userEmail}
                  image={profileImage}
                  clientId={ID}
                />
              </div>
              <div className="child-content">
                <div className="admin-content scroll">
                  <div>
                    <Container>
                      <h1>Profile</h1>
                      <Table
                        aria-label="Example table with static content"
                        css={{
                          height: 'auto',
                          minWidth: '100%',
                        }}
                      >
                        <Table.Header>
                          <Table.Column>NAME</Table.Column>
                          <Table.Column>EMAIL</Table.Column>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>{pageData.username}</Table.Cell>
                            <Table.Cell>{pageData.userEmail}</Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>

                      <button
                        className="changeCred-btn"
                        onClick={handleChangePasswordButton}
                      >
                        Change password
                      </button>
                      {showInput ? (
                        <div
                          className={
                            showInput
                              ? 'changeCred-div'
                              : 'changeCred-div-fade-out'
                          }
                        >
                          <form>
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
                            {passowrdError ? (
                              <p style={{ color: 'red' }}>
                                <i>
                                  Password must containe at least 1 uppercase, 1
                                  lowercase, 1 digit, 1 special character and
                                  have a length of at least of 10
                                </i>
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
                          </form>
                        </div>
                      ) : null}
                    </Container>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Load />
          )}
        </>
      )}
    </>
  );
};

export default Invest;
