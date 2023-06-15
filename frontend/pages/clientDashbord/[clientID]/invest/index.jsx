import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ClientSidebar from '../../../../components/client/ClientSideBar';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import Load from '../../../../components/common/Loading';

const Invest = () => {
  const router = useRouter();
  const { clientID } = router.query;

  const [auth, setAuth] = useState(false);


  const [amt, setAmt] = useState('');
  const [time, setTime] = useState('');

  //calculator useState starts here
  const [calculationAmt, setCalculationAmt] = useState('');
  const [calculationTime, setCalculationTime] = useState('');

  const [perMonthInterest, setPerMonthInterest] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmountReturns, setTotalAmountReturns] = useState(0);
  //calculator useState ends here

  const [checkbox, setCheckBox] = useState(false);
  const [checkbox2, setCheckBox2] = useState(false);
  const [showData, setShowData] = useState(false);
  const [pageData, setPageData] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [ID, setID] = useState('');

  const [investmentCountError, setInvestmentCountError] = useState(false);
  const [investmentError, setInvestmentError] = useState(false);

  axios.defaults.withCredentials = true;

  const fetchAPI2 = async (url) => {
    try {
      let hash = clientID.replace(/slash/g, '/');
      await axios
        .post(url, { authEmail: hash })
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);
            try {
              axios
                .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/client/profile`, {
                  authEmail: hash,
                })
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    setShowData(true);
                    setPageData(result.data.result);
                    setProfileImage(result.data.image);
                    setID(result.data.clientID);
                  } else {
                    setShowData(false);
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
    if (!clientID) {
      return;
    }
    const API2 = `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/auth`;
    fetchAPI2(API2);
  }, [clientID]);

  const handleInvest = async () => {
    const checkedVer = handleCheckboxSubmit(checkbox);
    const checkedVer2 = handleCheckboxSubmit(checkbox2);
    const InvestmentVer = investmentValidation(amt);
    const monthVer = monthSelectValidation(time);
    if (checkedVer && InvestmentVer && monthVer && checkedVer2) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/client/${clientID}/invest`,
          {
            amt,
            time,
          }
        )
        .then((result) => {
          if (result.data.Status === 'Success') {
            alert('Investement Request sent Successfully');
          } else if (result.data.Status === 'You have already invested') {
            alert(result.data.Status);
          } else {
            alert('Failed');
          }
        })
        .catch((e) => {
          console.log('axios error', e);
        });
    }
  };



  const handleCalculation = () => {
    const principal = parseInt(calculationAmt);
    const totalMonths = parseInt(calculationTime);

    const interest = (principal * 3 * totalMonths) / 100;
    setTotalInterest(interest);
    // setTotalInterest(interest);

    const totalInterest = interest / totalMonths;
    setPerMonthInterest(totalInterest);
    // setPerMonthInterest(totalInterest);

    const totalAmount = principal + interest;
    setTotalAmountReturns(totalAmount);
  };

  const handleCheckbox = () => {
    if (checkbox === false) {
      setCheckBox(true);
    } else {
      setCheckBox(false);
    }
  };

  const handleCheckbox2 = () => {
    if (checkbox2 === false) {
      setCheckBox2(true);
    } else {
      setCheckBox2(false);
    }
  };

  const handleCheckboxSubmit = (checkbox) => {
    if (checkbox === false) {
      alert('Please tick the checkbox to submit');
      return false;
    } else {
      return true;
    }
  };

  const investmentValidation = (amt) => {
    if (!amt) {
      alert('Please enter investment amount');
      return false;
    } else if (amt < 100000) {
      setInvestmentCountError(true);
      return false;
    } else {
      setInvestmentCountError(false);
      const exp = /^[0-9]*$/;
      if (!exp.test(amt)) {
        setInvestmentError(true);
        setInvestmentCountError(false);
        return false;
      } else {
        setInvestmentCountError(false);
        setInvestmentError(false);
        return true;
      }
    }
  };

  const monthSelectValidation = (month) => {
    const val = parseInt(month);
    if (!val) {
      alert('Please select number of months');
      return false;
    } else {
      const exp = /^[0-9]*$/;
      if (!exp.test(val)) {
        alert('Please select valid Months');
        return false;
      } else {
        if ( val === 12 || val === 24 || val === 36) {
          return true;
        } else {
          alert('Please select month in given options');
          return false;
        }
      }
    }
  };

  const handleInvestForVer = async() =>{
    const checkedVer = handleCheckboxSubmit(checkbox);
    const checkedVer2 = handleCheckboxSubmit(checkbox2);
    const InvestmentVer = investmentValidation(amt);
    const monthVer = monthSelectValidation(time);
    if (checkedVer && InvestmentVer && monthVer && checkedVer2) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/client/${clientID}/investVer`,
          {
            amt,
            time,
          }
        )
        .then((result) => {
          if (result.data.Status === 'Success') {
            alert('Investement Request sent Successfully');
          } else if (result.data.Status === 'You have already invested') {
            alert(result.data.Status);
          } else {
            alert(result.data.Status);
          }
        })
        .catch((e) => {
          console.log('axios error', e);
        });
    }
  }

  return (
    <>
      {auth && (
        <>
          {showData ? (
            <div className="adminDashbord-parent">
              <div className="child-sidebar">
                <ClientSidebar
                  userID={clientID}
                  name={pageData.username}
                  email={pageData.userEmail}
                  image={profileImage}
                  clientId={ID}
                />
              </div>
              <div className="child-content">
                <div className="admin-content scroll investDiv">
                  <div>
                    <Container>
                      <div>
                      <p className="tableClientEmail clientID">Bank Details of WayOnC Investment Pvt Ltd :</p>
                      <p className="tableClientEmail clientID">A/C No : 50200067814536</p>
                      <p className="tableClientEmail clientID">IFSC Code : HDFC0004052</p>
                      <p className="tableClientEmail clientID"><i>Important Note : Please mention your Client ID : {ID}<br/> while sending Investment Amount.</i></p>
                        <div className="investBox">
                          <h5>Investment Amount</h5>
                          <input
                            type="tel"
                            onChange={(e) => {
                              setAmt(e.target.value);
                            }}
                            placeholder="eg: 500000"
                            required
                          />
                          {investmentCountError ? (
                            <p style={{ color: 'red' }}>
                              Minimun investment is 100000 !
                            </p>
                          ) : null}
                          {investmentError ? (
                            <p style={{ color: 'red' }}>
                              Investment should be in Number
                            </p>
                          ) : null}
                          <p className="tableClientEmail">
                            Rate of Interest is applicable has per the agreement
                          </p>
                          <select
                            onChange={(e) => {
                              setTime(e.target.value);
                            }}
                            required
                          >
                            <option disabled selected hidden>
                              Choose Duration
                            </option>
                            <option value="12">12</option>
                            <option value="24">24</option>
                            <option value="36">36</option>
                          </select>
                          <p>
                            <Link href="/T&C">Terms & Conditions</Link>
                          </p>
                          <div className="checkbox authorize-check">
                            <input
                              type="checkbox"
                              onChange={handleCheckbox}
                              required
                            />
                            <p>I agree for the terms and conditions</p>
                          </div>
                          <div className="checkbox authorize-check">
                            <input
                              type="checkbox"
                              onChange={handleCheckbox2}
                              required
                            />
                            <p>
                              I authorize WayOnC Investments Pvt Ltd to use my
                              signature to process the legal investment bond.
                            </p>
                          </div>
                          <button onClick={handleInvestForVer}>Invest</button>
                        </div>
                      </div>
                      {/* <hr /> */}
                      {/* <h4>Calculator</h4>
                      <h5>Investment Amount</h5>
                      <input
                        type="text"
                        onChange={(e) => {
                          setCalculationAmt(e.target.value);
                        }}
                      />
                      <h5>rate of interest 3%</h5>
                      <select
                        onChange={(e) => {
                          setCalculationTime(e.target.value);
                        }}
                      >
                        <option>Choose Duration</option>
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="36">36</option>
                      </select>

                      <p>Total Interest : {totalInterest}</p>
                      <p>Interest Per Month : {perMonthInterest}</p>
                      <p>Total Amount returs : {totalAmountReturns}</p>
                      <button onClick={handleCalculation}>Calculate</button> */}
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

export default Invest;
