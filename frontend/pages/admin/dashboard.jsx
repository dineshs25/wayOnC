import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import LogOut from '../../components/auth/logout';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Cookies from 'js-cookie';

import Sidebar from '../../components/admin/Sidebar';

import { Table } from '@nextui-org/react';
import { IconButton } from '../../components/admin/ui/IconButton';
import { EyeIcon } from '../../components/admin/ui/EyeIcon';
import Search from '../../components/common/Search';
import Load from '../../components/common/Loading';

const ClentID = () => {
  const router = useRouter();

  const [auth, setAuth] = useState(false);
  const [search, setSearch] = useState('');

  const [data, setData] = useState({
    ClientCount: '',
    InvestorCount: '',
    TodayEarnersCount: '',
  });
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;
  const fetchAPI2 = async (url) => {
    const cookie = Cookies.get("newAdmintoken");
    try {
      await axios
        .post(url, { cookie: cookie })
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);
            axios
              .get(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/total`)
              .then((res) => {
                if (res.data.Status === 'Success') {
                  setData({
                    ClientCount: res.data.Client,
                    InvestorCount: res.data.Invest,
                    TodayEarnersCount: res.data.TodayEarners,
                  });
                  setUserData(res.data.investorTable);
                  setLoading(true);
                } else {
                  alert('Data not found please try after some time');
                }
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            setAuth(false);
            setLoading(false);
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
  // console.log(process.env.NEXT_PUBLIC_BACKEND_API);
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
          {loading ? (
            <div className="adminDashbord-parent">
              <div className="child-sidebar">
                <Sidebar />
              </div>
              <div className="child-content">
                <div className="admin-content scroll">
                  <Container>
                    <h1>Admin DashBord</h1>
                    <div className="dash-box-div">
                      <div className="dash-box">
                        <h4>Total Forms Submitted</h4>
                        <p>{data.ClientCount}</p>
                      </div>
                      <div className="dash-box">
                        <h4>Total Investors</h4>
                        <p>{data.InvestorCount}</p>
                      </div>
                      <div className="dash-box">
                        <h4>Today Earners</h4>
                        <p>{data.TodayEarnersCount}</p>
                      </div>
                    </div>
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
                        rowsPerPage={6}
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

export default ClentID;
