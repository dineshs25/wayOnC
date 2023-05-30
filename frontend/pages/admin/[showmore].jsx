import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import LogOut from '../../components/auth/logout';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import Sidebar from '../../components/admin/Sidebar';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Load from '../../components/common/Loading';

const ClentID = () => {
  const router = useRouter();

  const userID = router.query.showmore;

  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState('');
  const [showData, setShowData] = useState(false);

  const [startDate, setStartDate] = useState(0);
  const [expDate, setExpDate] = useState(0);

  const [payedInterest, setPayedInterest] = useState(0);

  const [reqStatus, setReqStatus] = useState(false);

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
                    if (result.data.result.reqmoney > 0) {
                      setReqStatus(false);
                    } else {
                      setReqStatus(true);
                    }
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

  // const logout = async () => {
  //   await axios
  //     .post('http://localhost:8000/admin/logout')
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.Status === 'Success') {
  //         window.location.reload(true);
  //       } else {
  //         alert('failed to logout');
  //       }
  //     })
  //     .catch((e) => {
  //       console.log('logout axios error', e);
  //     });
  // };

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
            <div className="adminDashbord-parent">
              <div className="child-sidebar">
                <Sidebar />
              </div>
              <div className="child-content">
                <div className="admin-content scroll">
                  <div>
                    <Container>
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
                          <Table.Column>REQ AMOUNT</Table.Column>
                          <Table.Column>TOTAL PENDING RETURNS</Table.Column>
                          <Table.Column>PAY REQ</Table.Column>
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
                            <Table.Cell>{userData.reqmoney}</Table.Cell>
                            <Table.Cell>
                              {userData.plan.pendingTotalAmount}
                            </Table.Cell>
                            <Table.Cell>
                              {reqStatus === true ? (
                                <button className="pay">PAID</button>
                              ) : (
                                <Button
                                  onClick={handlePaidInterest}
                                  variant="outline-success"
                                >
                                  PAY
                                </Button>
                              )}
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
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
                      <h4 className="h4">Client Details</h4>
                      <Table
                        aria-label="Example table with static content"
                        css={{
                          height: 'auto',
                          minWidth: '100%',
                        }}
                      >
                        <Table.Header>
                          <Table.Column>CLIENT NAME</Table.Column>
                          <Table.Column>DOB</Table.Column>
                          <Table.Column>PAN</Table.Column>
                          <Table.Column>AADHAAR</Table.Column>
                          <Table.Column>PASSPORT</Table.Column>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              {userData.clintInfo.clientName}
                            </Table.Cell>
                            <Table.Cell>
                              {userData.clintInfo.dob.substring(0, 10)}
                            </Table.Cell>
                            <Table.Cell>{userData.clintInfo.pan}</Table.Cell>
                            <Table.Cell>{userData.clintInfo.aadhar}</Table.Cell>
                            <Table.Cell>
                              {userData.clintInfo.passport}
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                      <h4 className="h4">Bank Details</h4>
                      <Table
                        aria-label="Example table with static content"
                        css={{
                          height: 'auto',
                          minWidth: '100%',
                        }}
                      >
                        <Table.Header>
                          <Table.Column>Name</Table.Column>
                          <Table.Column>DETAILS</Table.Column>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>MOBILE</Table.Cell>
                            <Table.Cell>{userData.bankInfo.mobile}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>ALT MOBILE</Table.Cell>
                            <Table.Cell>
                              {userData.bankInfo.altMobile}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>BANK A/C</Table.Cell>
                            <Table.Cell>{userData.bankInfo.bankAC}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>ACC HOLDER</Table.Cell>
                            <Table.Cell>
                              {userData.bankInfo.accHolder}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>IFSC</Table.Cell>
                            <Table.Cell>{userData.bankInfo.ifsc}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>BANK NAME</Table.Cell>
                            <Table.Cell>
                              {userData.bankInfo.bankName}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>EMAIL</Table.Cell>
                            <Table.Cell>{userData.bankInfo.email}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>ADDRESS</Table.Cell>
                            <Table.Cell>{userData.bankInfo.address}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>PERMANENT ADDRESS</Table.Cell>
                            <Table.Cell>
                              {userData.bankInfo.permanentAddress}
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                      <h4 className="h4">Nominee Details</h4>
                      <Table
                        aria-label="Example table with static content"
                        css={{
                          height: 'auto',
                          minWidth: '100%',
                        }}
                      >
                        <Table.Header>
                          <Table.Column>Name</Table.Column>
                          <Table.Column>DETAILS</Table.Column>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>NAME</Table.Cell>
                            <Table.Cell>
                              {userData.nominee.nomineeName}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>MOBILE</Table.Cell>
                            <Table.Cell>
                              {userData.nominee.nomineeMobile}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>RELATIONSHIP</Table.Cell>
                            <Table.Cell>
                              {userData.nominee.nomineeRelationship}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>AADHAAR</Table.Cell>
                            <Table.Cell>
                              {userData.nominee.nomineeAadhar}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>EMAIL</Table.Cell>
                            <Table.Cell>
                              {userData.nominee.nomineeEmail}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>ADDRESS</Table.Cell>
                            <Table.Cell>
                              {userData.nominee.nomineeAddress}
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                      <h4 className="h4">Uploaded Image Links</h4>
                      <Table
                        aria-label="Example table with static content"
                        css={{
                          height: 'auto',
                          minWidth: '100%',
                        }}
                      >
                        <Table.Header>
                          <Table.Column>AADHAAR</Table.Column>
                          <Table.Column>PAN</Table.Column>
                          <Table.Column>CLIENT PHOTO</Table.Column>
                          <Table.Column>SIGNATURE</Table.Column>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <Link
                                href={`http://res.cloudinary.com/duusv7nak/image/upload/v1684669380/${userData.image.aadharImage}`}
                              >
                                Aadhar Image
                              </Link>
                            </Table.Cell>
                            <Table.Cell>
                              <Link
                                href={`http://res.cloudinary.com/duusv7nak/image/upload/v1684669380/${userData.image.panImage}`}
                              >
                                Pan Image
                              </Link>
                            </Table.Cell>
                            <Table.Cell>
                              <Link
                                href={`http://res.cloudinary.com/duusv7nak/image/upload/v1684669380/${userData.image.passportSizeImage}`}
                              >
                                Client Image
                              </Link>
                            </Table.Cell>
                            <Table.Cell>
                              <Link
                                href={`http://res.cloudinary.com/duusv7nak/image/upload/v1684669380/${userData.image.signatureImage}`}
                              >
                                Signature Image
                              </Link>
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Container>
                  </div>
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

export default ClentID;
