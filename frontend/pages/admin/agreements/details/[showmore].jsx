import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import Sidebar from '../../../../components/admin/Sidebar';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Load from '../../../../components/common/Loading';
import Cookies from 'js-cookie';

const UnConfirmedInvestor = () => {
  const router = useRouter();

  const userID = router.query.showmore;

  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState('');
  const [showData, setShowData] = useState(false);

  const [startDate, setStartDate] = useState(0);
  const [expDate, setExpDate] = useState(0);

  const [payedInterest, setPayedInterest] = useState(0);

  const [reqStatus, setReqStatus] = useState(false);
  const [interest, setInterest] = useState('');

  axios.defaults.withCredentials = true;
  const fetchAPI2 = async (url) => {
    const cookie = Cookies.get("newAdmintoken");
    try {
      await axios
        .post(url, { cookie: cookie })
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);

            let hash = userID.replace(/slash/g, '/');
            try {
              axios
                .post(
                  `${process.env.NEXT_PUBLIC_BACKEND_API}/admin/investVer/showdetails`,
                  {
                    authEmail: hash,
                  }
                )
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    setShowData(true);
                    setUserData(result.data.result);
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
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/client/paidamt`, {
          // payedInterest,
          // reqMoney: userData.reqmoney,
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

  const handleInterest = async (e, id) => {
    e.preventDefault();
    if (interest === '') {
      alert('Assign Interest');
    } else {
      await axios
        .put(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/assignInterest`, {
          interest,
          id,
        })
        .then((result) => {
          if (result.data.Status === 'Success') {
            alert('Assigned Interest Successfully');
            window.location.reload(true);
          } else {
            alert(result.data.Status);
          }
        });
    }
  };

  const handleConfirm = async (e, userAuth) => {
    e.preventDefault();
    if (userData.agreeStatus === false) {
      alert('Upload Agreement to Confirm Investor');
    } else {
      if (userData.interest) {
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/client/${userID}/invest`,
            {
              submittedDate: userData.plan.submittedDate,
              time: userData.plan.months,
            }
          )
          .then((result) => {
            if (result.data.Status === 'Success') {
              alert('Investor Added');
            } else if (result.data.Status === 'You have already invested') {
              alert(result.data.Status);
            } else {
              alert('Failed');
            }
          })
          .catch((e) => {
            alert('Server error');
          });
      } else {
        alert('Assign Interest to Confirm Investor');
      }
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
                      <p className="tableClientEmail">
                        ClientID : {userData.clientID}
                      </p>
                      <h4 className="h4">Selected Plan</h4>
                      <Table
                        aria-label="Example table with static content"
                        css={{
                          height: 'auto',
                          minWidth: '100%',
                        }}
                      >
                        <Table.Header>
                          <Table.Column>INVESTMENT</Table.Column>
                          <Table.Column>SELECTED MONTHS</Table.Column>
                          <Table.Column>INVESTMENT SUBMITTED DATE</Table.Column>
                        </Table.Header>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>{userData.plan.principal}</Table.Cell>
                            <Table.Cell>{userData.plan.months}</Table.Cell>
                            <Table.Cell>
                              {userData.plan.submittedDate}
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                      <p>
                        <strong>Assign Interest</strong>
                      </p>
                      {userData.interest ? (
                        <button className="pay">Assigned</button>
                      ) : (
                        <>
                          <input
                            className="assignInterest"
                            type="number"
                            onChange={(e) => {
                              setInterest(e.target.value);
                            }}
                          />
                          <button
                            className="pay"
                            onClick={(e) => {
                              handleInterest(e, userData._id);
                            }}
                          >
                            Assign
                          </button>
                        </>
                      )}

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
                                href={`http://res.cloudinary.com/dtjlq2uaq/image/upload/v1686306194/${userData.image.aadharImage}`}
                              >
                                Aadhar Image
                              </Link>
                            </Table.Cell>
                            <Table.Cell>
                              <Link
                                href={`http://res.cloudinary.com/dtjlq2uaq/image/upload/v1686306194/${userData.image.panImage}`}
                              >
                                Pan Image
                              </Link>
                            </Table.Cell>
                            <Table.Cell>
                              <Link
                                href={`http://res.cloudinary.com/dtjlq2uaq/image/upload/v1686306194/${userData.image.passportSizeImage}`}
                              >
                                Client Image
                              </Link>
                            </Table.Cell>
                            <Table.Cell>
                              <Link
                                href={`http://res.cloudinary.com/dtjlq2uaq/image/upload/v1686306194/${userData.image.signatureImage}`}
                              >
                                Signature Image
                              </Link>
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                      <button
                        className="confirm-btn"
                        onClick={(e) => {
                          handleConfirm(e, userData.userAuth);
                        }}
                      >
                        Confirm Investor
                      </button>
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

export default UnConfirmedInvestor;
