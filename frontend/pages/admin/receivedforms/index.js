import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

const ClientsData = () => {
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState('');
  const [showData, setShowData] = useState(false);

  const [show, setShow] = useState(false);

  const router = useRouter();

  axios.defaults.withCredentials = true;

  const fetchAPI2 = async (url) => {
    try {
      await axios
        .get(url)
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);
            try {
              axios
                .get('http://localhost:8000/admin/receivedforms')
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
    const API2 = 'http://localhost:8000/admin/auth';
    fetchAPI2(API2);
  }, []);

  const logout = async () => {
    await axios
      .post('http://localhost:8000/admin/logout')
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
        .post('http://localhost:8000/admin/showmore', {
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
    console.log(id);
  };

  const handleRegister = async (e, id, name, email) => {
    e.preventDefault();
    await axios
      .post('http://localhost:8000/auth/register', {
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
      });
  };

  return (
    <>
      {auth && (
        <>
          {showData ? (
            <>
              <button onClick={logout}>Logout</button>
              <h1>Received Forms</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th>SL.NO</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>DOB</th>
                    <th>Details</th>
                    <th>Verification</th>
                    <th>Registeration</th>
                    <th>rejected</th>
                  </tr>
                </thead>
                {userData.map((value, index) => {
                  return (
                    <React.Fragment key={value._id}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{value.clintInfo.clientName}</td>
                        <td>{value.bankInfo.email}</td>
                        <td>{value.clintInfo.dob.substring(0, 10)}</td>
                        <td>
                          {/* <Link
                            href={`http://localhost:8000/admin/receivedforms/${value._id}`}
                          >
                            Show Details
                          </Link> */}
                          <button
                            onClick={(e) => {
                              handleShowDetail(e, value._id);
                            }}
                          >
                            Show Details
                          </button>
                        </td>
                        <td>{value.verification === true? <p>verified</p> : <p>Not verified</p> }</td>
                        <td>
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
                              Registere User
                            </Button>
                          )}
                        </td>
                        <td>
                          <Button variant="outline-danger">Rejected</Button>{' '}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </table>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </>
  );
};

export default ClientsData;
