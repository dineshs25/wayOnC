import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

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
                .get(`http://localhost:8000/admin/formdetail/${userID}`)
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    setShowData(true);
                    setUserData(result.data.result);
                  } else if (result.data.Status === 'Failed') {
                    alert('No data found');
                    router.push('/admin/receivedforms');
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

  const handleVerification = async (e, id) => {
    e.preventDefault();
    await axios
      .post('http://localhost:8000/admin/verification', {
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
            <>
              <button onClick={logout}>Logout</button>
              <h1>{userData.clintInfo.clientName} Details</h1>
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
              <h4>Images Link</h4>
              <Link
                href={`http://res.cloudinary.com/duusv7nak/image/upload/v1684669380/${userData.image.aadharImage}`}
              >
                Aadhar Image
              </Link><br/>
              <Link
                href={`http://res.cloudinary.com/duusv7nak/image/upload/v1684669380/${userData.image.panImage}`}
              >
                Pan Image
              </Link><br/>
              <Link
                href={`http://res.cloudinary.com/duusv7nak/image/upload/v1684669380/${userData.image.passportSizeImage}`}
              >
                Passport Image
              </Link><br/>
              <Link
                href={`http://res.cloudinary.com/duusv7nak/image/upload/v1684669380/${userData.image.signatureImage}`}
              >
                Signature Image
              </Link><br/>
              <Button
                variant="outline-success"
                onClick={(e) => {
                  handleVerification(e, userData._id);
                }}
              >
                Verified
              </Button>{' '}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </>
  );
};

export default formDetails;
