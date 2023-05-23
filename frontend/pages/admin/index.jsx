import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import LogOut from '../../components/auth/logout';
import Link from 'next/link';

const ClentID = () => {
  const router = useRouter();

  const [auth, setAuth] = useState(false);

  axios.defaults.withCredentials = true;
  const fetchAPI2 = async (url) => {
    try {
      await axios
        .get(url)
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);
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

  return (
    <>
      {auth && (
        <>
          <button onClick={logout}>Logout</button>
          <div>
            <Link href="/admin/adminProfile">Profile</Link>
          </div>
          <h1>Admin DashBord</h1>
          <div>
            <Link href="/admin/receivedforms">Received forms</Link>
          </div>
          <div>
            <Link href="/admin/clientsData">Investors</Link>
          </div>
          <div>
            <Link href="/admin/todayEarners">Today Earners</Link>
          </div>
        </>
      )}
    </>
  );
};

export default ClentID;
