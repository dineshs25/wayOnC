import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import LogOut from '../../../components/auth/logout';

// import { io } from 'socket.io-client';

// const socket = io('http://localhost:8000', { transports: ['websocket'] });

const ClentID = () => {
  const router = useRouter();

  const userID = router.query.clientID;

  // const [name, setName] = useState('');
  // const [sentName, setSentName] = useState('');

  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState('');
  const [showData, setShowData] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const [startDate, setStartDate] = useState(0);
  const [expDate, setExpDate] = useState(0);

  const [reqMoney, setReqMoney] = useState(0);

  axios.defaults.withCredentials = true;

  const fetchAPI2 = async (url) => {
    try {
      let hash = userID.replace(/slash/g, '/');
      await axios
        .post(url, { authEmail: hash })
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);

            let hash = userID.replace(/slash/g, '/');
            try {
              axios
                .post('http://localhost:8000/client/user', {
                  authEmail: hash,
                })
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    setShowData(true);
                    if (result.data.result.plan.principal === null) {
                      setShowTable(false);
                      setUserData(result.data.result);
                    } else {
                      setShowTable(true);
                      setUserData(result.data.result);
                      const start = new Date(userData.plan.startdate)
                        .toLocaleString('en-GB')
                        .substring(0, 10);
                      setStartDate(start);
                      const end = new Date(userData.plan.expdate)
                        .toLocaleString('en-GB')
                        .substring(0, 10);
                      setExpDate(end);
                    }
                  } else if (result.data.Status === 'Invest') {
                    router.push(`/clientDashbord/${userID}/invest`);
                  } else {
                    setShowData(false);
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
    if (!userID) {
      return;
    }
    const API2 = 'http://localhost:8000/auth/auth';
    fetchAPI2(API2);
  }, [userID]);

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

  const handleInvest = async () => {
    router.push(`/clientDashbord/${userID}/invest`);
  };

  const handleCheckout = () => {
    if (
      parseInt(reqMoney) > parseInt(userData.plan.earnedInterest) ||
      parseInt(reqMoney) > parseInt(userData.plan.pendingInterest) ||
      parseInt(reqMoney) <= 0
    ) {
      alert('Please checkout valid amount');
    } else {
      // if (parseInt(userData.reqmoney) === 0  ) {
      let hash = userID.replace(/slash/g, '/');
      axios
        .put('http://localhost:8000/client/req', {
          reqested: reqMoney,
          userAuth: hash,
        })
        .then((result) => {
          if (result.data.Status === 'Success') {
            alert('Request Success');
            window.location.reload(true);
            setUserData(result.data.result);
          } else {
            alert('Request Failed');
          }
        });
      // } else {
      //   alert('Please enter valid amount');
      // }
    }
  };

  // const handlepost = (e) => {
  //   socket.emit('name', name);
  // };

  // socket.on("sendName",(data)=>{
  //   setSentName(data)
  // })

  const handleprofile = () =>{
    router.push(`/clientDashbord/${userID}/profile`);
  }

  return (
    <>
      {auth && (
        <>
          {showData ? (
            <>
              <button onClick={logout}>logout</button>
              <button onClick={handleprofile}>profile</button>
              <h1>Details</h1>
              <p>{userData.clintInfo.clientName}</p>
              {/* <button onClick={handleInvest}>Invest</button> */}
              Invested Information
              <table border="1">
                <thead>
                  <tr>
                    <th>Selected Plan</th>
                    <th>Invested Amount</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Interest PerMonth </th>
                    <th>Total Interest</th>
                    <th>Age Of Interest</th>
                    <th>Interest Earned</th>
                    <th>Credited Interest</th>
                    <th>Pending Interest</th>
                    <th>Req Amount</th>
                    <th>Total Pending Returns</th>
                    <th>Total Returns</th>
                  </tr>
                </thead>
                <tbody>
                  {showTable ? (
                    <tr>
                      <th>{userData.plan.months}</th>
                      <th>{userData.plan.principal}</th>
                      <th>{userData.plan.startdate.substring(0, 10)}</th>
                      <th>{userData.plan.expdate.substring(0, 10)}</th>
                      <th>{userData.plan.interestPerMonth}</th>
                      <th>{userData.plan.totalInterest}</th>
                      <th>{userData.plan.ageOfInterest}</th>
                      <th>{userData.plan.earnedInterest}</th>
                      <th>{userData.plan.paidInterest}</th>
                      <th>{userData.plan.pendingInterest}</th>
                      <th>{userData.reqmoney}</th>
                      <th>{userData.plan.pendingTotalAmount}</th>
                      <th>{userData.plan.totalReturnAmount}</th>
                    </tr>
                  ) : (
                    <tr>
                      <th>0</th>
                      <th>0</th>
                      <th>0</th>
                      <th>0</th>
                      <th>0</th>
                      <th>0</th>
                      <th>0</th>
                      <th>0</th>
                      <th>0</th>
                      <th>0</th>
                      <th>0</th>
                      <th>0</th>
                    </tr>
                  )}
                </tbody>
              </table>
              <h4>Checkout Money</h4>
              <input
                type="text"
                onChange={(e) => {
                  setReqMoney(e.target.value);
                }}
              />
              <button onClick={handleCheckout}>Checkout</button>
              {/* <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              /> */}
              {/* <button onClick={handlepost}>Send</button>
              <p>{sentName}</p> */}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </>
  );
};

export default ClentID;
