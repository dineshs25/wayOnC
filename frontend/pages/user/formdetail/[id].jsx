import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import Sidebar from '../../../components/user/Sidebar';
import Load from '../../../components/common/Loading';

const formDetails = () => {
  const router = useRouter();

  const userID = router.query.id;

  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState('');
  const [showData, setShowData] = useState(false);

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
                .get(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/formdetail/${userID}`)
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    setShowData(true);
                    setUserData(result.data.result);
                  } else if (result.data.Status === 'Failed') {
                    alert('No data found');
                    router.push('/user/receivedforms');
                  } else {
                    setShowData(false);
                    router.push('/user/login');
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
    if (!userID) {
      return;
    }
    const API2 = `${process.env.NEXT_PUBLIC_BACKEND_API}/user/auth`;
    fetchAPI2(API2);
  }, [userID]);


  const handleVerification = async (e, id) => {
    e.preventDefault();
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/verification`, {
        id: id,
      })
      .then((result) => {
        if (result.data.Status === 'Success') {
          alert('Verified updation Successed');
        } else if (result.data.Status === 'Failed') {
          alert('Please try again after some time');
        }
      })
      .catch((e) => {
        console.log('axios error id js', e);
      });
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
                      <Button className='verifi-btn'
                        variant="outline-success"
                        onClick={(e) => {
                          handleVerification(e, userData._id);
                        }}
                      >
                        Verified
                      </Button>{' '}
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

export default formDetails;
