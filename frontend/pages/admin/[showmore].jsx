import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import LogOut from '../../components/auth/logout';

const ClentID = () => {
  const router = useRouter();

  const userID = router.query.showmore;

  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState('');
  const [showData, setShowData] = useState(false);

  const [startDate, setStartDate] = useState(0);
  const [expDate, setExpDate] = useState(0);

  const [payedInterest, setPayedInterest] = useState(0);

  axios.defaults.withCredentials = true;
  const fetchAPI2 = async (url) => {
    try {
      await axios
        .get(url)
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);

            let hash = userID.replace(/slash/g, '/');
            try {
              axios
                .post('http://localhost:8000/admin/showdetails', {
                  authEmail: hash,
                })
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    setShowData(true);
                    setUserData(result.data.result);
                    const start = new Date(userData.plan.startdate)
                      .toLocaleString('en-GB')
                      .substring(0, 10);
                    setStartDate(start);
                    const end = new Date(userData.plan.expdate)
                      .toLocaleString('en-GB')
                      .substring(0, 10);
                    setExpDate(end);
                  } else {
                    setShowData(false);
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
    if (!userID) {
      return;
    }
    const API2 = 'http://localhost:8000/admin/auth';
    fetchAPI2(API2);
  }, [userID]);

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

  const handlePaidInterest = async () => {
    let hash = userID.replace(/slash/g, '/');
    if (parseInt(payedInterest) > parseInt(userData.plan.earnedInterest)) {
      alert('Earned interest is lower than pay');
    } else if (parseInt(payedInterest) < 0) {
      alert('Please enter valid amount');
    } else if (
      parseInt(payedInterest) < parseInt(userData.plan.earnedInterest)
    ) {
      await axios
        .post('http://localhost:8000/client/paidamt', {
          // payedInterest,
          reqMoney: userData.reqmoney,
          authEmail: hash,
        })
        .then((result) => {
          if (result.data.Status === 'Success') {
            alert('Updated Successfully');
            window.location.reload(true);
          } else {
            alert('Please try after some time');
          }
        })
        .catch((e) => {
          console.log('axios error handlepaidInterst', e);
        });
    }
  };

  return (
    <>
      {auth && (
        <>
          {showData ? (
            <>
              <button onClick={logout}>Logout</button>
              <h1>{userData.clintInfo.clientName} Details</h1>

              <h4>Plan</h4>
              <p>Months : {userData.plan.months}</p>
              <p>Start Date :{userData.plan.startdate.substring(0, 10)}</p>
              <p>Expire Date : {userData.plan.expdate.substring(0, 10)}</p>
              <table border="1">
                <thead>
                  <th>Invested Amount</th>
                  <th>Interest PerMonth(3%)</th>
                  <th>Total Interest(3%)</th>
                  <th>Age Of Interest</th>
                  <th>Interest Earned</th>
                  <th>Interest Paid</th>
                  <th>Interest Pending</th>
                  <th>Request Money</th>
                  <th>Total Pending Returns</th>
                  <th>Total Returns</th>
                </thead>
                <tr>
                  <td>{userData.plan.principal}</td>
                  <td>{userData.plan.interestPerMonth}</td>
                  <td>{userData.plan.totalInterest}</td>
                  <td>{userData.plan.ageOfInterest}</td>
                  <td>{userData.plan.earnedInterest}</td>
                  <td>{userData.plan.paidInterest}</td>
                  <td>{userData.plan.pendingInterest}</td>
                  <td>{userData.reqmoney}</td>
                  <td>{userData.plan.pendingTotalAmount}</td>
                  <td>{userData.plan.totalReturnAmount}</td>
                </tr>
              </table>
              <h4>Pay Requested Money</h4>
              {/* <input
                type="text"
                onChange={(e) => {
                  setPayedInterest(e.target.value);
                }}
              /> */}
              <button onClick={handlePaidInterest}>Pay</button>

              <h4>Client Info</h4>
              <p>Client Name : {userData.clintInfo.clientName}</p>
              <p>DOB : {userData.clintInfo.dob.substring(0, 10)}</p>
              <p>PAN : {userData.clintInfo.pan}</p>
              <p>Aadhar : {userData.clintInfo.aadhar}</p>
              <p>Passport : {userData.clintInfo.passport}</p>

              <h4>Bank Info</h4>
              <p>Mobile : {userData.bankInfo.mobile}</p>
              <p>Alt Mobile : {userData.bankInfo.altMobile}</p>
              <p>Bank A/C : {userData.bankInfo.bankAC}</p>
              <p>Acc Holder : {userData.bankInfo.accHolder}</p>
              <p>IFSC : {userData.bankInfo.ifsc}</p>
              <p>Bank Name : {userData.bankInfo.bankName}</p>
              <p>Email : {userData.bankInfo.email}</p>
              <p>Address : {userData.bankInfo.address}</p>
              <p>Permanent Address : {userData.bankInfo.permanentAddress}</p>

              <h4>Nominee Details</h4>
              <p>Nominee Name : {userData.nominee.nomineeName}</p>
              <p>Nominee Mobile : {userData.nominee.nomineeMobile}</p>
              <p>
                Nominee Relationship : {userData.nominee.nomineeRelationship}
              </p>
              <p>Nominee Aadhar : {userData.nominee.nomineeAadhar}</p>
              <p>Nominee Email : {userData.nominee.nomineeEmail}</p>
              <p>Nominee Address : {userData.nominee.nomineeAddress}</p>
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
