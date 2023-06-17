import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Sidebar from '../../../components/admin/Sidebar';
import { Table } from '@nextui-org/react';
import { IconButton } from '../../../components/admin/ui/IconButton';
import { EyeIcon } from '../../../components/admin/ui/EyeIcon';
import Search from '../../../components/common/Search';
import Load from '../../../components/common/Loading';
import Link from 'next/link';
import Agreement from '../../../components/agreement/agreement';
import Cookies from "js-cookie";


const ClentID = () => {
  const router = useRouter();

  const userID = router.query.id;

  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState('');
  const [showData, setShowData] = useState(false);

  const [startDate, setStartDate] = useState(0);
  const [expDate, setExpDate] = useState(0);

  const [payedInterest, setPayedInterest] = useState(0);

  const [reqStatus, setReqStatus] = useState(false);

  axios.defaults.withCredentials = true;
  const fetchAPI2 = async (url) => {
    const cookie = Cookies.get("newAdmintoken");
    try {
      await axios
      .post(url,{cookie: cookie})
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);

            let hash = userID.replace(/slash/g, '/');
            try {
              axios
                .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/investVer/showdetails`, {
                  authEmail: hash,
                })
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    setShowData(true);
                    setUserData(result.data.result);
                    // if (result.data.result.reqmoney > 0) {
                    //   setReqStatus(false);
                    // } else {
                    //   setReqStatus(true);
                    // }
                    // const start = new Date(userData.plan.startdate)
                    //   .toLocaleString('en-GB')
                    //   .substring(0, 10);
                    // setStartDate(start);
                    // const end = new Date(userData.plan.expdate)
                    //   .toLocaleString('en-GB')
                    //   .substring(0, 10);
                    // setExpDate(end);
                  } else {
                    setShowData(false);
                    // setAuth(false);
                    router.push('/admin/login');
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
    if (!userID) {
      return;
    }
    const API2 = `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/auth`;
    fetchAPI2(API2);
  }, [userID]);


  return <>{auth && <>{showData ? <Agreement data={userData} /> : <Load />}</>}</>;
};

export default ClentID;
