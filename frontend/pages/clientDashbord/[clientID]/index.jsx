import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import LogOut from '../../../components/auth/logout';
import Container from 'react-bootstrap/Container';
import ClientSidebar from '../../../components/client/ClientSideBar';
import { Table } from '@nextui-org/react';
import Load from '../../../components/common/Loading';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from '../../../components/client/MyVerticallyCenteredModal';
import CheckOutModel from '../../../components/client/checkOutModel';
import Cookies from 'js-cookie';

const ClentID = () => {
  const router = useRouter();

  const userID = router.query.clientID;

  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState('');
  const [showData, setShowData] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const [startDate, setStartDate] = useState(0);
  const [expDate, setExpDate] = useState(0);

  const [reqMoney, setReqMoney] = useState(0);
  const [reqError, setReqError] = useState(false);
  const [reqStatus, setReqStatus] = useState(false);
  const [pdfDownload, setPdsDownload] = useState(false);

  axios.defaults.withCredentials = true;

  const fetchAPI2 = async (url) => {
    const cookie = Cookies.get('newtoken');
    try {
      let hash = userID.replace(/slash/g, '/');
      await axios
        .post(url, { authEmail: hash, cookie: cookie })
        .then((result) => {

          if (result.data.message === 'Success') {
            setAuth(true);
            let hash = userID.replace(/slash/g, '/');
            try {
              axios
                .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/client/user`, {
                  authEmail: hash,
                })
                .then((result) => {
                  console.log(result);
                  if (result.data.Status === 'Success') {
                    setShowData(true);
                    // console.log(result.data.result.image.agreement);
                    if (result.data.result.image.agreement) {
                      setPdsDownload(true);
                    } else {
                      setPdsDownload(false);
                    }
                    if (result.data.result.plan.principal === null) {
                      setShowTable(false);
                      // setUserData(result.data.result);
                    } else {
                      setShowTable(true);
                      setUserData(result.data.result);

                      if (parseInt(result.data.result.reqmoney) <= 0) {
                        setReqStatus(true);
                      } else {
                        setReqStatus(false);
                      }
                    }
                  } else if (result.data.Status === 'Invest') {
                    router.push(`/clientDashbord/${userID}/invest`);
                  } else {
                    setShowData(false);
                    router.push('/login');
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
            router.push('/login');
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
    const API2 = `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/auth`;
    fetchAPI2(API2);
  }, [userID]);

  // console.log(Cookies.get("newtoken"));

  const handleCheckout = () => {
    const reqVer = reqValidation(reqMoney);
    if (reqVer) {
      if (
        parseInt(reqMoney) > parseInt(userData.plan.earnedInterest) ||
        parseInt(reqMoney) > parseInt(userData.plan.pendingInterest) ||
        parseInt(reqMoney) <= 0
      ) {
        alert('Please checkout valid amount');
      } else {
        let hash = userID.replace(/slash/g, '/');
        axios
          .put(`${process.env.NEXT_PUBLIC_BACKEND_API}/client/req`, {
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
      }
    }
  };

  const reqValidation = (amt) => {
    const exp = /^[0-9]*$/;
    if (!amt) {
      alert('Enter Amount to Request');
      return false;
    } else {
      if (!exp.test(amt)) {
        setReqError(true);
        return false;
      } else {
        setReqError(false);
        return true;
      }
    }
  };

  const handleprofile = () => {
    router.push(`/clientDashbord/${userID}/profile`);
  };

  return (
    <>
      {auth && (
        <>
          {showData ? (
            <div className="adminDashbord-parent">
              <div className="child-sidebar">
                <ClientSidebar
                  userID={userID}
                  name={userData.clintInfo.clientName}
                  email={userData.bankInfo.email}
                  image={userData.image.passportSizeImage}
                  pdfDownload={pdfDownload}
                  path={userData.image.agreement}
                  clientId={userData.clientID}
                />
              </div>
              <div className="child-content">
                <div className="admin-content scroll">
                  <div>
                    <Container>
                      {userData.extend ? (
                        <>
                          <button
                            className="pending"
                            onClick={() => setModalShow(true)}
                          >
                            EXTEND PLAN
                          </button>{' '}
                          <p className="extend-p">
                            Your Plan is about to end on{' '}
                            {userData.plan.expdate.substring(0, 10)}.
                          </p>
                        </>
                      ) : null}
                      <MyVerticallyCenteredModal
                        id={userData._id}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                      <h4>Invested Information</h4>
                      <Table
                        aria-label="Example table with static content"
                        css={{
                          height: 'auto',
                          minWidth: '100%',
                        }}
                      >
                        <Table.Header>
                          <Table.Column>INVESTMENT</Table.Column>
                          <Table.Column>A.O.I</Table.Column>
                          <Table.Column>INT EARNED</Table.Column>
                          <Table.Column>INT PAID</Table.Column>
                          <Table.Column>INT PENDING</Table.Column>
                          {/* <Table.Column>REQ AMOUNT</Table.Column> */}
                          <Table.Column>TOTAL PENDING RETURNS</Table.Column>
                          {/* <Table.Column>REQ STATUS</Table.Column> */}
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>{userData.plan.principal}</Table.Cell>
                            <Table.Cell>
                              {userData.plan.ageOfInterest}
                            </Table.Cell>
                            <Table.Cell>
                              {userData.plan.earnedInterest}
                            </Table.Cell>
                            <Table.Cell>
                              {userData.plan.paidInterest}
                            </Table.Cell>
                            <Table.Cell>
                              {userData.plan.pendingInterest}
                            </Table.Cell>
                            {/* <Table.Cell>{userData.reqmoney}</Table.Cell> */}
                            <Table.Cell>
                              {userData.plan.pendingTotalAmount}
                            </Table.Cell>
                            {/* <Table.Cell>
                              {reqStatus ? (
                                <p className="pending">PAID</p>
                              ) : (
                                <p className="pay">PENDING</p>
                              )}
                            </Table.Cell> */}
                          </Table.Row>
                        </Table.Body>
                      </Table>
                      {/* <h4>Checkout Money</h4>
                      <input
                        className="reqInput"
                        type="tel"
                        onChange={(e) => {
                          setReqMoney(e.target.value);
                        }}
                      />
                      {reqError ? (
                        <p style={{ color: 'red' }}>
                          Please enter only number !
                        </p>
                      ) : null} */}
                      {/* <button className="reqbtn" onClick={handleCheckout}>
                        CheckOut Investment
                      </button> */}
                      <Button
                        variant="outline-danger"
                        onClick={() => setModalShow2(true)}
                      >
                        CheckOut Investment
                      </Button>{' '}
                      <CheckOutModel
                        id={userData._id}
                        show={modalShow2}
                        onHide={() => setModalShow2(false)}
                      />
                      <h4 className="h4">Selected Plan</h4>
                      <Table
                        aria-label="Example table with static content"
                        css={{
                          height: 'auto',
                          minWidth: '100%',
                        }}
                      >
                        <Table.Header>
                          <Table.Column>MONTHS</Table.Column>
                          <Table.Column>INVESTMENT</Table.Column>
                          <Table.Column>START DATE</Table.Column>
                          <Table.Column>END DATE</Table.Column>
                          <Table.Column>INT PER MONTH</Table.Column>
                          <Table.Column>TOTAL INT EXPECTED</Table.Column>
                          <Table.Column>TOTAL RETURNS EXPECTED</Table.Column>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>{userData.plan.months}</Table.Cell>
                            <Table.Cell>{userData.plan.principal}</Table.Cell>
                            <Table.Cell>
                              {userData.plan.startdate.substring(0, 10)}
                            </Table.Cell>
                            <Table.Cell>
                              {userData.plan.expdate.substring(0, 10)}
                            </Table.Cell>
                            <Table.Cell>
                              {userData.plan.interestPerMonth}
                            </Table.Cell>
                            <Table.Cell>
                              {userData.plan.totalInterest}
                            </Table.Cell>
                            <Table.Cell>
                              {userData.plan.totalReturnAmount}
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                      <p className="note">
                        <i>
                          NOTE : Every Month Interest will be Credited with the
                          deduction of Rs {userData.tds} (10% of Int Per Month)
                        </i>
                      </p>
                    </Container>
                  </div>
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
