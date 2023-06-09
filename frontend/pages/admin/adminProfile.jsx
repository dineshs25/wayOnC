import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import LogOut from '../../components/auth/logout';
import Link from 'next/link';
import Sidebar from '../../components/admin/Sidebar';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import Load from '../../components/common/Loading';

const AdminProfile = () => {
  const router = useRouter();

  const [auth, setAuth] = useState(false);
  const [adminData, setAdminData] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInputs, setShowInputs] = useState(false);

  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminExistingPassword, setAdminExistingPassword] = useState('');
  const [adminNewPassword, setAdminNewPassword] = useState('');
  const [adminConfirmPassword, setAdminConfirmPassword] = useState('');

  axios.defaults.withCredentials = true;
  const fetchAPI2 = async (url) => {
    try {
      await axios
        .get(url)
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);
            axios
              .get(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/adminProfile`)
              .then((result) => {
                if (result.data.Status === 'Success') {
                  if (result.data.result.length === null) {
                    alert('Admin not found');
                  } else {
                    setLoading(true);
                    setAdminData(result.data.result[0]);
                    setAdminName(result.data.result[0].adminName);
                    setAdminEmail(result.data.result[0].adminEmail);
                  }
                } else {
                  alert('Admin Not found');
                }
              })
              .catch((e) => {
                alert('Admin Not found');
              });
          } else {
            setAuth(false);
            router.push('/admin/login');
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
    const API2 = `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/auth`;
    fetchAPI2(API2);
  }, []);

  const logout = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/logout`)
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

  const handleButton = () => {
    if (showInputs === false) {
      setShowInputs(true);
    } else {
      setShowInputs(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminNameVer = adminValidation(adminName);
    const adminEmailVer = emailValidator(adminEmail);
    const adminExistingPasswordVer = adminValidation(adminExistingPassword);
    const adminNewPasswordVer = adminValidation(adminNewPassword);
    const adminConfirmPasswordVer = adminValidation(adminConfirmPassword);
    if (
      adminNameVer &&
      adminEmailVer &&
      adminExistingPasswordVer &&
      adminNewPasswordVer &&
      adminConfirmPasswordVer
    ) {
      if (adminNewPassword === adminConfirmPassword) {
        await axios
          .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/changeCred`, {
            adminName,
            adminEmail,
            adminExistingPassword,
            adminNewPassword,
            adminExistingEmail: adminData.adminEmail,
          })
          .then((result) => {
            if (result.data.Status === 'Success') {
              alert('Changed Cred Successfully');
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
    } else {
      alert('Fill all the fields');
    }
  };

  const adminValidation = (name) => {
    if (!name) {
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
      return false;
    } else {
      if (!exp1.test(text)) {
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <>
      {auth && (
        <>
          {loading ? (
            <div className="adminDashbord-parent">
              <div className="child-sidebar">
                <Sidebar />
              </div>
              <div className="child-content">
                <div className="admin-content">
                  <Container>
                    <h1>Admin Profile</h1>
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
                          <Table.Cell>{adminData.adminName}</Table.Cell>
                          <Table.Cell>{adminData.adminEmail}</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                    <button
                      className="changeCred-btn"
                      onClick={(e) => {
                        handleButton(e);
                      }}
                    >
                      Change Credentials
                    </button>
                    {showInputs ? (
                      <>
                        <div
                          className={
                            showInputs
                              ? 'changeCred-div'
                              : 'changeCred-div-fade-out'
                          }
                        >
                          <form>
                            <input
                              type="text"
                              placeholder="Name"
                              name="adminName"
                              Value={adminName}
                              onChange={(e) => {
                                setAdminName(e.target.value);
                              }}
                            />
                            <br />
                            <input
                              type="email"
                              placeholder="Email"
                              name="adminEmail"
                              value={adminEmail}
                              onChange={(e) => {
                                setAdminEmail(e.target.value);
                              }}
                            />
                            <br />
                            <input
                              type="text"
                              placeholder="Existing Password"
                              name="adminExistingPassword"
                              onChange={(e) => {
                                setAdminExistingPassword(e.target.value);
                              }}
                            />
                            <br />
                            <input
                              type="text"
                              placeholder="New Password"
                              name="adminNewPassword"
                              onChange={(e) => {
                                setAdminNewPassword(e.target.value);
                              }}
                            />
                            <br />
                            <input
                              placeholder="Confirm New Password"
                              name="adminConfirmPassword"
                              onChange={(e) => {
                                setAdminConfirmPassword(e.target.value);
                              }}
                            />
                            <br />
                            <button onClick={handleSubmit}>Submit</button>
                          </form>
                        </div>
                      </>
                    ) : null}
                  </Container>
                </div>
              </div>
            </div>
          ) : (
            <Load/>
          )}
        </>
      )}
    </>
  );
};

export default AdminProfile;
