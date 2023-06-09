import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import LogOut from '../../components/auth/logout';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';

import Sidebar from '../../components/user/Sidebar';

import { Table } from '@nextui-org/react';
import { IconButton } from '../../components/admin/ui/IconButton';
import { EyeIcon } from '../../components/admin/ui/EyeIcon';
import Search from '../../components/common/Search';
import Load from '../../components/common/Loading';

const User = () => {
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
    try {
      await axios
        .get(url)
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
            router.push('/user/login');
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
    const API2 = `${process.env.NEXT_PUBLIC_BACKEND_API}/user/auth`;
    fetchAPI2(API2);
  }, []);

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
              router.push(`/user/${[rep]}`);
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
                    <h1>User DashBord</h1>
                    <div className="dash-box-div">
                      <div className="dash-box">
                        <h4>Total Forms Submitted</h4>
                        <p>{data.ClientCount}</p>
                      </div>
                    </div>
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

export default User;
