import React, { useEffect, useState } from 'react';

const Calc = () => {
  const [amt, setAmt] = useState('');
  const [time, setTime] = useState('');

  const [perMonthInterest, setPerMonthInterest] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmountReturns, setTotalAmountReturns] = useState(0);


  const [monthsPaid, setMonthsPaid] = useState(0);
  const [remainingInterest, setRemainingInterest] = useState(0);

  const [amountPaid, setAmountPaid] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  const [numberOfMOnths, setNumberOfMOnths] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState(0);

  let months = [];
  const [arrayMonths, setArrayMonths] = useState(months);

  const [aof, setAof] = useState(0);

  const handleCalculation = () => {
    const principal = parseInt(amt);
    const totalMonths = parseInt(time);

    const interest = (principal * 3 * totalMonths) / 100;
    setPerMonthInterest(interest);
    // setTotalInterest(interest);

    const totalInterest = interest / totalMonths;
    setTotalInterest(totalInterest);
    // setPerMonthInterest(totalInterest);


    const totalAmount = principal + interest;
    setTotalAmountReturns(totalAmount);
  };

  const handleRemaining = () => {
    const remaining = perMonthInterest - monthsPaid * totalInterest;
    setRemainingInterest(remaining);
  };

  const handleAmountPaid = () => {
    if (amountPaid > perMonthInterest) {
      alert('Please enter valid amount');
    } else {
      const remaining = perMonthInterest - amountPaid;
      setRemainingAmount(remaining);
    }
  };


  function getAllMonthsBetweenDates() {
    let start = new Date().toISOString().substring(0, 10);
    let startDate = new Date(start);

    setStartDate(start)

    startDate.setMonth(startDate.getMonth() + 1);

    let endDate = new Date();
    let exp = endDate.setMonth(endDate.getMonth() + parseInt(numberOfMOnths));
    let expDate = new Date(exp).toISOString().substring(0, 10);
    let last = new Date(expDate);

    let end = new Date(last);

    setEndDate(expDate);

    let currentMonth = startDate;

    while (currentMonth <= end) {
      const day = new Date(currentMonth).toISOString().substring(0, 10);
      months.push(day);
      arrayMonths.push(day);
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    console.log(months);
  }

  const handleAOF = () => {
    const date = new Date('2024-05-26');
    const currDate = date.toISOString().substring(0, 10);

    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDate = new Date(year, month + 1, 1)
      .toISOString()
      .substring(8, 10);

    // console.log(currDate.substring(0,4))

    let monthsArr = [
      '2023-06-17',
      '2023-07-17',
      '2023-08-17',
      '2023-09-17',
      '2023-10-17',
      '2023-11-17',
      '2023-12-17',
      '2024-01-17',
      '2024-02-17',
      '2024-03-17',
      '2024-04-17',
      '2024-05-17',
    ];

    const res = monthsArr.map((value, index) => {
      if (
        value === currDate ||
        (value.substring(5, 7) === currDate.substring(5, 7) &&
          value.substring(0, 4) === currDate.substring(0, 4) &&
          value.substring(8, 10) < currDate.substring(8,10) &&
          value.substring(8, 10) <= lastDate)
      ) {
        setAof(index + 1);
      }
    });
  };

  useEffect(() => {
    handleAOF();
  }, []);

  return (
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
      <button onClick={handleCalculation}>Calculate</button>

      <p>Total Interest : {perMonthInterest}</p>
      <p>Interest Per MOnth : {totalInterest}</p>
      <p>Total Amount returs : {totalAmountReturns}</p>
      <hr />
      <p>Number of months paid</p>
      <input
        type="text"
        onChange={(e) => {
          setMonthsPaid(e.target.value);
        }}
      />
      <p>{remainingInterest}</p>
      <button onClick={handleRemaining}>submit</button>
      <hr />
      <p>Amount Paid</p>
      <input
        type="text"
        onChange={(e) => {
          setAmountPaid(e.target.value);
        }}
      />
      <p>remaining interest amount to be paid</p>
      <p>{remainingAmount}</p>
      <button onClick={handleAmountPaid}>submit</button>
      <hr />
      {/* <p>StartDate</p>
      <input type="date" onChange={(e)=>{setStartDate(e.target.value)}}/> */}
      <select
        onChange={(e) => {
          setNumberOfMOnths(e.target.value);
        }}
      >
        <option>Choose Duration</option>
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="36">36</option>
      </select>
      <p>StartDate</p>
      <input type="date" defaultValue={startDate} />
      <p>EndDate</p>
      <input type="date" defaultValue={endDate} />
      <button onClick={getAllMonthsBetweenDates}>submit</button>
      <hr />
      <p>Age of interest</p>
      <p>{aof} Months</p>
    </>
  );
};

export default Calc;
