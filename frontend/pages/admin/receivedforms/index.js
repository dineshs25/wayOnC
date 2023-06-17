import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Sidebar from '../../../components/admin/Sidebar';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import { IconButton } from '../../../components/admin/ui/IconButton';
import { EyeIcon } from '../../../components/admin/ui/EyeIcon';
import { DeleteIcon } from '../../../components/admin/ui/DeleteIcon';
import Search from '../../../components/common/Search';
import Load from '../../../components/common/Loading';
import Cookies from "js-cookie";


const ClientsData = () => {
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState('');
  const [showData, setShowData] = useState(false);

  const [show, setShow] = useState(false);

  const [search, setSearch] = useState('');

  const router = useRouter();

  axios.defaults.withCredentials = true;

  const fetchAPI2 = async (url) => {
    const cookie = Cookies.get("newAdmintoken");
    try {
      await axios
      .post(url,{cookie: cookie})
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);
            try {
              axios
                .get(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/receivedforms`)
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    if (result.data.result === null) {
                      setShowData(false);
                      alert('No Data found');
                    } else {
                      setShowData(true);
                      setUserData(result.data.result);
                    }
                  } else {
                    router.push('/auth/login');
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

  const handleShowMore = async (e, id) => {
    e.preventDefault();
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/showmore`, {
          id: id,
        })
        .then((res) => {
          if (res.data.Status === 'Success') {
            if (res.data.result === null) {
              alert('No data found');
            } else {
              const slug = res.data.result;
              let rep = slug.replace(/\//g, 'slash');
              router.push(`/admin/${[rep]}`);
            }
          }
          // router.push('/auth/login');
        })
        .catch((e) => {
          console.log('clientsData axios then catch error', e);
        });
    } catch (e) {
      console.log('clientsData axios catch handleshowmore error', e);
    }
  };

  const handleShowDetail = async (e, id) => {
    e.preventDefault();
    router.push(`/admin/formdetail/${[id]}`);
  };

  const handleRegister = async (e, id, name, email) => {
    e.preventDefault();
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/register`, {
        id: id,
        name: name,
        email: email,
      })
      .then((result) => {
        if (result.data.Status === 'Success') {
          alert('Registered User Successfully');
        } else {
          alert(result.data.Status);
        }
      })
      .catch((e) => {
        console.log('axios', e);
      });
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await axios
      .delete(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/deleteForm/${id}`)
      .then((result) => {
        if (result.data.Status === 'Success') {
          alert('Deleted Successfully');
          window.location.reload(true);
        } else {
          alert(result.data.Status);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {auth && (
        <>
          {showData ? (
            <div className="adminDashbord-parent">
              <div className="child-sidebar">
                <Sidebar />
              </div>
              <div className="child-content">
                <div className="admin-content scroll">
                  <Container>
                    <h2>Received Forms</h2>
                    <div className="searchDiv">
                      <Search setSearch={setSearch} />
                    </div>
                    <Table
                      aria-label="Example table with static content"
                      css={{
                        height: 'auto',
                        minWidth: '100%',
                      }}
                    >
                      <Table.Header>
                        <Table.Column>SL NO</Table.Column>
                        <Table.Column>NAME</Table.Column>
                        <Table.Column>DETAILS</Table.Column>
                        <Table.Column>STATUS</Table.Column>
                        <Table.Column>REGISTRATION</Table.Column>
                        <Table.Column>REJECTED</Table.Column>
                      </Table.Header>
                      <Table.Body>
                        {userData
                          .filter((val) => {
                            const email = String(val.bankInfo.email);
                            if (search === '') {
                              return val;
                            } else if (
                              email
                                .toLocaleLowerCase()
                                .includes(search.toLocaleLowerCase())
                            ) {
                              return val;
                            }
                          })
                          .map((value, index) => {
                            return (
                              <Table.Row key={index}>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>
                                  <p className="tableClientName">
                                    {value.clintInfo.clientName}
                                  </p>
                                  <p className="tableClientEmail">
                                    {value.bankInfo.email}
                                  </p>
                                </Table.Cell>
                                <Table.Cell>
                                  <IconButton
                                    onClick={(e) => {
                                      handleShowDetail(e, value._id);
                                    }}
                                  >
                                    <EyeIcon size={20} fill="#979797" />
                                  </IconButton>
                                </Table.Cell>
                                <Table.Cell>
                                  {value.verification === true ? (
                                    <p className="verified">verified</p>
                                  ) : (
                                    <p className="notVerified">Not verified</p>
                                  )}
                                </Table.Cell>
                                <Table.Cell>
                                  {value.userAuth ? (
                                    <Button variant="outline-success">
                                      Registered
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outline-primary"
                                      onClick={(e) => {
                                        handleRegister(
                                          e,
                                          value._id,
                                          value.clintInfo.clientName,
                                          value.bankInfo.email
                                        );
                                      }}
                                    >
                                      Register User
                                    </Button>
                                  )}
                                </Table.Cell>
                                <Table.Cell>
                                  <IconButton
                                    onClick={(e) => {
                                      handleDelete(e, value._id);
                                    }}
                                  >
                                    <DeleteIcon size={20} fill="#FF0080" />
                                  </IconButton>
                                </Table.Cell>
                              </Table.Row>
                            );
                          })}
                      </Table.Body>
                      <Table.Pagination
                        shadow
                        noMargin
                        align="center"
                        rowsPerPage={2}
                      />
                    </Table>
                  </Container>
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

export default ClientsData;
