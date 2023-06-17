import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/admin/Sidebar';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import { IconButton } from '../../components/admin/ui/IconButton';
import { EyeIcon } from '../../components/admin/ui/EyeIcon';
import Search from '../../components/common/Search';
import Load from '../../components/common/Loading';
import Cookies from "js-cookie";


const TodayEarners = () => {
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState('');
  const [showData, setShowData] = useState(false);
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
                .get(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/earners`)
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
                    // setAuth(false);
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
        })
        .catch((e) => {
          console.log('clientsData axios then catch error', e);
        });
    } catch (e) {
      console.log('clientsData axios catch handleshowmore error', e);
    }
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
                <div className="admin-content">
                  <Container>
                    <h1>Today Earners</h1>
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
                        <Table.Column>SL.NO</Table.Column>
                        <Table.Column>Name</Table.Column>
                        <Table.Column>Invested Amount</Table.Column>
                        <Table.Column>Plan</Table.Column>
                        <Table.Column>Age Of Interest</Table.Column>
                        <Table.Column>Interest Earned</Table.Column>
                        <Table.Column>Show more</Table.Column>
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
                                <Table.Cell>{value.plan.principal}</Table.Cell>
                                <Table.Cell>{value.plan.months}</Table.Cell>
                                <Table.Cell>
                                  {value.plan.ageOfInterest}
                                </Table.Cell>
                                <Table.Cell>
                                  {value.plan.earnedInterest}
                                </Table.Cell>
                                <Table.Cell>
                                  <IconButton
                                    onClick={(e) => {
                                      handleShowMore(e, value._id);
                                    }}
                                  >
                                    <EyeIcon size={20} fill="#979797" />
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
            <Load/>
          )}
        </>
      )}
    </>
  );
};

export default TodayEarners;
