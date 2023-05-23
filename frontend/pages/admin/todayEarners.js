import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TodayEarners = () => {
  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState('');
  const [showData, setShowData] = useState(false);

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
                .get('http://localhost:8000/admin/earners')
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

  //   const handleShowMore = async (e, id) => {
  //     e.preventDefault();
  //     try {
  //       await axios
  //         .post('http://localhost:8000/admin/showmore', {
  //           id: id,
  //         })
  //         .then((res) => {
  //           if (res.data.Status === 'Success') {
  //             if (res.data.result === null) {
  //               alert('No data found');
  //             } else {
  //               const slug = res.data.result;
  //               let rep = slug.replace(/\//g, 'slash');
  //               router.push(`/admin/${[rep]}`);
  //             }
  //           }
  //         })
  //         .catch((e) => {
  //           console.log('clientsData axios then catch error', e);
  //         });
  //     } catch (e) {
  //       console.log('clientsData axios catch handleshowmore error', e);
  //     }
  //   };

  const handleReceivedForms = async () => {
    router.push('/admin/receivedforms');
  };

  return (
    <>
      {auth && (
        <>
          {showData ? (
            <>
              <button onClick={logout}>Logout</button>
              <h1>Today Earners</h1>
              {/* <button onClick={handleReceivedForms}>Received Forms</button>
              <h4>Investors</h4> */}
              <table className="table">
                <thead>
                  <tr>
                    <th>SL.NO</th>
                    <th>Name</th>
                    <th>Invested Amount</th>
                    <th>Plan</th>
                    {/* <th>Interest PerMonth(3%)</th> */}
                    <th>Total Interest(3%)</th>
                    <th>Age Of Interest</th>
                    <th>Interest Earned</th>
                    <th>Interest Paid</th>
                    <th>Interest Pending</th>
                    <th>Total Pending Returns</th>
                    {/* <th>Total Returns</th> */}
                  </tr>
                </thead>
                {userData.map((value, index) => {
                  return (
                    <React.Fragment key={value._id}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{value.clintInfo.clientName}</td>
                        <td>{value.plan.principal}</td>
                        <td>{value.plan.months}</td>
                        {/* <td>{value.plan.interestPerMonth}</td> */}
                        <td>{value.plan.totalInterest}</td>
                        <td>{value.plan.ageOfInterest}</td>
                        <td>{value.plan.earnedInterest}</td>
                        <td>{value.plan.paidInterest}</td>
                        <td>{value.plan.pendingInterest}</td>
                        <td>{value.plan.pendingTotalAmount}</td>
                        {/* <td>{value.plan.totalReturnAmount}</td> */}
                        <td>
                          <button onClick={(e) => handleShowMore(e, value._id)}>
                            Show More
                          </button>
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

export default TodayEarners;
