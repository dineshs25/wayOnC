import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

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

  axios.defaults.withCredentials = true;

  const fetchAPI2 = async (url) => {
    try {
      let hash = clientID.replace(/slash/g, '/');
      await axios
        .post(url, { authEmail: hash })
        .then((result) => {
          if (result.data.message === 'Success') {
            setAuth(true);
            axios
              .get(`http://localhost:8000/client/investedClient/${clientID}`)
              .then((result) => {
                if (result.data.Status === 'Success') {
                  router.push(`/clientDashbord/${clientID}`);
                }
              })
              .catch((e) => {
                console.log(e);
              });
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
    if (!clientID) {
      return;
    }
    const API2 = 'http://localhost:8000/auth/auth';
    fetchAPI2(API2);
  }, [clientID]);

  const handleInvest = async () => {
    await axios
      .post(`http://localhost:8000/client/${clientID}/invest`, {
        amt,
        time,
      })
      .then((result) => {
        if (result.data.Status === 'Success') {
          alert('Invested Successfully');
        } else {
          alert('Failed');
        }
      })
      .catch((e) => {
        console.log('axios error', e);
      });
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

  return (
    <>
      {auth && (
        <>
          <h5>Investment Amount</h5>
          <input
            type="text"
            onChange={(e) => {
              setAmt(e.target.value);
            }}
          />
          <h5>rate of interest 3%</h5>
          <select
            onChange={(e) => {
              setTime(e.target.value);
            }}
          >
            <option>Choose Duration</option>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
          </select>
          <p>
            <b>Terms & Conditions</b>
          </p>
          <input type="checkbox" />
          <span>
            <p>
              <b>I agree for the terms and conditions</b>
            </p>
          </span>
          <button onClick={handleInvest}>Invest</button>
          <hr />
          <h4>Calculator</h4>
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
          <button onClick={handleCalculation}>Calculate</button>
        </>
      )}
    </>
  );
};

export default Invest;
